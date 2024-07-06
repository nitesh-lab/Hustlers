"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    like: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }],
    comment: [{ user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" }, comment: { type: String } }],
    text: { type: String, required: true },
    photo: { type: String },
    posted: { type: Date, default: Date.now }
});
exports.Post = mongoose_1.default.model("Post", PostSchema);
//# sourceMappingURL=post_model.js.map