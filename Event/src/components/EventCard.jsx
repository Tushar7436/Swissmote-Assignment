import PropTypes from "prop-types"

const EventCard = ({ event, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {event.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={event.image || "/placeholder.svg"}
            alt={event.name || "Event image"}
            className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-4 space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">{event.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
        <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
        <div className="flex justify-between items-center pt-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              event.status === "Upcoming"
                ? "bg-blue-100 text-blue-800"
                : event.status === "Live"
                ? "bg-green-100 text-green-800"
                : event.status === "Past"
                ? "bg-gray-100 text-gray-800"
                : "bg-indigo-100 text-indigo-800"
            }`}
          >
            {event.status}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(event)}
              className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(event._id)}
              className="text-red-600 hover:text-red-800 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default EventCard
