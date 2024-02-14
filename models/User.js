const { db, DataTypes, Model } = require("../db/connection");
let User;

User = db.define("User", {
  username: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = User;
