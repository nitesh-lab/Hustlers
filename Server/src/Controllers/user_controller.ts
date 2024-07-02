import { Request, Response } from "express";
import { User, UserData } from "../models/user_model";
import { client } from "../utils/redisConnect";
import { Post } from "../models/post_model";
import uploadCloudinary from "../utils/upload";
import {  Types } from "mongoose";

export async function Check_CreateUser(req: Request, res: Response) {
  const { name, email, image } = req.body;

  let user = {};

  const response = await User.findOne<UserData>({ $or: [{ name: name }, { email: email }] });

  if (response) {
    const { _id, profile_url, name, isActive, lastSeen } = response;

    await client.json.set(JSON.stringify(_id), "$", { _id, profile_url, name, isActive, lastSeen }); // set in cache here

    return res.status(200).json({ "message": "done" });
  } else {
    user = await User.create({
      name: name || "",
      email: email || "",
      profile_url: image || "",
      isActive: true,
      lastSeen: Date.now().toString(),
    });

    return res.status(200).json({ "message": "done" });
  }
}

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
    const { id, postText } = req.body;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (req.file) {
      const url = await uploadCloudinary(req.file.path);

      console.log("creating post at" + Date.now());

      const newPost = new Post({
        text: postText,
        photo: url,
        posted: Date.now(),
      });

      const savedPost = await newPost.save();

      user.Posts.push(savedPost._id);
      await user.save();

      const postResponse = {
        post_id: savedPost._id,
        likeCount: 0,
        commentCount: 0,
        imageUrl: url,
        content: postText,
        user: {
          name: user.name,
          profilePicture: user.profile_url || "",
          isOnline: user.isActive,
        },
      };

      return res.status(201).json({ user: postResponse });
    } else {
      return res.status(200).json({ message: "Post created unsuccessfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
}

export async function FindUsers(req: Request, res: Response) {
  const { name } = req.body;

  try {
    const cachedResults = await client.get(`users:${name}`);

    if (cachedResults) {
      return res.status(200).json({ users: JSON.parse(cachedResults) });
    }

    const users = await User.find({
      name: { $regex: `^${name}`, $options: 'i' }
    }, {
      _id: 1,
      name: 1,
      email: 1,
      profile_url: 1,
    }).limit(5);

    if (users.length > 0) {
      const formattedUsers = users.map(user => ({
        _id: user._id,
        name: user.name,
        email: user.email,
        profile_url: user.profile_url
      }));

      await client.json.set(`users:${name}`, "$", { users: formattedUsers });
      await client.expireAt(`users:${name}`, 60 * 60 * 60);

      return res.status(200).json({ users: formattedUsers });
    } else {
      return res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    console.error('Error in FindUsers:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function LikeUser(req: Request, res: Response) {
  const { post_id, uid } = req.body;

  try {
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Assuming that you want to avoid duplicate likes from the same user
    if (post.like.includes(uid)) {
      return res.status(400).json({ message: "User has already liked this post" });
    }

    post.like.push(uid);
   const savedPost=await post.save();

    return res.status(200).json({ message: "Post liked successfully", likeCount: savedPost.like.length });
  } catch (error) {
    console.error('Error in LikeUser:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function CommentUser(req: Request, res: Response) {
  const { post_id, uid, commentText } = req.body;

  try {
    const post = await Post.findById(post_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const user = await User.findById(uid);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    post.comment.push({user:uid as Types.ObjectId,comment:commentText as string});

    const savedComment=await post.save();

    return res.status(200).json({ message: "Comment added successfully", comments: savedComment.comment });
  } catch (error) {
    console.error('Error in CommentUser:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
}



// export async function getPosts(req:Request,res:Response) {
  
//   const {uid,time}=req.body;

//  const data:any[]=JSON.parse(await client.get(`${uid}posts`))

//  if(data){
//   return res.status(200).json({"posts":data,"time":data[data.length-1]})
//  }

//  const posts=await User.findOne({_id:uid}).populate("Posts").limit(5);
 
//  let ans=[];
//  let count=0;
//  for(let i=0;i<posts.length;i++){

//   if(ans.length==0){
//     ans.push(posts[i]);
//     count++;
//   }
//   else{
//     if(count>0 && ans[count-1].posted<posted[i]){
//       ans.pop();
//       ans.push(posted[i]);
//     }
//   }
// }
// }

export async function getPosts(req: Request, res: Response) {
    try {
        const { uid, time } = req.body;

        // Fetch the cached posts from Redis
        const cachedData = await client.get(`${uid}posts`);
        if (cachedData) {
            const data = JSON.parse(cachedData);
            return res.status(200).json({ "posts": data, "time": data[data.length - 1].posted });
        }

        // Fetch the user's posts and their connections' posts
        const user = await User.findById(uid)
            .populate({
                path: 'Posts',
                match: { posted: { $lt: new Date(time) } },
                options: { sort: { posted: -1 }, limit: 10 }
            })
            .populate({
                path: 'Connections.Connection',
                populate: {
                    path: 'Posts',
                    match: { posted: { $lt: new Date(time) } },
                    options: { sort: { posted: -1 }, limit: 10 }
                }
            })
            .exec();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Combine the user's posts and their connections' posts
        let posts: any[] = user.Posts || [];
        for (const connection of user.Connections || []) {
            const connectionUser = connection.Connection as unknown as UserData;
            if (connectionUser && connectionUser.Posts) {
                posts = posts.concat(connectionUser.Posts);
            }
        }

        // Populate posts to get the 'posted' property
        posts = await Post.populate(posts, { path: 'Posts' });

        // Sort posts by posted date and get the top 10
        posts.sort((a, b) => b.posted - a.posted);
        const topPosts = posts.slice(0, 10);

        // Cache the result
        await client.set(`${uid}posts`, JSON.stringify(topPosts)); // Cache for 1 hour

        return res.status(200).json({ "posts": topPosts, "time": topPosts[topPosts.length - 1].posted });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
