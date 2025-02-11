import { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("All");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/events")
      .then(response => setEvents(response.data))
      .catch(error => console.error("Error fetching events:", error));
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by category
    if (category !== "All") {
      filtered = filtered.filter(event => event.category === category);
    }

    setFilteredEvents(filtered);
  }, [events, category]);

  return (
    <div>
      <h1>Events</h1>

      {/* Category Filter */}
      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="All">All</option>
        <option value="Conference">Conference</option>
        <option value="Workshop">Workshop</option>
        <option value="Music">Music</option>
      </select>

      {/* Upcoming Events */}
      <h2>Upcoming Events</h2>
      <ul>
        {filteredEvents.filter(event => new Date(event.date) >= new Date()).map(event => (
          <li key={event._id}>{event.name} - {event.date.substring(0, 10)}</li>
        ))}
      </ul>

      {/* Past Events */}
      <h2>Past Events</h2>
      <ul>
        {filteredEvents.filter(event => new Date(event.date) < new Date()).map(event => (
          <li key={event._id}>{event.name} - {event.date.substring(0, 10)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
