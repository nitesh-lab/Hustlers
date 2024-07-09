"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBusiness = exports.getPosts = exports.UnfollowUser = exports.FollowUser = exports.CommentUser = exports.LikeUser = exports.FindUsers = exports.CreatePost = exports.FindUser = exports.Check_CreateUser = void 0;
const user_model_1 = require("../models/user_model");
const redisConnect_1 = require("../utils/redisConnect");
const post_model_1 = require("../models/post_model");
const upload_1 = __importDefault(require("../utils/upload"));
const job_model_1 = require("../models/job_model");
async function Check_CreateUser(req, res) {
    const { name, email, image, type } = req.body;
    let user = {};
    if (type && type === "company") {
        const ans = await user_model_1.User.findOne({ $or: [{ name: name || "" }, { email: email || "" }] })
            .populate({
            path: "Company"
        }).select("-password -createdAt -updatedAt -createdAt").exec();
        if (ans) {
            return res.status(200).json({ "message": "done", user: ans });
        }
    }
    else {
        const response = await user_model_1.User.findOne({ $or: [{ name: name || "" }, { email: email || "" }] });
        if (response) {
            return res.status(200).json({ "message": "done", user: response });
        }
        else {
            user = await user_model_1.User.create({
                name: name || "",
                email: email || "",
                profile_url: image || "",
                isActive: true,
                lastSeen: new Date().toISOString(),
            });
            return res.status(200).json({ "message": "done" });
        }
    }
}
exports.Check_CreateUser = Check_CreateUser;
async function FindUser(req, res) {
    const { email, name, _id, client_email } = req.body;
    try {
        if (_id) {
            if (client_email?.length > 0) {
                const user = await user_model_1.User.findById(_id)
                    .populate({
                    path: 'Connections.Connection',
                });
                if (user) {
                    const isPresent = user.Connections?.some(connection => 
                    // @ts-ignore 
                    connection.Connection?.email === client_email);
                    return res.status(200).json({ user: user, isPresent });
                }
                else {
                    return res.status(400).json({ user: "No such User" });
                }
            }
            const userExists = await redisConnect_1.client.json.get(_id);
            if (userExists) {
                return res.status(200).json({ user: userExists });
            }
            else {
                const response = await user_model_1.User.findOne({ _id: _id });
                if (response) {
                    const { _id, profile_url, name, isActive, lastSeen } = response;
                    await redisConnect_1.client.json.set(_id.toString(), "$", { _id, profile_url, name, isActive, lastSeen }); // set in cache here 
                    return res.status(200).json({ user: response });
                }
                else {
                    return res.status(400).json({ user: "No such User" });
                }
            }
        }
        else {
            const response = await user_model_1.User.findOne({ $or: [{ name: name }, { email: email }] });
            if (response) {
                const { _id, profile_url, name, isActive, lastSeen } = response;
                await redisConnect_1.client.json.set(_id.toString(), "$", { _id, profile_url, name, isActive, lastSeen }); // set in cache here 
                return res.status(200).json({ user: response });
            }
            else {
                return res.status(400).json({ user: "No such User" });
            }
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.FindUser = FindUser;
async function CreatePost(req, res) {
    try {
        const { id, text } = req.body;
        const user = await user_model_1.User.findOne({ _id: id });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (req.file) {
            const url = await (0, upload_1.default)(req.file.path);
            console.log("creating post at" + Date.now());
            console.log(text);
            const newPost = new post_model_1.Post({
                text: text,
                photo: url,
                posted: Date.now(),
            });
            const savedPost = await newPost.save();
            console.log("saved post=");
            console.log(savedPost);
            user.Posts.push(savedPost._id);
            await user.save();
            await redisConnect_1.client.del(`${id}posts`);
            const postResponse = {
                post_id: savedPost._id,
                likeCount: 0,
                commentCount: 0,
                imageUrl: url,
                content: text,
                user: {
                    name: user.name,
                    profilePicture: user.profile_url || "",
                    isOnline: user.isActive,
                },
            };
            return res.status(201).json({ user: postResponse });
        }
        else {
            return res.status(200).json({ message: "Post created unsuccessfully" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating post" });
    }
}
exports.CreatePost = CreatePost;
async function FindUsers(req, res) {
    const { name } = req.body;
    try {
        const cachedResults = await redisConnect_1.client.get(`users:${name}`);
        if (cachedResults) {
            return res.status(200).json({ users: JSON.parse(cachedResults) });
        }
        const users = await user_model_1.User.find({
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
            await redisConnect_1.client.json.set(`users:${name}`, "$", { users: formattedUsers });
            await redisConnect_1.client.expireAt(`users:${name}`, 60 * 60 * 60);
            return res.status(200).json({ users: formattedUsers });
        }
        else {
            return res.status(404).json({ message: "No users found" });
        }
    }
    catch (error) {
        console.error('Error in FindUsers:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
exports.FindUsers = FindUsers;
async function LikeUser(req, res) {
    const { post_id, uid } = req.body;
    try {
        const post = await post_model_1.Post.findById(post_id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        // Assuming that you want to avoid duplicate likes from the same user
        if (post.like.includes(uid)) {
            return res.status(400).json({ message: "User has already liked this post" });
        }
        post.like.push(uid);
        const savedPost = await post.save();
        return res.status(200).json({ message: "Post liked successfully", likeCount: savedPost.like.length });
    }
    catch (error) {
        console.error('Error in LikeUser:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
exports.LikeUser = LikeUser;
async function CommentUser(req, res) {
    const { post_id, uid, text } = req.body;
    try {
        const post = await post_model_1.Post.findById(post_id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        const user = await user_model_1.User.findById(uid);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        post.comment.push({ user: uid, comment: text });
        const savedComment = await post.save();
        return res.status(200).json({ message: "Comment added successfully", comments: savedComment.comment });
    }
    catch (error) {
        console.error('Error in CommentUser:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
exports.CommentUser = CommentUser;
async function FollowUser(req, res) {
    const { userId, client_email } = req.body;
    if (!userId || !client_email) {
        return res.status(400).json({ error: 'User ID and client email are required.' });
    }
    try {
        // Find the user who is being followed
        const userToFollow = await user_model_1.User.findById(userId);
        if (!userToFollow) {
            return res.status(404).json({ error: 'User not found.' });
        }
        // Find the client who is following
        const clientUser = await user_model_1.User.findOne({ email: client_email });
        if (!clientUser) {
            return res.status(404).json({ error: 'Client user not found.' });
        }
        // Check if already following
        const isAlreadyFollowing = clientUser.Connections?.some((connection) => connection.Connection.toString() === userId);
        if (isAlreadyFollowing) {
            return res.status(400).json({ error: 'Already following this user.' });
        }
        if (userId != clientUser._id) {
            // Add the connection
            clientUser.Connections?.push({
                Connection: userId,
                isBlock: false
            });
            userToFollow.Connections.push({
                Connection: clientUser._id,
                isBlock: false
            });
            await userToFollow.save();
            await clientUser.save();
            res.status(200).json({ message: 'User followed successfully.' });
        }
        else {
            res.status(400).json({ message: "u are same user" });
        }
    }
    catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
exports.FollowUser = FollowUser;
async function UnfollowUser(req, res) {
    const { userId, client_email } = req.body;
    if (!userId || !client_email) {
        return res.status(400).json({ error: 'User ID and client email are required.' });
    }
    try {
        const userToUnfollow = await user_model_1.User.findById(userId);
        if (!userToUnfollow) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const clientUser = await user_model_1.User.findOne({ email: client_email });
        if (!clientUser) {
            return res.status(404).json({ error: 'Client user not found.' });
        }
        const connectionIndex = clientUser.Connections?.findIndex((connection) => connection.Connection.toString() === userId);
        if (connectionIndex === -1) {
            return res.status(400).json({ error: 'You are not following this user.' });
        }
        if (connectionIndex !== undefined && connectionIndex > -1) {
            clientUser.Connections?.splice(connectionIndex, 1);
        }
        await clientUser.save();
        res.status(200).json({ message: 'User unfollowed successfully.' });
    }
    catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
exports.UnfollowUser = UnfollowUser;
async function getPosts(req, res) {
    try {
        const { uid, time } = req.body;
        // Fetch the user's posts and their connections' posts
        const user = await user_model_1.User.findById(uid)
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
        let posts = [];
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
            const connectionUser = connection.Connection;
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.getPosts = getPosts;
async function createBusiness(req, res) {
    try {
        const { name, location, website, email } = req.body;
        if (!name || !location || !email) {
            return res.status(400).json({ error: 'Name, location, and email are required' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Image file is required' });
        }
        const image = await (0, upload_1.default)(req.file.path);
        const exist = await job_model_1.Company.findOne({ "name": name });
        if (exist) {
            return res.status(200).json({ message: 'Already Exist' });
        }
        const com = await job_model_1.Company.create({
            name,
            location,
            website,
            image
        });
        const business_user = await user_model_1.User.findOne({ email });
        if (!business_user) {
            return res.status(404).json({ error: 'User not found' });
        }
        business_user.Company.push(com._id);
        business_user.hasBusiness = true;
        await business_user.save();
        return res.status(201).json({ message: 'Business created successfully', company: com });
    }
    catch (error) {
        return res.status(500).json({ error: 'An error occurred while creating the business' });
    }
}
exports.createBusiness = createBusiness;
//# sourceMappingURL=user_controller.js.map