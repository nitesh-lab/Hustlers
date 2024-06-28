"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_router = void 0;
const express_1 = require("express");
const user_controller_1 = require("../Controllers/user_controller");
exports.user_router = (0, express_1.Router)();
exports.user_router.route("/create").post(user_controller_1.Check_CreateUser);
exports.user_router.route("/findUser").post(user_controller_1.FindUser);
//# sourceMappingURL=user_routes.js.map