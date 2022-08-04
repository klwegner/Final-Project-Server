const { Schema, model } = require("mongoose");
const Destination = require("./Destination.model");

const citySchema = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    name: {
      type: String,
      unique: true
    },
    usState:{
      type: String,
    },
    country: {
      type: String,
      require: true
    },
    description: String,
    // visited: {
    //   type: Boolean },
    Destination: [{type: Schema.Types.ObjectId, ref: 'Destination'}]
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const City = model("City", citySchema);

module.exports = City;
