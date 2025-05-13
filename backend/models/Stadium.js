const mongoose = require('mongoose');
const stadiumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: {
        longitude : {
            type : String
        },
        latitude : {
            type : String
        }
    },
  },
  {
    timestamps: true,
  }
);

const Stadium = mongoose.model("Stadium",stadiumSchema )

module.exports = Stadium;