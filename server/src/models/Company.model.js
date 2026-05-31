import mongoose, { Schema } from "mongoose";

const companySchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Company name is required"],
            maxLength: 100
        },
        description: {
            type: String,
            trim: true,
            maxLength: 2000
        },
        logo: {
            type: String,
            trim: true,
            default: ""
        },
        website: {
            type: String,
            trim: true,
            match: [/^https?:\/\/.+/, "Invalid website URL"]
        },
        location: {
            type: String,
            trim: true
        },
        hrIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        industry: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

export const Company = mongoose.model("Company", companySchema);
