const persons = require("./persons");

// const { response } = require("express");
const express = require("express");
const app = express();


app.get("/", (request, response) => {
  response.send("<h1>Hello World!!!</h1>");
});

app.get("/notes", (request, response) => {
  response.json(persons);
});
app.get("/part", (request, response) =>
  response.send("<h2>This is part 1</h2>")
);
const PORT = 3001;
app.listen(PORT, () => console.log("app is running on 3003"));
