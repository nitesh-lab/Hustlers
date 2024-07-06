"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const Base_router_1 = require("./Routes/Base_router");
const mongoConnect_1 = require("./utils/mongoConnect");
const user_model_1 = require("./models/user_model");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ limit: '50mb' }));
app.use("/api", Base_router_1.base_router);
app.get("/check", (req, res) => {
    res.send(200).json({ "msg": "working" });
});
app.post("/main", async (req, res) => {
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
});
(0, mongoConnect_1.ConnectDB)().then(() => {
    app.listen(8000, () => {
        console.log("listening to port 8000");
    });
});
//# sourceMappingURL=server.js.map