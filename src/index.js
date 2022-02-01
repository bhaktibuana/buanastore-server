const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Buana Store API Server.",
  });
});

app.listen(PORT, () => {
  console.log("Server is listening on", PORT);
});
