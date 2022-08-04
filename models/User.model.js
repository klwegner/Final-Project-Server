const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    //how to make below populate only cities with visited === true
    visitedCities: [{type: Schema.Types.ObjectId, ref: 'City'}], 
    //how to make below populate only cities with visited === false
    unvisitedCities:[{type: Schema.Types.ObjectId, ref: 'City'}],
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
