"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function ConnectDB() {
    try {
        await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log("mongo connected");
    }
    catch (e) {
        console.log(e);
    }
}
exports.ConnectDB = ConnectDB;
//# sourceMappingURL=mongoConnect.js.map