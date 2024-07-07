import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";

import { base_router } from "./Routes/Base_router";
import { ConnectDB } from "./utils/mongoConnect";
import { User, UserData } from "./models/user_model";

const app=express();

app.use(cors({
    origin:"*",
    credentials:true,
}));
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({limit: '50mb'}));

app.use("/api",base_router);


app.get("/check",(req,res)=>{
    res.send(200).json({"msg":"working"})
})

app.post("/main",async(req,res)=>{
        try {
          const { uid, time } = req.body;
      
          // Fetch the user's posts and their connections' posts
          const user = await User.findById(uid)
            .populate({
              path: 'Posts',
              match: { posted: { $lt: new Date(time) } },
              options: { sort: { posted: -1 }, limit: 1 },
              populate: {
                path: 'comment.user',
                select: 'name profile_url _id'
              }
            })
            .populate({
              path: 'Connections.Connection',
              populate: {
                path: 'Posts',
                match: { posted: { $lt: new Date(time) } },
                options: { sort: { posted: -1 }, limit: 1 },
                populate: {
                  path: 'comment.user',
                  select: 'name profile_url _id'
                }
              }
            })
            .exec();
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          // Combine the user's posts and their connections' posts
          let posts: any[] = [];
      
          posts = user.Posts.map((post) => {
            return {
              /*@ts-ignore*/
              ...post._doc,
              user: { _id: user._id, name: user.name, profilePicture: user.profile_url, isOnline: user.isActive },
              /*@ts-ignore*/
              hasLiked: post.like.includes(uid),
               /*@ts-ignore*/
              comments: post.comment.map((c) => ({
                text: c.comment,
                username: c.user.name,
                userimage: c.user.profile_url,
                userid: c.user._id
              }))
            };
          });
      
          for (const connection of user.Connections || []) {
            const connectionUser = connection.Connection as unknown as UserData;
            if (connectionUser && connectionUser.Posts) {
              connectionUser.Posts.forEach((post) => {
                posts.push({
                  /*@ts-ignore*/
                  ...post._doc,
                  user: { _id: connectionUser._id, name: connectionUser.name, profilePicture: connectionUser.profile_url, isOnline: connectionUser.isActive },
                  /*@ts-ignore*/
                  hasLiked: post.like.includes(uid),
                   /*@ts-ignore*/
                  comments: post.comment.map((c) => ({
                    text: c.comment,
                    username: c.user.name,
                    userimage: c.user.profile_url,
                    userid: c.user._id
                  }))
                });
              });
            }
          }
      
          // Sort posts by posted date and get the top 10
          posts.sort((a, b) => b.posted - a.posted);
          const topPosts = posts.slice(0, 10);
      
          // Cache the result
          // await client.set(`${uid}posts`, JSON.stringify(topPosts)); // Cache for 1 hour
      
          return res.status(200).json({ posts: topPosts, time: topPosts[topPosts.length - 1]?.posted });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      
      

})

ConnectDB().then(()=>{
    app.listen(8000,()=>{
        console.log("listening to port 8000")
    })
})
