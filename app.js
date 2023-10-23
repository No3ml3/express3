require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5001;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

const { validateMovie, validateUsers } = require("./validator.js");

app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);


const UsersHandlers = require("./UserHandlers");

const { hashPassword } = require("./auth.js");

app.post("/api/users", hashPassword, UsersHandlers.postUsers);
app.put("/api/users/:id", hashPassword, UsersHandlers.updateUser);

app.delete("/api/users/:id", UsersHandlers.deleteUser);


app.get("/api/users", UsersHandlers.getUsers);
app.get("/api/users/:id", UsersHandlers.getUserById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});