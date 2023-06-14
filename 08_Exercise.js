//Get
//Get By Id, name category, price...
//Post
//update
//delete
//input validation

//Create a simple js based application ->
// Product -> id, name, price, brand, quantity
// CRUD -> C(POST), R(GET, GET By Id, Get By Name, Get By Price), U(PUT), D(DELETE)

const Joi = require("@hapi/joi");
const express = require("express");
const app = express();

const games = [
  { id: 1, name: "Valorant", price: "10000", brand: "Riot", quantity: 10 },
  {
    id: 2,
    name: "Leguend of league",
    price: "5000",
    brand: "Riot",
    quantity: 7,
  },
  { id: 3, name: "Mario Bros", price: "4000", brand: "Nintendo", quantity: 8 },
  { id: 4, name: "Mario Kart", price: "8000", brand: "Nintendo", quantity: 9 },
  { id: 5, name: "Krunker", price: "6000", brand: "Io", quantity: 5 },
];

// Get all games
app.get("/api/games", (req, res) => {
  res.send(games);
});

// Get a game
// app.get("/api/games/:id", (req, res) => {
//   let Prefind = (gam) => gam.id === parseInt(req.params.id);
//   let found = games.find(Prefind);
//   if (found) {
//     res.send(found);
//   } else res.send(`No game found: ${req.params.id}`);
// });

// Another way to find name
app.get("/api/games/id/:id", (req, res) => {
  res.send(findProduct("id", parseInt(req.params.id)));
});
app.get("/api/games/name/:name", (req, res) => {
  res.send(findProduct("name", req.params.name));
});
app.get("/api/games/brand/:brand", (req, res) => {
  res.send(findProduct("brand", req.params.brand));
});
let findProduct = (key, value) => {
  const prod = games.filter((p) => p[key] === value);
  if (prod) {
    return prod.length == 1 ? prod[0] : prod;
  } else {
    return `No Games found for ${key}: ${value}`;
  }
};

//Add a game
app.use(express.json());
app.post("/api/games", (req, res) => {
  console.log("Request Body data: ", req.body);

  const { name, price } = req.body; //Destructuring..
  console.log(" name of the game :- ", name, ", price:- ", price);

  //Data Validation
  if (name || name.length < 3) {
    res
      .status(400)
      .send("The name of the game is not present or less than 3 characters");
    return;
  }

  let newGames = {
    id: games.length + 1,
    name: req.body.name,
    price: req.body.price,
    brand: req.body.brand,
    quantity: req.body.quantity,
  };
  games.push(newGames);
  res.send(newGames);
});

//Update a game
app.use(express.json());
app.put("/api/games/:id", (req, res) => {
  //Validation for id from the user.
  console.log("Put method!", req.params);
  const idValidationSchema = Joi.object({
    id: Joi.number().integer(),
  });
  const idValidationResult = idValidationSchema.validate(req.params);
  if (idValidationResult.error) {
    const errMessage = idValidationResult.error.details[0].message;
    console.log("errMessage: ", errMessage);
    res.status(400).send(errMessage);
    return;
  }

  //Find the game, if exists or not
  let game = games.find((g) => g.id === parseInt(req.params.id));
  //if not return with suitable message
  if (!game) {
    res.send(`No game found for the id :- ${req.params.id}`);
  }

  //Validate for name string
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    price: Joi.number().required(),
    brand: Joi.string().min(3).required,
    quantity: Joi.number(),
  });
  const result = schema.validate(req.body);

  if (result.error) {
    const errorMsg = result.error.details[0].message;
    console.log("result:- ", errorMsg);
    res.status(400).send(errorMsg);
    return;
  }

  //if exists, update the game
  game.name = req.body.name;
  game.price = req.body.price;
  game.brand = req.body.brand;
  game.quantity = req.body.quantity;
  res.send(game);
});

//Delete a game

app.delete("/api/games/:id", (req, res) => {
  const idValidationSchema = Joi.object({
    id: Joi.number().integer(),
  });
  const idValidationResult = idValidationSchema.validate(req.params);
  if (idValidationResult.error) {
    const errMessage = idValidationResult.error.details[0].message;
    console.log("errMessage: ", errMessage);
    res.status(400).send(errMessage);
    return;
  }

  //Find the game, if exists or not
  let game = games.find((g) => g.id === parseInt(req.params.id));
  //if not return with suitable message
  if (!game) {
    res.send(`No game found for the id :- ${req.params.id}`);
  }

  //Delete movie logic
  const index = games.indexOf(game);
  if (index != -1) {
    games.splice(index, 1);
  }
  res.send(game);
});
const port = process.env.PORT || "5000";

console.log("Port:-", port);
app.listen(port, () => console.log(`Listening to port ${port}`));
