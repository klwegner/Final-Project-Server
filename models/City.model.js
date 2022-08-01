const { Schema, model } = require("mongoose");
const Destination = require("./Destination.model");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const citySchema = new Schema(
  {
    name: {
      type: String,
      unique: true
    },
    location:{
      type: String,
      unique:true
    },
    description: String,
    Destination: [{type: Schema.Types.ObjectId, ref: 'Destination'}]
},
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const City = model("City", citySchema);

module.exports = City;
