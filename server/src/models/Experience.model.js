import mongoose, { Schema } from "mongoose";

const experienceSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        company: {
            type: String,
            trim: true,
            required: [true, "Company name is required"],
            maxLength: 100
        },
        title: {
            type: String,
            trim: true,
            required: [true, "Job title is required"],
            maxLength: 100
        },
        location: {
            type: String,
            trim: true,
            maxLength: 100
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"]
        },
        endDate: {
            type: Date
        },
        currentlyWorking: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            trim: true,
            maxLength: 1000
        }
    },
    {
        timestamps: true
    }
);

// Prevent exact duplicate experiences for the same user
experienceSchema.index({ user: 1, company: 1, title: 1 }, { unique: true });

export const Experience = mongoose.model("Experience", experienceSchema);
