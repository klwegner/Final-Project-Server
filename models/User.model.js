const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    //how to make below populate only cities with visited === true
    visitedCities: [{type: Schema.Types.ObjectId, ref: 'City', visited: true}], 
        //how to make below populate only cities with visited === false
    unvisitedCities:[{type: Schema.Types.ObjectId, ref: 'City', visited: false}],
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
