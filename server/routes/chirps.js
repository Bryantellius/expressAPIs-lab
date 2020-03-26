const express = require("express");
const chirpsStore = require("../chirpstore");
let router = express.Router();

router.get("/:id?", async (req, res) => {
  try {
    let id = req.params.id;
    if (id) {
      res.json(chirpsStore.GetChirp(id));
    } else {
      res.json(chirpsStore.GetChirps());
    }
  } catch (error) {
    console.log(error);
    res.status("Error attempting to GET");
  }
});

router.post("/", (req, res) => {
  try {
    let chirp = req.body;
    chirpsStore.CreateChirp(chirp);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status("Error attempting to POST");
  }
});

router.put("/:id", (req, res) => {
  try {
    let id = req.params.id;
    let chirp = req.body;
    chirpsStore.UpdateChirp(id, chirp);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status("Error attempting to PUT");
  }
});

router.delete("/:id", (req, res) => {
  try {
    let id = req.params.id;
    chirpsStore.DeleteChirp(id);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status("Error attempting to DELETE");
  }
});

module.exports = router;
