const pusher = require("../middleware/pusher")
const Seed = require("../models/Seed");
const Community = require("../models/Community")


module.exports = {
  deleteSeed: async (req, res) => {
    try {
      let seed = await Seed.findById({ _id: req.params.id })
      await Seed.remove({ _id: req.params.id });
      console.log("Deleted seed!");
      res.redirect(`back`);
    } catch (err) {
      console.log('Something went wrong...')
    }
  },
  createSeed: async (req, res) => {
    try {
      await Seed.create({
        title: req.body.title,
        communityName: req.body.communityName,
        communityId: req.body.communityId,
        about: req.body.about,
        likes: 0,
        createdBy: req.user.userName,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("back");
    } catch (err) {
      console.log(err);
    }
  },
  likeSeed: async (req, res) => {
    try {
      const seed = await Seed.findById(req.params.id)
      await Seed.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      const newSeedsChart = await Seed.find({communityId: seed.communityId}).sort({'likes': -1}).limit(5).lean()
      pusher.trigger('vote', 'likeSeed', {
        points: 1,
        newSeedsChart: newSeedsChart
      })
      console.log(newSeedsChart)
      console.log("Vote logged!");
      // res.redirect(`back`)
      res.status(200).send({ seed: seed })
    } catch (err) {
      console.log(err);
    }
  },
};
