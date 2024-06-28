import {Router} from "express";
import { Check_CreateUser, FindUser } from "../Controllers/user_controller";

export const user_router=Router();

user_router.route("/create").post(Check_CreateUser);
user_router.route("/findUser").post(FindUser);