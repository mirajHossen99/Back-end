import { prisma } from "../config/db.js";


// ------------ Add watchlistItem --------------

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
    status: "success",
    data: {
      watchlistItem,
    },
  });
};

// ------------ Update watchlistItem -----------

const updateWatchlistItem = async (req, res) => {

  const { status, rating, notes } = req.body;

  // Find watchlist item and verify ownership
  const watchlistItem = await prisma.watchListItem.findUnique({
    where: {id: req.params.id}
  });

  if (!watchlistItem) {
    return res.status(404).json({ error: "Watchlist item not found"})
  }

  // Ensure only owner can update
  if (watchlistItem.userId !== req.user.id) {
    return res
       .status(403)
       .json({ error: "Not allowed to update this watchlist item"});
  }

  // Build update data
  const updateData = {}
  
  if (status !== undefined ) updateData.status = status.toUpperCase();
  if (rating !== undefined ) updateData.rating = rating;
  if (notes !== undefined ) updateData.notes = notes;


  // Update watchlist item
  const updatedItem = await prisma.watchListItem.update({
    where: {id: req.params.id},
    data: updateData,
  });

  res.status(200).json({
    status: "success",
    data: {
      watchlistItem: updatedItem,
    }
  })

}


// ------------ Remove watchlistItem -------------

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
    status: "success",
    message: "Movie removed from watchlist",
  });

};

export { addToWatchlist, updateWatchlistItem, removeFromWatchlist };
