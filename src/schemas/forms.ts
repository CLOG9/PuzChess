import { ZodType, z } from "zod";
export type formSchema = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};
export const form: ZodType<formSchema> = z
  .object({
    name: z.string().min(5).max(10).nonempty().toLowerCase(),
    email: z.string().email().nonempty(),
    password: z.string().min(6).max(20).nonempty(),
    confirmPassword: z.string().min(6).max(20).nonempty(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match",
    path: ["confirmPassword"],
  });
