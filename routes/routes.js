const express = require("express");

const app = express();
const User = require("../models/user");
const Person = require("../models/Person");

app.post("/person", async (req, res) => {
  console.log(req.body);
  let person;
  if (req.body._id) {
    person = await Person.findById(req.body._id);
    person.name = req.body.name;
    person.lastName = req.body.lastName;
    person.secondLastName = req.body.secondLastName;
    person.age = req.body.age;
    person.nacionality = req.body.nacionality;
  } else {
    person = new Person({
      name: req.body.name,
      lastName: req.body.lastName,
      at: req.body.at,
      secondLastName: req.body.secondLastName,
      age: req.body.age,
      nacionality: req.body.nacionality,
    });
  }

  //console.log(newUser);

  try {
    const resp = await person.save();
    return res.send(resp);
  } catch (e) {
    console.log(e);
    return res.json({
      message: "No se logro registrar el usuario",
      code: e.code,
    });
  }
});
app.get("/people", async (req, res) => {
  try {
    const resp = await Person.find({});
    return res.send(resp);
  } catch (e) {
    console.log(e);
    return res.json({
      message: "No se logro registrar el usuario",
      code: e.code,
    });
  }
});
app.post("/delete", async (req, res) => {
  try {
    console.log(req.body);
    const resp = await Person.deleteOne(req.body);
    return res.send(resp);
  } catch (e) {
    console.log(e);
    return res.json({
      message: "No se logro registrar el usuario",
      code: e.code,
    });
  }
});

module.exports = app;
