const { Schema, model } = require("mongoose");

const userCitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    cityId: { type: Schema.Types.ObjectId, ref: 'City' },
    visited: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

const UserCity = model("UserCity", userCitySchema);

module.exports = UserCity;
