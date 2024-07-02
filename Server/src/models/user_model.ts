import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface friends{
    Connection:mongoose.Types.ObjectId,
    isBlock:boolean
}

export interface UserData extends Document {
    _id:string,
    name: string; 
    email: string; 
    password: string; 
    Connections?:friends[]; 
    profile_url: string;
    isActive?: boolean | undefined; 
    lastSeen: string;
    refreshToken?: string; 
    Posts:mongoose.Types.ObjectId[],
    isPasswordCorrect?(password: string): Promise<boolean>;
    generateAccessToken?(): string;
    generateSecretToken?(): string;
}

const UserSchema = new Schema<UserData>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    profile_url: { type: String, required: true },
   Connections: [
    {
        type:{
            isBlock: { type: Boolean },
            Connection: { type: Schema.Types.ObjectId, ref: "User" }
            }
    }
],

   isActive: { type: Boolean, default: false },
    lastSeen: { type: String, default: "0" },
    Posts: { type: [{ type: Schema.Types.ObjectId, ref: "Post" }] },
    refreshToken: { type: String }
}, {
    timestamps: true
});

UserSchema.pre<UserData>("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

UserSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function (): string {
    return jwt.sign({
      _id:this._id,
        email: this.email,
        name: this.name,
        avatar: this.avatar,
    }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
};

UserSchema.methods.generateSecretToken= function (): string {
    return jwt.sign({
        _id: this._id,
    }, process.env.RefreshTokenSecret!, {
        expiresIn: process.env.RefreshTokenExpiry
    });
};

export const User = mongoose.model<UserData>("User", UserSchema);