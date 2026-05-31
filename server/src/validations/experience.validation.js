import { z } from "zod";

export const addExperienceSchema = z.object({
    body: z.object({
        company: z.string().trim().min(1, "Company is required").max(100),
        title: z.string().trim().min(1, "Job title is required").max(100),
        location: z.string().trim().max(100).optional(),
        startDate: z.string().datetime().or(z.date()),
        endDate: z.string().datetime().or(z.date()).optional(),
        currentlyWorking: z.boolean().optional(),
        description: z.string().trim().max(1000).optional()
    }).refine(data => {
        if (!data.currentlyWorking && !data.endDate) {
            return false;
        }
        return true;
    }, {
        message: "End date is required if not currently working",
        path: ["endDate"]
    })
});

export const updateExperienceSchema = z.object({
    body: addExperienceSchema.shape.body.partial()
});
