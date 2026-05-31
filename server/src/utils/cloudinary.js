import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload a file buffer to Cloudinary using streamifier
 * @param {Buffer} fileBuffer - The file buffer from Multer memory storage
 * @param {string} folder - The folder in Cloudinary
 * @param {string} resourceType - 'image', 'raw', or 'video'
 * @returns {Promise<Object>} The Cloudinary upload response
 */
export const uploadOnCloudinary = (fileBuffer, folder, resourceType = "auto") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType
            },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
};

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - The public_id of the asset
 * @param {string} resourceType - 'image', 'raw', or 'video'
 * @returns {Promise<Object>} The Cloudinary deletion response
 */
export const deleteFromCloudinary = async (publicId, resourceType = "image") => {
    try {
        if (!publicId) return null;
        const response = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType
        });
        return response;
    } catch (error) {
        console.error("Error deleting from Cloudinary:", error);
        return null;
    }
};
