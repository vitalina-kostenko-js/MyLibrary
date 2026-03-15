import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
    .object({
        name: z.string().min(1, { message: "Name is required." }),
        email: z.string().email({ message: "Invalid email" }),
        password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
        confirmPassword: z.string().min(6, { message: "Password confirmation is required." }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

export type RegisterFormValues = z.infer<typeof registerSchema>;
