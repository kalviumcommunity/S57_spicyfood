const express = require("express");
const router = express.Router();
const spicyfood = require("../Schema/schema");
const { validate } = require("./validation");
const joi = require("joi");
const { foodValidationSchema } = require("./validation");
const { usersValidationSchema } = require("./validation");

router.get("/", async (req, res) => {
  try {
    const spicyfoods = await spicyfood.find();
    console.log(spicyfood);
    res.json(spicyfoods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const spicyfoodFound = await spicyfood.findById(req.params.id);
    if (!spicyfoodFound) {
      return res.status(404).json({ error: "Spicyfood not found" });
    }
    res.json(spicyfoodFound);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add-food", async (req, res) => {
  const { error } = foodValidationSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((detail) => detail.message) });
  }

  const newSpicyfood = new spicyfood({
    Image: req.body.Image,
    Dish_Name: req.body.Dish_Name,
    type: req.body.type,
    Ingridents: req.body.Ingridents,
    Origin: req.body.Origin,
  });
  try {
    const saveSpicyfood = await newSpicyfood.save();
    res.json(saveSpicyfood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedSpicyfood = await spicyfood.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSpicyfood) {
      return res.status(404).json({ error: "Spicyfood not found" });
    }
    res.json(updatedSpicyfood);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete-food/:id", async (req, res) => {
  try {
    const deletedSpicyfood = await spicyfood.findByIdAndDelete(req.params.id);
    if (!deletedSpicyfood) {
      return res.status(404).json({ error: "Spicyfood not found" });
    }
    res.json({ message: "Spicyfood deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
