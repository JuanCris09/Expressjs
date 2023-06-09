const Joi = require("@hapi/joi");
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
  res.send(movies);
});

 
app.delete("/api/movies/:id", (req, res) => {
  //Validation for id from the user.
  const idValidationSchema = Joi.object({
    id: Joi.number().integer(),
  });
  const idValidationResult = idValidationSchema.validate(req.params);
  if (idValidationResult.error) {
    const errMessage = idValidationResult.error.details[0].message;
    console.log("errMessage :- ", errMessage);
    res.status(400).send(errMessage);
    return;
  }

  //Find the movie, if exists or not
  let movie = movies.find((m) => m.id === parseInt(req.params.id));
  //if not return with suitable message
  if (!movie) {
    res.send(`No movie found for the id :- ${req.params.id}`);
  }

  console.log("movie", movie);

  //Delete movie logic
  const index = movies.indexOf(movie);
  if (index != -1) {
    movies.splice(index, 1);
  }
  res.send(movie);
});

const port = process.env.PORT || "5000";
app.listen(port, () => console.log(`Listening to port ${port}`));