const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["en cours", "termine", "en pause"],
      default: "en cours"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);