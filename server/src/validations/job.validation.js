import { z } from "zod";
import { EXPERIENCE_LEVELS } from "../constants/index.js";

export const createJobSchema = z.object({
    body: z.object({
        companyId: z.string().min(1, "Company ID is required"),
        title: z.string().trim().min(1, "Job title is required").max(100),
        description: z.string().min(10, "Job description must be at least 10 characters"),
        requirements: z.array(z.string()).optional(),
        skills: z.array(z.string()).optional(), // Array of skill IDs
        experienceLevel: z.enum(EXPERIENCE_LEVELS),
        location: z.string().trim().min(1, "Location is required"),
        jobType: z.enum(["full-time", "part-time", "contract", "internship", "freelance"]).optional(),
        salaryRange: z.object({
            min: z.number().optional(),
            max: z.number().optional(),
            currency: z.string().optional()
        }).optional(),
        status: z.enum(["active", "closed", "draft"]).optional()
    })
});
