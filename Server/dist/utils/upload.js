"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARYNAME,
    api_key: process.env.CLOUDINARYKEY, // credentials were the issue
    api_secret: process.env.CLOUDINARYSECRET,
});
async function uploadCloudinary(imagePath) {
    try {
        const data = await cloudinary_1.v2.uploader.upload(imagePath);
        return data.url;
    }
    catch (e) {
        console.log("cloudinary issue" + e);
        return null;
    }
}
exports.default = uploadCloudinary;
//# sourceMappingURL=upload.js.map