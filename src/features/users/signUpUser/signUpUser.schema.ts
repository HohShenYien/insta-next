import { z } from "zod";

export type SignUpUserParams = {
  email: string;
  username: string;
  password: string;
  description?: string;
};

export const signUpUserSchema = z.object({
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  description: z.string().optional(),
});
