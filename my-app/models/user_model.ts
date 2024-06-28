import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; 
import jwt from "jsonwebtoken";

export interface User_Type extends mongoose.Document {
  name: string;
  profile_url: string;
  email?: string; 
  password?:string,
  _id:string,
}

const UserSchema = new mongoose.Schema<User_Type>({
  name: { type: String, required: true }, 
  profile_url: { type: String, required: true },
  email: { type: String, unique: true }, // Make email unique (optional),
  password:{type:String},
});


UserSchema.pre<User_Type>("save", async function (next) {
    if(this.password){
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this?.password, 10);
    }
    }
    next();
});

UserSchema.methods.isPasswordCorrect =async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function (): string {
    return jwt.sign({
      _id:this._id,
        email: this.email,
        name: this.name,
        profile_url:this.profile_url,
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

export const User=mongoose.models.User||mongoose.model<User_Type>('User', UserSchema);
