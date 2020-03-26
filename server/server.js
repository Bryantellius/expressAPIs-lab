const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const apiRoutes = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static("client"));

app.use("/api", apiRoutes);


app.listen(3000, () => console.log("Server listening at port 3000."));
