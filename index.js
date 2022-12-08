import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Holla!");
});

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK!");
});