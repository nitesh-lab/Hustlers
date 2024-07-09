"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_router = void 0;
const express_1 = require("express");
const user_controller_1 = require("../Controllers/user_controller");
const multer_1 = require("../utils/multer");
exports.user_router = (0, express_1.Router)();
exports.user_router.route("/create").post(user_controller_1.Check_CreateUser);
exports.user_router.route("/findUser").post(user_controller_1.FindUser);
exports.user_router.route("/post").post(multer_1.upload.single("image"), user_controller_1.CreatePost);
exports.user_router.route("/connections").post(user_controller_1.FindUsers);
exports.user_router.route("/like").post(user_controller_1.LikeUser);
exports.user_router.route("/comment").post(user_controller_1.CommentUser);
exports.user_router.route("/getPosts").post(user_controller_1.getPosts);
exports.user_router.route("/follow").post(user_controller_1.FollowUser);
exports.user_router.route("/unfollow").post(user_controller_1.UnfollowUser);
exports.user_router.route("/createBusiness").post(multer_1.upload.single("image"), user_controller_1.createBusiness);
//# sourceMappingURL=user_routes.js.map