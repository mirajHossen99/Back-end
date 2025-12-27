import { email, z } from "zod";

const authSchema = z.object({
  name: z.string("Name must be a string").optional(),
  email: z.email("E-mail must be contain"),
  password: z.string().min(6, {
    error: (iss) => {

      iss.minimum;
      iss.inclusive;
      return `Password must have ${iss.minimum} characters or more`;
      
    },
  }),
});

export { authSchema };
