import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema(
    {
        job: {
            type: Schema.Types.ObjectId,
            ref: "Job",
            required: true,
            index: true
        },
        applicant: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        status: {
            type: String,
            enum: ["pending", "reviewed", "shortlisted", "interview", "rejected", "hired"],
            default: "pending",
            index: true
        },
        resume: {
            type: String,
            trim: true,
            required: [true, "Resume is required for application"]
        },
        coverLetter: {
            type: String,
            trim: true,
            maxLength: 2000
        },
        appliedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

// Prevent user from applying to the same job multiple times
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

export const Application = mongoose.model("Application", applicationSchema);
