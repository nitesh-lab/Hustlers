"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base_router = void 0;
const express_1 = require("express");
const user_routes_1 = require("./user_routes");
exports.base_router = (0, express_1.Router)();
// Forward the /user route to the user_router
exports.base_router.use("/user", user_routes_1.user_router);
//# sourceMappingURL=Base_router.js.map