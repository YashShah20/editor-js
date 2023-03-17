const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { report } = require("./report");
const { save } = require("./saveToDocx");

const app = express();

app.use("/", express.static("public"));
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ msg: "Use GET /report to download the report" });
});

app.post("/report", report);
app.post("/save", save);

const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`app is running at port ${port}`);
});
