const Community = require("../models/Community");
const User = require("../models/User");
const Seed = require("../models/Seed");
const { formatDate } = require("../helpers/ejs");

module.exports = {
  getCommunities: async (req, res) => {
    try {
      const communities = await Community.find().sort().lean();
      const user = await User.findById(req.user.id);
      res.render("communities/communities.ejs", {
        communities: communities,
        user: user
      });
    } catch (err) {
      console.log(err);
    }
  },
  createCommunity: async (req, res) => {
    try {
      await Community.create({
        communityName: req.body.communityName,
        pageName: req.body.communityName.toLowerCase(),
        description: req.body.communityDescription,
        category: req.body.focus,
        numMembers: 1,
        user: req.user.id,
        createdBy: req.body.createdBy
      });
      const newCommunity = await Community.findOne({}, {}, { sort: { 'createdAt' : -1 } })
      console.log(req.body.focus)
      console.log("Community has been created!");
      res.redirect(`/communities/${newCommunity._id}`);
    } catch (err) {
      console.log(err);
    }
  },
  getCommunity: async (req, res) => {
    try {
      const communities = await Community.findById(req.params.id);
      const seeds = await Seed.find({communityId: req.params.id}).sort({'likes': -1}).lean();
      res.render("communities/community.ejs", { 
        communities: communities,
        seeds: seeds,
        user: req.user,
        formatDate: formatDate,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getSeeds: async (req, res) => {
    try {
      const communities = await Community.findById(req.params.id);
      const seeds = await Seed.find({communityId: req.params.id}).sort({'likes': -1}).lean();
      const seedsChart = await Seed.find({communityId: req.params.id}).sort({'likes': -1}).limit(5).lean();
      res.json({
        communities: communities,
        seeds: seeds,
        seedsChart: seedsChart
      });
    } catch (err) {
      console.log(err);
    }
  },
};
