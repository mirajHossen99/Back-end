import { prisma } from "../config/db.js";


// ---------------- Read All Movie ----------

const allMovies = async (req, res) => {

    const movies = await prisma.movie.findMany()

    if (!movies) {
        return res.status(404).json({ error: "Movie not found"});
    }

    res.status(201).json({
        status: "success",
        data: {
            movies,
        }
    })
}

// ----------------- Add movie --------------
const addMovie = async (req, res) => {

  const {
    title,
    overview,
    releaseYear,
    genres,
    runtime,
    posterUrl,
  } = req.body;

  const movie = await prisma.movie.create({
    data: {
        title,
        overview,
        releaseYear,
        genres,
        runtime,
        posterUrl,
        createBy: req.user.id
    }
  });

  res.status(201).json({
    status: "success",
    data: {
        movie,
    },
  });
};

// ----------------- Update movie --------------
const updateMovie = async (req, res) => {

  const {
    title,
    overview,
    releaseYear,
    genres,
    runtime,
    posterUrl,
  } = req.body;

  // Find move and verify owership
  const movie = await prisma.movie.findUnique({
    where: {id: req.params.id}
  })

  if (!movie) {
    return res.status(404).json({ error: "Movie not found"})
  }

  // Ensure only owner can update
  if (movie.createdBy !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this movie"})
  }

  // Build update data
  const updateData = {}

  if (title !== undefined ) updateData.title = title;
  if (overview !== undefined ) updateData.overview = overview;
  if (releaseYear !== undefined ) updateData.releaseYear = releaseYear;
  if (genres !== undefined ) updateData.genres = genres;
  if (runtime !== undefined ) updateData.runtime = runtime;
  if (posterUrl !== undefined ) updateData.posterUrl = posterUrl;


  // Update movie
  const updatedMovie = await prisma.movie.update({
    where: {id: req.params.id},
    data: updateData
  });

  res.status(200).json({
    status: "success",
    data: {
        movie: updatedMovie
    },
  });
};


// ---------------- Remove movie ---------------

const removeMovie = async (req, res) => {

    // Find movie and verify owership
    const movie = await prisma.movie.findUnique({
        where: { id: req.params.id }

    });

    if (!movie) {
        return res.status(404).json({ error: "Movie not found"})
    }

    // Ensure only owner can delete
    if (movie.createdBy !== req.user.id) {
        return res
          .status(403)
          .json({ error: "Not allowed to delete this movie"})
    }

    await prisma.movie.delete({
        where: { id: req.params.id },
    });

    res.status(200).json({
        status: "success",
        message: "Removed movie"
    });
}

export { allMovies, addMovie, updateMovie, removeMovie };




