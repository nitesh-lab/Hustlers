import { Request, Response } from "express";
import { User, UserData } from "../models/user_model";
import { client } from "../utils/redisConnect";
import { Post } from "../models/post_model";
import uploadCloudinary from "../utils/upload";

export async function Check_CreateUser(req:Request,res:Response){

    const {name,email,image}=req.body;

    let user={}

const user_exists=await client.json.get(email);

   if(user_exists){  // cache hit user exists.
    return res.status(200).json({"message":"done"});
   }

   else{    // cache miss
    const response = await User.findOne<UserData>({ $or: [{ name: name }, { email:email }] });
  
   if (response) {
    const {_id,profile_url,name,isActive,lastSeen}=response;

    await client.json.set(email,"$",{_id,profile_url,name,isActive,lastSeen}); // set in cache here 
    //  await client.json.set(email,"$",response); // set in cache here

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

    await client.json.set(email,"$",user); // create user set in cache send him to dashboard.
    return res.status(200).json({"message":"done"})

   }
}
}

export async function FindUser(req:Request,res:Response) {
  
  const {email,name}=req.body;

  let user={}

  const user_exists=await client.json.get(email);
  
  if(user_exists){  // cache hit user exists.
    user=user_exists;
    return res.status(200).json({"user":user});
  }
  else{    // cache miss
    const response=await User.findOne<UserData>({ $or: [{ name: name }, { email: email }] });

    if (response) {
      const {_id,profile_url,name,isActive,lastSeen}=response;

      await client.json.set(email,"$",{_id,profile_url,name,isActive,lastSeen}); // set in cache here 
      user=res; 
      return res.status(200).json({"user":user});
    } else {
      return res.status(400);
  }
}
}

export async function CreatePost(req: Request, res: Response) {
  console.log("files")
  console.log(req.file)

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
