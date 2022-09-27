const mongoose = require("mongoose");

const SeedSchema = new mongoose.Schema({
  communityName: {
    type: String,
    required: true,
  },
  communityId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true
  },
  numMembers: {
    type: Number,
    required: false,
  },
  createdBy: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Seed", SeedSchema);
