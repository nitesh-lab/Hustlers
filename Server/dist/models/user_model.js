"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    profile_url: { type: String, required: true },
    Connections: [
        {
            type: {
                isBlock: { type: Boolean },
                Connection: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" }
            }
        }
    ],
    isActive: { type: Boolean, default: false },
    lastSeen: { type: String, default: "0" },
    Posts: { type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Post" }] },
    refreshToken: { type: String },
    Company: [{ type: mongoose_1.default.Types.ObjectId, ref: "Company" }],
    hasBusiness: { type: Boolean, default: false }
}, {
    timestamps: true
});
UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt_1.default.hash(this.password, 10);
    }
    next();
});
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt_1.default.compare(password, this.password);
};
UserSchema.methods.generateAccessToken = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        avatar: this.avatar,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
};
UserSchema.methods.generateSecretToken = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
    }, process.env.RefreshTokenSecret, {
        expiresIn: process.env.RefreshTokenExpiry
    });
};
exports.User = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=user_model.js.map