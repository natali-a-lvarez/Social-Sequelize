const { db, DataTypes, Model } = require("../db/connection");
let Profile;

Profile = db.define("Profile", {
  bio: DataTypes.STRING,
  profilePicture: DataTypes.STRING,
  birthday: DataTypes.STRING,
});

module.exports = Profile;
