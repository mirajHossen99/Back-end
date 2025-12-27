import { z } from "zod";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please provide a valid email")
    .toLowerCase(),

  password: z.string().min(6, {
    error: (iss) => {
      iss.minimum;
      iss.inclusive;
      return `Password must have ${iss.minimum} characters or more`;
    },
  }),
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please provide a valid email")
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required")
});

// const authSchema = z.object({
//   name: z.string("Name must be a string").optional(),
//   email: z.email("E-mail must be contain"),
//   password: z.string().min(6, {
//     error: (iss) => {

//       iss.minimum;
//       iss.inclusive;
//       return `Password must have ${iss.minimum} characters or more`;

//     },
//   }),
// });

export { registerSchema, loginSchema };
