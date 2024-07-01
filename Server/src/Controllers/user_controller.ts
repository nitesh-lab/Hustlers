import { Request, Response } from "express";
import { User, UserData } from "../models/user_model";
import { client } from "../utils/redisConnect";
import { Post } from "../models/post_model";
import uploadCloudinary from "../utils/upload";

export async function Check_CreateUser(req:Request,res:Response){

    const {name,email,image}=req.body;

    let user={}

// const user_exists=await client.json.get(email);

//    if(user_exists){  // cache hit user exists.
//     return res.status(200).json({"message":"done"});
//    }
   // cache miss
    const response = await User.findOne<UserData>({ $or: [{ name: name }, { email:email }] });
  
   if (response) {
     const {_id,profile_url,name,isActive,lastSeen}=response;

    // // await client.json.set(email,"$",{_id,profile_url,name,isActive,lastSeen}); // set in cache here 
     await client.json.set(JSON.stringify(_id),"$",{_id,profile_url,name,isActive,lastSeen}); // set in cache here

    return res.status(200).json({"message":"done"})
   }
    else {
    user = await User.create({
      name: name || "",
      email: email || "",
      profile_url: image || "",
      isActive:true,
      lastSeen:Date.now().toString(),
    });

    // await client.json.set(email,"$",user); // create user set in cache send him to dashboard.
    return res.status(200).json({"message":"done"})
}
}

// export async function FindUser(req:Request,res:Response) {
  
//   const {email,name,_id}=req.body;

//   let user={}

//   console.log(_id)
//   if(_id){
//    const user_exists=await client.json.get(JSON.stringify(_id)); 
//    if(user_exists){
//     return res.status(200).json({"user":user});
//    }
//    else{
//     const response=await User.findOne<UserData>({_id:_id});

//     if (response) {
//       const {_id,profile_url,name,isActive,lastSeen}=response;

//      await client.json.set(JSON.stringify(_id),"$",{_id,profile_url,name,isActive,lastSeen}); // set in cache here 
//       user=response; 
//       return res.status(200).json({"user":user});
//     } else {
//       return res.status(400).json({"user":"No such User"});
// }
//    }
//   }
//   else{
//     // cache miss
//     const response=await User.findOne<UserData>({ $or: [{ name: name }, { email: email }] });

//     if (response) {
//       const {_id,profile_url,name,isActive,lastSeen}=response;
//       await client.json.set(typeof(_id)!="string" ? JSON.stringify(_id):_id,"$",{_id,profile_url,name,isActive,lastSeen}); // set in cache here 
//       console.log("_id="+_id)
//       user=response; 
//       return res.status(200).json({"user":user});
//     } else {
//       return res.status(400);
// }
//   }
// }

export async function FindUser(req: Request, res: Response) {
  const { email, name, _id } = req.body;

  if (_id) {
    const userExists = await client.json.get(_id); 
    if (userExists) {
      return res.status(200).json({ user: userExists });
    } else {
      const response = await User.findOne({ _id: _id });

      if (response) {
        const { _id, profile_url, name, isActive, lastSeen } = response;
        await client.json.set(_id.toString(), "$", { _id, profile_url, name, isActive, lastSeen }); // set in cache here 
        return res.status(200).json({ user: response });
      } else {
        return res.status(400).json({ user: "No such User" });
      }
    }
  } else {
    const response = await User.findOne({ $or: [{ name: name }, { email: email }] });

    if (response) {
      const { _id, profile_url, name, isActive, lastSeen } = response;
      await client.json.set(_id.toString(), "$", { _id, profile_url, name, isActive, lastSeen }); // set in cache here 
      return res.status(200).json({ user: response });
    } else {
      return res.status(400).json({ user: "No such User" });
    }
  }
}










export async function CreatePost(req: Request, res: Response) {

  try {
    // Extract data from request body
    const { id, postText} = req.body;

    // Check if user exists with the provided id
    const user = await User.findOne({_id:id});

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if(req.file){
   const url=await uploadCloudinary(req.file.path);

    // Create a new Post instance
    const newPost = new Post({
      text: postText,
      photo: url, // Assuming 'image' field contains the photo URL
      posted: Date.now(),
    });

    // Save the new Post
    const savedPost = await newPost.save();

    // Add the post reference to the user's Posts array
    user.Posts.push(savedPost._id);
    await user.save();

    const postResponse = {
      likeCount: 0, // Example like count
      commentCount:0, // Example comment count
      imageUrl: url, // Use the uploaded image URL
      content: postText, // Use the provided post text
      user: {
        name: user.name, // Use the user's name
        profilePicture: user.profile_url|| "", // Use the user's profile picture if available
        isOnline: user.isActive, // Use the user's online status
      },
    };

    // Send successful response.
    return res.status(201).json({ user:postResponse});
  }
  else{
    return res.status(200).json({ message: "Post created Unsuccessfully"});
  } 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
}



export async function FindUsers(req: Request, res: Response) {

  const { name } = req.body;

  try {
    // Check if the results are cached
    const cachedResults = await client.get(`users:${name}`);  
    
    if (cachedResults) {
      // Cache hit
      return res.status(200).json({ users: JSON.parse(cachedResults) });
    }

    const users = await User.find({
      name: { $regex: `^${name}`, $options: 'i' } // Case-insensitive match from start
    }, {
      _id: 1, // Include only _id field (adjust for your needs)
      name: 1,
      email: 1,
      profile_url: 1,
    }).limit(5); // Limit to 5 results for performance
    
    if (users.length > 0) {
      // Format the results
      const formattedUsers = users.map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        profile_url: user.profile_url
      }));

      // Cache the results for future queries
      await client.json.set(`users:${name}`,"$",{users:formattedUsers})
      await client.expireAt(`users:${name}`,60*60*60)

      return res.status(200).json({ users: formattedUsers });
    } else {
      return res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    console.error('Error in FindUsers:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
