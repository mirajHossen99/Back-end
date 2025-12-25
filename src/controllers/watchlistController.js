import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes, userId } = req.body;

  // Veriry movie exists
  const movie = await prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  // Check if already added
  const existingInWatchlist = await prisma.watchListItem.findUnique({
    where: {
      userId_movieId: {
        userId: userId,
        movieId: movieId,
      },
    },
  });

  if (existingInWatchlist) {
    return res.status(400).json({ error: "Movie already in the watchlist"})
  }

  const watchlistItem = await prisma.watchListItem.create({
    data: {
        userId,
        movieId,
        status: status || "PLANNED",
        rating,
        notes,
    }
  });

  res.status(201).json({
    status: "Success",
    data: {
        watchlistItem,
    },

  });
};

export {addToWatchlist}
