const router = require("express").Router();
const Favourites = require("../models/favourites");

//add favourites
router.post("/add", async (req, res) => {
  const addFavourite = new Favourites(req.body);
  try {
    const favourite = await addFavourite.save();
    res.status(200).json(favourite);
    console.log("added to your favourite.");
  } catch (error) {
    console.log(error);
  }
});

//delete favourites
router.post("/delete", async (req, res) => {
  try {
    console.log(req.id);
    const removeItem = await Favourites.deleteOne({
      id: req.body.id,
      email: req.body.email,
    });
    if (!removeItem) {
      res.status(400).json("This items is already remove from your favourite.");
    }
    console.log(`Removed item from your favourite.`);
  } catch (error) {
    console.log(error);
  }
});

//get all favourites
router.post("/", async (req, res) => {
  try {
    const favourites = await Favourites.find({
      email: req.body.email,
    });
    if (!favourites) {
      res.status(400).json("NO item in your SUKI.");
    }
    res.status(200).json(favourites);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
