"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUser = exports.Check_CreateUser = void 0;
const user_model_1 = require("../models/user_model");
const redisConnect_1 = require("../utils/redisConnect");
function Check_CreateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, image } = req.body;
        let user = {};
        const user_exists = yield redisConnect_1.client.json.get(email);
        if (user_exists) { // cache hit user exists.
            return res.status(200).json({ "message": "done" });
        }
        else { // cache miss
            const res = yield user_model_1.User.findOne({ $or: [{ name: name }, { email: email }] });
            if (res) {
                yield redisConnect_1.client.json.set(email, "$", res); // set in cache here
                return res.status(200).json({ "message": "done" });
            }
            else {
                user = yield user_model_1.User.create({
                    name: name || "",
                    email: email || "",
                    profile_url: image || "",
                });
                yield redisConnect_1.client.json.set(email, "$", user); // create user set in cache send him to dashboard.
                return res.status(200).json({ "message": "done" });
            }
        }
    });
}
exports.Check_CreateUser = Check_CreateUser;
function FindUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, name } = req.body;
        let user = {};
        const user_exists = yield redisConnect_1.client.json.get(email);
        if (user_exists) { // cache hit user exists.
            user = user_exists;
            return res.status(200).json({ "user": user });
        }
        else { // cache miss
            const res = yield user_model_1.User.findOne({ $or: [{ name: name }, { email: email }] });
            if (res) {
                yield redisConnect_1.client.json.set(email, "$", res); // set in cache here 
                user = res;
                return res.status(200).json({ "user": user });
            }
            else {
                return res.status(400);
            }
        }
    });
}
exports.FindUser = FindUser;
//# sourceMappingURL=user_controller.js.map