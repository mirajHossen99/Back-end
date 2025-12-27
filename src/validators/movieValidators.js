import { z } from "zod";

const createMovieSchema = z.object({
  title: z.string().trim().min(1, "Movie title is required"),
  releaseYear: z.coerce
    .number()
    .int("Release year must be an integer")
    .min(1888, "Release year must be a valid year")
    .max(new Date().getFullYear() + 10, "Release year must be a valid year"),
    
  overview: z.string().trim().optional(),
  genres: z
    .array(z.string(), { message: "All genres must be strings" })
    .optional(),
  runtime: z.coerce
    .number()
    .int("Runtime must be an integer")
    .positive("Runtime must be a positive number (in minutes)")
    .optional(),
  posterUrl: z.string().url("Poster URL must be a valid URL").optional(),
});

const updateMovieSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty").optional(),
  releaseYear: z.coerce
    .number()
    .int("Release year must be an integer")
    .min(1888, "Release year must be a valid year")
    .max(new Date().getFullYear() + 10, "Release year must be a valid year")
    .optional(),
  overview: z.string().trim().optional(),
  genres: z
    .array(z.string(), { message: "All genres must be strings" })
    .optional(),
  runtime: z.coerce
    .number()
    .int("Runtime must be an integer")
    .positive("Runtime must be a positive number (in minutes)")
    .optional(),
  posterUrl: z.string().url("Poster URL must be a valid URL").optional(),
});

// const addMovieSchema = z.object({
//   title: z.string("Title must be contain"),
//   overview: z.string("Overwiew must be a string").optional(),
//   releaseYear: z.number().int("Release year must be an integer"),
//   genres: z.array(z.string(), "Genres must be string"),
//   runtime: z.number().int("It must be an integer").optional(),
//   posterUrl: z.string("Post url must be a string").optional(),
// });

// const updateMovieSchema = z.object({
//   title: z.string("Title must be contain"),
//   overview: z.string("Overwiew must be a string").optional(),
//   releaseYear: z.number().int("Release year must be an integer"),
//   genres: z.array(z.string(), "Genres must be string"),
//   runtime: z.number().int("It must be an integer").optional(),
//   posterUrl: z.string("Post url must be a string").optional(),
// });

export { createMovieSchema, updateMovieSchema };
