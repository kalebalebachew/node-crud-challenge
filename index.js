const express = require("express");
const cors = require("cors");
const personRoutes = require("./routes/person");

const app = express();
app.use(express.json());

const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsConfig));

let persons = [{ id: "1", name: "Sam", age: 26, hobbies: [] }];

app.set("db", persons);

app.use("/person", personRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

//changed the port to 9000 because something i don't know of is running on port 3000
const server = app.listen(9000, () => {
  console.log("Server is running on port 9000");
});

module.exports = { app, server };
