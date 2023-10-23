require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5001;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const { validateMovie, validateUsers } = require("./validator.js");
const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");
const movieHandlers = require("./movieHandlers");
const UsersHandlers = require("./UserHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.get("/api/users", UsersHandlers.getUsers);
app.get("/api/users/:id", UsersHandlers.getUserById);

app.post(
  "/api/login",
  UsersHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.post("/api/movies", verifyToken, movieHandlers.postMovie);
app.put("/api/movies/:id", verifyToken, movieHandlers.updateMovie);

app.delete("/api/movies/:id", verifyToken, movieHandlers.deleteMovie);


app.post("/api/users", verifyToken, hashPassword, UsersHandlers.postUsers);
app.put("/api/users/:id", verifyToken, hashPassword, UsersHandlers.updateUser);

app.delete("/api/users/:id", verifyToken,UsersHandlers.deleteUser);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});