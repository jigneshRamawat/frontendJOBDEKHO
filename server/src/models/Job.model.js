import mongoose, { Schema } from "mongoose";
import { EXPERIENCE_LEVELS } from "../constants/index.js";

const jobSchema = new Schema(
    {
        company: {
            type: Schema.Types.ObjectId,
            ref: "Company",
            required: true,
            index: true
        },
        title: {
            type: String,
            trim: true,
            required: [true, "Job title is required"],
            maxLength: 100
        },
        description: {
            type: String,
            required: [true, "Job description is required"]
        },
        requirements: {
            type: [String],
            default: []
        },
        skills: [
            {
                type: Schema.Types.ObjectId,
                ref: "Skill"
            }
        ],
        experienceLevel: {
            type: String,
            enum: EXPERIENCE_LEVELS,
            required: true
        },
        location: {
            type: String,
            trim: true,
            required: true
        },
        jobType: {
            type: String,
            enum: ["full-time", "part-time", "contract", "internship", "freelance"],
            default: "full-time"
        },
        salaryRange: {
            min: { type: Number },
            max: { type: Number },
            currency: { type: String, default: "INR" }
        },
        status: {
            type: String,
            enum: ["active", "closed", "draft"],
            default: "active",
            index: true
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

export const Job = mongoose.model("Job", jobSchema);
