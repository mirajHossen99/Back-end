import { prisma } from "../config/db.js";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

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
        userId: req.user.id,
        movieId: movieId,
      },
    },
  });

  if (existingInWatchlist) {
    return res.status(400).json({ error: "Movie already in the watchlist" });
  }

  const watchlistItem = await prisma.watchListItem.create({
    data: {
      userId: req.user.id,
      movieId,
      status: status || "PLANNED",
      rating,
      notes,
    },
  });

  res.status(201).json({
    status: "Success",
    data: {
      watchlistItem,
    },
  });
};

const removeFromWatchlist = async (req, res) => {
  // Find watchlist item and verify owership
  const watchlistItem = await prisma.watchListItem.findUnique({
    where: { id: req.params.id },
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found" });
  }

  // Ensure only owner can delete
  if (watchlistItem.userId !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not allowed to update this watchlist item" });
  }

  await prisma.watchListItem.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    status: "Success",
    message: "Movie removed from watchlist",
  });
  
};

export { addToWatchlist, removeFromWatchlist };
