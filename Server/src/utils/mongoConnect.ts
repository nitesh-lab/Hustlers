import mongoose from "mongoose";
 
export async function ConnectDB():Promise<void>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongo connected");
    }
    catch(e){
        console.log(e);
    }
}
