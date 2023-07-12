const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userName: String,
    userAvatar: String,
  },
  {
    timestamps: true,
  }
);

const catchSchema = new mongoose.Schema({
  species: { type: String, required: true },
  weightlb: { type: Number, min: 0, max: 50 },
  weightoz: { type: Number, min: 0, max: 15 },
  location: { type: String, required: true },
  lure: { type: String, required: true },
  date: {
    type: Date,
    default: function () {
      return new Date().getFullYear();
    },
  },

  comments: [commentSchema],
});

module.exports = mongoose.model("Catch", catchSchema);
