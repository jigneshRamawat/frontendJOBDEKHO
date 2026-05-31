import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Profile } from "../models/Profile.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    let profile = await Profile.findOne({ user: userId });

    if (!profile) {
        profile = await Profile.create({ user: userId });
    }

    // Merge req.body properties
    const allowedUpdates = ["title", "about", "gender", "languages", "experienceLevel", "location", "socialLinks"];
    
    for (const key of allowedUpdates) {
        if (req.body[key] !== undefined) {
            profile[key] = req.body[key];
        }
    }

    await profile.save();

    return res
        .status(200)
        .json(new ApiResponse(200, profile, "Profile updated successfully"));
});

const getProfile = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ user: req.user._id }).populate("user", "name email phone role isVerified");

    if (!profile) {
        throw new ApiError(404, "Profile not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, profile, "Profile fetched successfully"));
});

export { updateProfile, getProfile };

const updateProfileImage = asyncHandler(async (req, res) => {
    const file = req.file;

    if (!file) {
        throw new ApiError(400, "Profile image is required");
    }

    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
        throw new ApiError(404, "Profile not found");
    }

    // Delete existing image from Cloudinary if it exists
    if (profile.profileImage?.public_id) {
        await deleteFromCloudinary(profile.profileImage.public_id, "image");
    }

    // Upload new image via stream
    const uploadResult = await uploadOnCloudinary(file.buffer, "job_portal/profiles", "image");

    if (!uploadResult) {
        throw new ApiError(500, "Failed to upload image to Cloudinary");
    }

    profile.profileImage = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id
    };

    await profile.save();

    return res
        .status(200)
        .json(new ApiResponse(200, profile.profileImage, "Profile image updated successfully"));
});

const deleteProfileImage = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile || !profile.profileImage?.public_id) {
        throw new ApiError(404, "Profile image not found");
    }

    const deleteResult = await deleteFromCloudinary(profile.profileImage.public_id, "image");

    if (!deleteResult) {
        throw new ApiError(500, "Failed to delete image from Cloudinary");
    }

    profile.profileImage = { url: "", public_id: "" };
    await profile.save();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Profile image deleted successfully"));
});

const updateResume = asyncHandler(async (req, res) => {
    const file = req.file;

    if (!file) {
        throw new ApiError(400, "Resume file is required");
    }

    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile) {
        throw new ApiError(404, "Profile not found");
    }

    // Delete existing resume from Cloudinary if it exists
    if (profile.resume?.public_id) {
        await deleteFromCloudinary(profile.resume.public_id, "auto");
    }

    // Upload new resume via stream (raw type for pdf/docs)
    const uploadResult = await uploadOnCloudinary(file.buffer, "job_portal/resumes", "auto");

    if (!uploadResult) {
        throw new ApiError(500, "Failed to upload resume to Cloudinary");
    }

    profile.resume = {
        url: uploadResult.secure_url.replace("/upload/","/upload/f_auto/"),
        public_id: uploadResult.public_id
    };

    await profile.save();

    return res
        .status(200)
        .json(new ApiResponse(200, profile.resume, "Resume updated successfully"));
});

const deleteResume = asyncHandler(async (req, res) => {
    const profile = await Profile.findOne({ user: req.user._id });

    if (!profile || !profile.resume?.public_id) {
        throw new ApiError(404, "Resume not found");
    }

    const deleteResult = await deleteFromCloudinary(profile.resume.public_id, "raw");

    if (!deleteResult) {
        throw new ApiError(500, "Failed to delete resume from Cloudinary");
    }

    profile.resume = { url: "", public_id: "" };
    await profile.save();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Resume deleted successfully"));
});

export { updateProfileImage, deleteProfileImage, updateResume, deleteResume };
