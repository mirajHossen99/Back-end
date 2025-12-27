import { z } from "zod";

const addMovieSchema = z.object({
  title: z.string("Title must be contain"),
  overview: z.string("Overwiew must be a string").optional(),
  releaseYear: z.number().int("Release year must be an integer"),
  genres: z.array(z.string("Genres must be contain")),
  runtime: z.number().int("It must be an integer").optional(),
  posterUrl: z.string("Post url must be a string").optional(),

});

const updateMovieSchema = z.object({
  title: z.string("Title must be contain"),
  overview: z.string("Overwiew must be a string").optional(),
  releaseYear: z.number().int("Release year must be an integer"),
  genres: z.array(z.string("Genres must be contain")),
  runtime: z.number().int("It must be an integer").optional(),
  posterUrl: z.string("Post url must be a string").optional(),

});

export { addMovieSchema, updateMovieSchema }
