Since you are building a movie-tracking backend with **PostgreSQL** and **Prisma**, your documentation should highlight the database interaction and the validation layer (Zod).

Here is a structured `README.md` template you can use for your project.

---

# 🎬 Movie Watchlist API

A robust backend service for managing movie databases and personal user watchlists. Built with **Node.js**, **Express.js**, and **PostgreSQL** using **Prisma ORM**.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Validation:** Zod
* **Authentication:** JWT & Bcryptjs

---

## ⚙️ Installation & Setup

1. **Clone the repository and install dependencies:**
```bash
npm install

```


2. **Configure Environment Variables:**
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/movie_db?schema=public"
JWT_SECRET="your_jwt_secret_key"
PORT=5001

```


3. **Database Migration:**
```bash
npx prisma migrate dev --name init
npx prisma generate

```


4. **Run the Project:**
```bash
npm run dev

```



---

## 📡 API Documentation

### 🔐 Authentication (`/auth`)

| Method | Endpoint | Description | Validation |
| --- | --- | --- | --- |
| **POST** | `/auth/register` | Create a new user account | `registerSchema` |
| **POST** | `/auth/login` | Authenticate user & get token | `loginSchema` |
| **POST** | `/auth/logout` | Clear user session | None |

### 🎥 Movie Management (`/movies`)

*Requires Authentication Header: `Authorization: Bearer <token>*`

| Method | Endpoint | Description | Validation |
| --- | --- | --- | --- |
| **GET** | `/movies` | Fetch all movies | None |
| **POST** | `/movies` | Add a new movie to the DB | `createMovieSchema` |
| **PUT** | `/movies/:id` | Update movie details | `updateMovieSchema` |
| **DELETE** | `/movies/:id` | Remove a movie from the DB | None |

### 📌 Watchlist (`/watchlist`)

*Requires Authentication Header: `Authorization: Bearer <token>*`

| Method | Endpoint | Description | Validation |
| --- | --- | --- | --- |
| **POST** | `/watchlist` | Add a movie to your personal list | `addToWatchlistSchema` |
| **PUT** | `/watchlist/:id` | Update item status (e.g. watched) | None |
| **DELETE** | `/watchlist/:id` | Remove from watchlist | None |

---

## 🧪 Testing Guide

### 1. Request Structure

All POST/PUT requests expect a JSON body. Example for **Adding a Movie**:

```json
{
  "title": "Inception",
  "genre": "Sci-Fi",
  "releaseYear": 2010,
  "director": "Christopher Nolan"
}

```

### 2. Validation Errors

If the data sent does not match the **Zod** schema, the API will return a `400 Bad Request` with a detailed error array:

```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": [
    { "path": "releaseYear", "message": "Expected number, received string" }
  ]
}

```

### 3. Graceful Shutdown

The server is configured to handle `SIGTERM` and `unhandledRejection`. It will automatically disconnect the Prisma client and close the database connection before exiting to prevent data corruption.

---

## 📂 Project Structure

```text
src/
├── config/         # Database & Env configuration
├── controllers/    # Request handlers
├── middleware/     # Auth & Validation logic
├── routes/         # API Route definitions
├── validators/     # Zod schemas
└── server.js       # Entry point

```

Would you like me to help you write the **Zod Schemas** or the **Prisma Schema** file to ensure the database matches these routes?
