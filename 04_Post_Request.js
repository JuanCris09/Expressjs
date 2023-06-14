const express = require("express");
const app = express();

const movies = [
  { id: 1, name: "Star Wars", genre: "Adventure" },
  { id: 2, name: "Transformers", genre: "Adventure" },
  { id: 3, name: "Toy Story", genre: "Drama" },
  { id: 4, name: "The Pursuit of Happiness", genre: "Fiction" },
  { id: 5, name: "Terminator", genre: "Action" },
];

//Get all the movies
app.get("/api/movies", (req, res) => {
  console.log("Welcome");
  res.send(movies);
});

//Middleware in Node JS
app.use(express.json()); //Which will add req.body, req.params.id etc...
app.post("/api/movies", (req, res) => {
  console.log("Request Body data :- ", req.body);

  const { name, genre } = req.body; //Destructuring..
  console.log(" name of the movie :- ", name, ", genre:- ", genre);

  //Data Validation
  if (!name || name.length < 3) {
    res
      .status(400)
      .send("The name of the movie is not present or less than 3 characters");
    return;
  }

  //Adding the movie to movies list
  let newMovie = {
    id: movies.length + 1,
    name: name,
    genre: genre,
  };

  movies.push(newMovie);
  res.send(newMovie);
});
const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Listening to port ${port}`));
