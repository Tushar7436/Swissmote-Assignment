const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Event name is required
  description: { type: String },          // Optional description
  date: { type: Date, required: true },   // Event date is required
  status: { type: String, enum: ["Running", "Upcoming", "Past"], default: "Upcoming" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Required user ID
});

module.exports = mongoose.model("Event", EventSchema);
