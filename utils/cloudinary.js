const fs = require('fs');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


exports.uploadImageToCloudinary = async (path,folder) => {
  const data = await cloudinary.uploader.upload(path, { folder });
  fs.unlinkSync(path)
  return data.secure_url;
}


exports.deletedImageFromCloudinary =async (public_id) => {
  await cloudinary.uploader.destroy(public_id);
}