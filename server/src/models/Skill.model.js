import mongoose, { Schema } from "mongoose";

const skillSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Skill name is required"],
            unique: true,
            lowercase: true,
            index: true
        },
        category: {
            type: String,
            trim: true,
            default: "general"
        }
    },
    {
        timestamps: true
    }
);

export const Skill = mongoose.model("Skill", skillSchema);
