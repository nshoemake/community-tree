const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const communitiesController = require("../controllers/communities");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// Main routes
router.get("/", ensureAuth, communitiesController.getCommunities);
router.get("/:id", ensureAuth, communitiesController.getCommunity);
router.get("/:id/api", ensureAuth, communitiesController.getSeeds); 
router.post("/createCommunity", ensureAuth, communitiesController.createCommunity);


module.exports = router;
