import { z } from "zod";

const addMovieSchema = z.object({
  title: z.string(),
  overview: z.string().optional(),
  releaseYear: z.number().int("Release year must be an integer"),
  runtime: z.number().int(),

  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      error: () => ({
        message:
          "Status must be one of : PLANNED, WATCHING, COMPLETED, DROPPED",
      }),
    })
    .optional(),

  rating: z.coerce
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10")
    .optional(),

  notes: z.string().optional(),
});

export { addMovieSchema }
