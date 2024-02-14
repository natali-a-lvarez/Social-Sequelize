const { db, DataTypes, Model } = require("../db/connection");
let Post;

Post = db.define("Post", {
  title: DataTypes.STRING,
  body: DataTypes.STRING,
  createdAt: DataTypes.STRING,
});

module.exports = Post;
