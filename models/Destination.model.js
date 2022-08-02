const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const destinationSchema = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    name: {
      type: String,
      unique: true
    },
    description: String,
    city: {type: Schema.Types.ObjectId, ref: 'City'},
    address: String,
    destinationType: ['naturalWorld','history', 'nightlife', 'architecture', 'fun', 'other']

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Destination = model("Destination", destinationSchema);

module.exports = Destination;
