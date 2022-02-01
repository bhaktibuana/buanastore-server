const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { db } = require("./services/dbConnection");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Buana Store API Server.",
  });
});

// test db connection
app.get("/get", (req, res) => {
  const dbQuery = "SELECT * FROM product";
  db.query(dbQuery, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});

app.listen(PORT, () => {
  console.log("Server is listening on", PORT);
});
