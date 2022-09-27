const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", ensureAuth, profileController.getProfile);
router.patch("/updatePublicProfile/:id", ensureAuth, profileController.updatePublicProfile);
router.patch("/updatePrivateProfile/:id", ensureAuth, profileController.updatePrivateProfile);


module.exports = router;
