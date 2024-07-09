import {Router} from "express";
import { Check_CreateUser, CommentUser, CreatePost, FindUser, FindUsers, FollowUser, LikeUser, UnfollowUser, createBusiness, getPosts } from "../Controllers/user_controller";
import { upload } from "../utils/multer";

export const user_router=Router();

user_router.route("/create").post(Check_CreateUser);
user_router.route("/findUser").post(FindUser);
user_router.route("/post").post(upload.single("image"),CreatePost);
user_router.route("/connections").post(FindUsers);
user_router.route("/like").post(LikeUser);
user_router.route("/comment").post(CommentUser);
user_router.route("/getPosts").post(getPosts);
user_router.route("/follow").post(FollowUser);
user_router.route("/unfollow").post(UnfollowUser);
user_router.route("/createBusiness").post(upload.single("image"),createBusiness);