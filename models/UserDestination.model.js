const { Schema, model } = require("mongoose");

const userDestinationSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    cityId: { type: Schema.Types.ObjectId, ref: 'City' },
    destinationId: { type: Schema.Types.ObjectId, ref: 'Destination' },
    completed: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

const userDestination = model("UserDestination", userDestinationSchema);

module.exports = userDestination;
