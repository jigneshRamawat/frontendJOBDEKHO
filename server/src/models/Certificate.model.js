import mongoose, { Schema } from "mongoose";

const certificateSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        url: {
            type: String,
            trim: true,
            required: [true, "Certificate URL is required"]
        },
        name: {
            type: String,
            trim: true,
            required: [true, "Certificate name is required"]
        },
        issuingAuthority: {
            type: String,
            trim: true,
            required: [true, "Issuing authority is required"]
        },
        issuingDate: {
            type: Date,
            required: [true, "Issuing date is required"]
        }
    },
    {
        timestamps: true
    }
);

export const Certificate = mongoose.model("Certificate", certificateSchema);
