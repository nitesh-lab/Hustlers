import {Router} from "express";
import { Check_CreateUser, CreatePost, FindUser } from "../Controllers/user_controller";
import { upload } from "../utils/multer";

export const user_router=Router();

user_router.route("/create").post(Check_CreateUser);
user_router.route("/findUser").post(FindUser);
user_router.route("/post").post(upload.single("image"),CreatePost);