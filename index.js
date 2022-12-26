let persons = require("./persons");
const cors = require("cors");

const { response, application } = require("express");

const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

const requestLogger = (request, response, next)=>{
  console.log('METHOD', request.method)
  console.log('PATH:', request.path)
  console.log('Body:', request.body)
  console.log("-----")
  next()
}

app.use(requestLogger)

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.get("/api", (request, response) => {
  response.send("<h1>Hello World!!!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/info", (request, response) =>
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  )
);

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (!person) {
    response.status(400).json({ error: "content missing" });
  } else {
    response.json(person);
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const person = request.body;
  // response.setHeader("Content-Type", "application/json")
  person.id = generateId();
  // person.name = "Olanrewaju Opeyemi";
  // person.number = "081-081-676-28";

  !person.name
    ? response.status(400).json({ error: "name is missing" })
    : person.name;
  !person.number
    ? response.status(400).json({ error: "number is missing" })
    : person.number;
    if(persons.filter(p => p.name === person.name)){
      response.status(400).json({ error: "name must be unique" })
    }
  // persons.filter(p => p.name === person.name)
  //   ? response.status(400).json({ error: "name must be unique" })
  //   : person.name;

  persons = persons.concat(person);
  response.json(person);
});

const invalidEndPoint = (request, response) => {
  response.setHeader('Content-Type', 'application/json')
  response.status(404).send({error: 'invalid route'})
}
app.use(invalidEndPoint)

const PORT = 3001;
// const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`app is running on this ${PORT}`));