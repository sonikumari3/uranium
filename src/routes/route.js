const express = require("express");


const router = express.Router();

let players = [
  {
    name: "manish",
    dob: "1/1/1995",
    gender: "male",
    city: "jalandhar",
    sports: ["swimming"],
  },
  {
    name: "gopal",
    dob: "1/09/1995",
    gender: "male",
    city: "delhi",
    sports: ["soccer"],
  },
  {
    name: "lokesh",
    dob: "1/1/1990",
    gender: "male",
    city: "mumbai",
    sports: ["soccer"],
  },
];

router.post("/players", function (req, res) {
  let data = req.body;
  players.map((item) => {
    if (item.name === data.name) return res.send("Error");
  });
  players.push(data);
  // console.log(data.name);
  return res.send(players);

  // res.send({ data: players, status: true });
  // console.log(players);
});
router.post("/players1", function (req, res) {
  let data = req.body.age;
  let arr = [1, 2, 3, 4, 5, 7];
  arr.push(data);
  console.log(arr);
  // res.send({ "The new array is ": arr });
  console.log(data);
  res.send({ "The age is ": data, "The new array is": arr });
});
router.get("/players2", function (req, res) {
  let person = req.body.name;
  let person1 = req.body.last;
  let perso2 = req.body.name;
});
module.exports = router;
// adding this comment for no reason