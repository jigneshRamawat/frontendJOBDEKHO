import { z } from "zod";

export function registerValidator() {
    const Schema = z.object({
        name: z
            .string()
            .trim()
            .min(3, "Full name must be at least 3 characters")
            .max(64, "Full name cannot exceed 64 characters")
            .regex(/^[A-Za-z\s]+$/, "Only alphabets allowed"),

        title: z
            .string()
            .trim()
            .min(10, "Professional headline must be at least 10 characters")
            .max(80, "Professional headline cannot exceed 80 characters"),

        email: z
            .string()
            .trim()
            .toLowerCase()
            .email("Invalid email"),

        password: z
            .string()
            .trim()
            .min(8, "Password must be at least 8 characters")
            .max(12, "Password cannot exceed 12 characters")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
                "Password must contain uppercase, lowercase, number, and special character"
            ),

        phone: z
            .string()
            .trim()
            .regex(/^(?:\+91[\-\s]?)?[6-9]\d{9}$/, "Invalid phone number"),
    });

    return Schema;
};

export const loginValidator = z.object({
    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email"),
    password: z
        .string()
        .trim()
        .min(8, "Password must be at least 8 characters")
        .max(12, "Password cannot exceed 12 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
            "Password must contain uppercase, lowercase, number, and special character"
        ),
})