const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const communitiesController = require("../controllers/communities");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Main routes
router.get("/", ensureAuth, communitiesController.getCommunities);


module.exports = router;
