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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    profile_url: { type: String, required: true },
    email: { type: String, unique: true }, // Make email unique (optional),
    password: { type: String },
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.password) {
            if (this.isModified("password")) {
                this.password = yield bcrypt_1.default.hash(this === null || this === void 0 ? void 0 : this.password, 10);
            }
        }
        next();
    });
});
UserSchema.methods.isPasswordCorrect = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(password, this.password);
    });
};
UserSchema.methods.generateAccessToken = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        profile_url: this.profile_url,
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
exports.User = mongoose_1.default.models.User || mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user_model.js.map