///////////////
//SETTING DEPENDENCIES
///////////////
const express = require("express");
const app = express();
const port = 3000;
const methodOverride = require("method-override")


///////////////
//DATA
///////////////
const pokemons = require("./models/pokemon.js");

//MIDDLEWARE
//runs in the middle of the request/response cycle
//not necessary
// app.use((req, res, next) => {
//   console.log("I run for all routes")
//   next()
// })

//TELLING EXPRESS TO USE MIDDLEWARE
//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
//The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
//STATIC
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/" , function (req, res){
  res.send(`Search your favorite Pokemon!, visit <a href="/pokemons"> /pokemons. </a>`)
})

///////////////
//DEFINE ROUTES
///////////////

//I
//N
//D
//U
//C
//E

//INDEX
//creates an index page with the data from the pokedexs array (pokemon.js)
app.get("/pokemons/new", (req, res) => {
  res.render("index.ejs", {
    pokemon: pokemons,
    tabTitle: "Index"
  });
});

//NEW
//gets info from the new.ejs file. a form was made to allow a user to create a new fruit
app.get("/pokemons/new", (req, res) => {
  res.render("new.ejs"), {
    pokedex: pokemons,
    tabTitle: "New"
  }
});

//DELETE
app.delete("/pokemons/:idOfPokemon", (req, res) => {
  pokemons.splice(req.params.idOfPokemon, 1);
  res.redirect("/pokemons");
});

//UPDATE ROUTE
app.put("/pokemons/:idOfPokemon", (req, res)=>{
  pokemons[req.params.idOfPokemon] = req.body;
  res.redirect("/pokemons")
});

//CREATE NEW
//this takes the input that was received in the new section, and pushes the info to the pokemon array. has a conditional to recognize a boolean value
app.post("/pokemons", (req, res) => {
  const newPokemon = {
    name: req.body.name,
    img: req.body.img,
    type: req.body.img,
    stats: {
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      spattack: req.body.spattack,
      spdefense: req.body.spdefense,
      speed: req.body.speed
    }
  };
  pokemon.push(newPokemon);
  res.redirect("/pokemons");
});

//EDIT
app.get("/pokemon/:idOfPokemon/edit", (req, res) => {
  res.render("edit.ejs", {
    aPokemon: pokemons[req.params.idOfPokemon],
    index: req.params.idOfPokemon,
    tabTitle: "Edit"
  });
});

//SHOW
//shows info on the specific fruit that was selected
app.get("/pokemons/:id", (req, res) => {
  res.render("show.ejs", {
    index: req.params.id,
    aPokemon: pokemon[req.params.id],
    tabTitle: "Show"
  });
});

//ROUTE LISTENER
app.listen(port, () => {
  console.log("Welcome to the world of Pokemon!")
});