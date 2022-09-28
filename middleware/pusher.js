const Pusher = require("pusher")

require("dotenv").config({ path: "./config/.env" });

const pusher = new Pusher({
    appId: process.env.appId,
    key: process.env.key,
    secret: process.env.secret,
    cluster: "ap3",
    useTLS: true
  });

  
module.exports = pusher;