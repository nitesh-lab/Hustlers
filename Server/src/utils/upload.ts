import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARYNAME, 
  api_key: process.env.CLOUDINARYKEY,   // credentials were the issue
  api_secret: process.env.CLOUDINARYSECRET, 
});

export default async function uploadCloudinary(imagePath: string):Promise<string|null> {
try {
const data=await cloudinary.uploader.upload(imagePath);
    return data.url;
}
catch(e:any){
    console.log("cloudinary issue"+e)
    return null
}
}