const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      res.render("profile.ejs", { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  updatePublicProfile: async (req, res) => {
    try {
        // const result = await cloudinary.uploader.upload(req.file.path)

        await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    // cloudinaryId: result.public_id,
                    // "profile.avatar": result.secure_url,
                    "profile.userName": req.body.username,
                    "profile.about": req.body.about,
                    "profile.website": req.body.website,
                }   
            },
            {
                upsert: true,
                new: true,
            },
        );
        console.log(req.body)
        console.log("Profile updated...");
        res.redirect(`back`);
        } catch (err) {
            console.log(err);
        }
  },
  updatePrivateProfile: async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    "profile.firstName": req.body.firstName,
                    "profile.lastName": req.body.lastName,
                    "profile.address.street": req.body.street,
                    "profile.address.city": req.body.city,
                    "profile.address.state": req.body.state,
                    "profile.address.country": req.body.country,
                    "profile.address.zip": req.body.zip,
                }   
            },
            {
                upsert: true,
                new: true,
            },
        );
        console.log("Profile updated...");
        res.redirect(`back`);
        } catch (err) {
            console.log(err);
        }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  }
};
