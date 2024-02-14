const { db, DataTypes, Model } = require("../db/connection");
let Comment;

Comment = db.define("Comment", {
  body: DataTypes.TEXT,
  createdAt: DataTypes.STRING,
});

module.exports = Comment;
