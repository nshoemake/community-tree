const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const seedsController = require("../controllers/seeds");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Seed Routes
router.post("/createSeed", seedsController.createSeed);
router.patch("/likeSeed/:id", seedsController.likeSeed);
router.delete("/deleteSeed/:id", seedsController.deleteSeed);

module.exports = router;
