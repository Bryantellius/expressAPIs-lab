const express = require("express");
const path = require("path");
const cors = require("cors");
const apiRoutes = require("./routes");

let app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRoutes);

app.use(express.static(path.join(__dirname, "../client")));

app.listen(3000);
