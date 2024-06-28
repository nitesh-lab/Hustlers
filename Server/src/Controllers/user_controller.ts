import { Request, Response } from "express";
import { User } from "../models/user_model";
import { client } from "../utils/redisConnect";

export async function Check_CreateUser(req:Request,res:Response){

    const {name,email,image}=req.body;

    let user={}

const user_exists=await client.json.get(email);

   if(user_exists){  // cache hit user exists.
    
    return res.status(200).json({"message":"done"});
   }

   else{    // cache miss
    const res = await User.findOne({ $or: [{ name: name }, { email:email }] });
  
   if (res) {
     await client.json.set(email,"$",res); // set in cache here

    return res.status(200).json({"message":"done"})
   }
    else {
    user = await User.create({
      name: name || "",
      email: email || "",
      profile_url: image || "",
    });
    
    await client.json.set(email,"$",user); // create user set in cache send him to dashboard.
    return res.status(200).json({"message":"done"})

   }
}
}

export async function FindUser(req:Request,res:Response) {
  
  const {email,name}=req.body;

  let user={}

  const user_exists=await client.json.get(email);
  
  if(user_exists){  // cache hit user exists.
    user=user_exists;
    return res.status(200).json({"user":user});
  }
  else{    // cache miss
    const res = await User.findOne({ $or: [{ name: name }, { email: email }] });
    
    if (res) {
      await client.json.set(email,"$",res); // set in cache here 
      user=res; 
      return res.status(200).json({"user":user});
    } else {
      return res.status(400);
  }
}
}