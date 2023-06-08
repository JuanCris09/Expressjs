const express = require("express");
const app = express();

const movies = [
  { id: 1, name: "Star Wars", genre: "Adventure" },
  { id: 2, name: "Transformers", genre: "Adventure" },
  { id: 3, name: "Toy Story", genre: "Drama" },
  { id: 4, name: "The Pursuit of Happiness", genre: "Fiction" },
  { id: 5, name: "Terminator", genre: "Action" },
];

app.get("/addMovie", (req, res) => {
  res.sendFile(__dirname + "/03_CreateMovie.html");
});

//Get all the movies
app.get("/api/movies", (req, res) => {
  res.send(movies);
});

//Get each movie by id
app.get("/api/movies/:id", (req, res) => {
  let findPred = (mov) => mov.id === parseInt(req.params.id);
  let foundMovie = movies.find(findPred);
  if (foundMovie) {
    res.send(foundMovie);
  } else {
    res.send(`No movie found for id:- ${req.params.id}`);
  }
});

//Create a movie -> POST
app.use(express.json());
app.post("/api/movies", (request, response) => {
  console.log("/api/movies :- ", request);

  let newMovie = {
    id: movies.length + 1,
    name: request.body.name,
    genre: request.body.genre,
  };
  movies.push(newMovie);
  response.send(newMovie);
});

const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Listening to port ${port}`));