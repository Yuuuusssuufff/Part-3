const persons = require("./persons");
const cors = require('cors')

// const { response } = require("express");
const express = require("express");
const app = express();
app.use(cors())

app.get("/", (request, response) => {
  response.send("<h1>Hello World!!!</h1>");
});

app.get("/persons", (request, response) => {
  response.json(persons);
});
app.get("/info", (request, response) =>
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  )
);

app.get("/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  
  if(!person){response.status(400).json({error: 'content missing'})}
  else{response.json(person)}
});

app.delete('/persons/:id', (request, response)=>{
  const id = Number(request.params.id)
  const persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("app is running on 3003"));

// const os = require('os')
// const user = os.userInfo()
// console.log(user)
// console.log(os.uptime())
// const currentOs = {
//   name: os.type(),
//   release: os.release(),
//   totalMem: os.totalmem(),
//   freeMem: os.freemem()
// }

// console.log(currentOs)

// const path = require('path')
// console.log(path.sep)