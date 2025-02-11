const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Event = require("../models/Event");

const router = express.Router();

/**
 * @route   GET /api/events
 * @desc    Fetch all events for the authenticated user
 * @access  Private
 */
router.get("/", authMiddleware, async (req, res) => {
    try {
      let events;
      if (!req.user) {
        // ✅ Guest users: Return all events
        events = await Event.find();
      } else {
        // ✅ Logged-in users: Return only their events
        events = await Event.find({ user: req.user });
      }
      res.json(events);
    } catch (error) {
      console.error("Error fetching events:", error.message);
      res.status(500).json({ msg: "Server Error" });
    }
  });
  

/**
 * @route   POST /api/events
 * @desc    Create a new event
 * @access  Private
 */
router.post("/", authMiddleware, async (req, res) => {
  const { name, description, date, status } = req.body;

  // Validate request data
  if (!name || !date) {
    return res.status(400).json({ msg: "Event name and date are required." });
  }

  try {
    const event = new Event({
      name,
      description: description || "", // Default to empty string if not provided
      date,
      status: status || "Upcoming", // Default to Upcoming if status is missing
      user: req.user, // Extracted from authMiddleware
    });

    await event.save();
    res.json(event);
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   PUT /api/events/:id
 * @desc    Update an event
 * @access  Private
 */
router.put("/:id", authMiddleware, async (req, res) => {
  const { name, description, date, status } = req.body;

  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    if (event.user.toString() !== req.user) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    // Update the event
    event = await Event.findByIdAndUpdate(
      req.params.id,
      { name, description, date, status },
      { new: true }
    );

    res.json(event);
  } catch (error) {
    console.error("Error updating event:", error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   DELETE /api/events/:id
 * @desc    Delete an event
 * @access  Private
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    if (event.user.toString() !== req.user) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await event.deleteOne();
    res.json({ msg: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
