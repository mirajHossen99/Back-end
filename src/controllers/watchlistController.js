import { prisma } from "../config/db.js"


const addToWatchlist = async (req, res) => {
    const { movieId, status, rating, notes } = req.body

    // Veriry movie exists
    const movie = await prisma.movie.findUnique({
        where: { id: movieId },
    });

    if (!movie) {
        return res.status(404).json({error: "Movie not found"});
    }

    // Check if already added
    const existingInWatchlist = await prisma.watchListItem.findUnique({
        where: {id: movieId},
        
    })
}