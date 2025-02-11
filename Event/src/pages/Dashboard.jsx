import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import EventCard from "../components/EventCard"
import EventForm from "../components/EventForm"

const Dashboard = () => {
  const [events, setEvents] = useState([])
  const [activeTab, setActiveTab] = useState("All")
  const [isEditing, setIsEditing] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    status: "Upcoming",
  })

  const navigate = useNavigate()
  const isGuest = localStorage.getItem("guest") === "true"; // ✅ Check if user is a guest

  useEffect(() => {
    const fetchEvents = async () => {
  const token = localStorage.getItem("token");
  const isGuest = localStorage.getItem("guest") === "true";

  try {
    const response = await axios.get(
      `http://localhost:5000/api/events?guest=${isGuest}`,
      {
        headers: token ? { "x-auth-token": token } : {},
      }
    );
    setEvents(response.data);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

  fetchEvents();
}, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }

  const filteredEvents = events.filter((event) => {
    const now = new Date()
    if (activeTab === "Running") return new Date(event.date) <= now && event.status === "Running"
    if (activeTab === "Upcoming") return new Date(event.date) > now && event.status === "Upcoming"
    if (activeTab === "Past") return new Date(event.date) < now && event.status === "Past"
    if (activeTab === "Live") return new Date(event.date) <= now && event.status === "Live"
    return true // All events
  })

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
      console.error("No token found. User not logged in.")
      return
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        {
          name: formData.name,
          description: formData.description,
          date: formData.date,
          status: formData.status,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        },
      )

      setEvents((prev) => [...prev, response.data])
      setShowForm(false)
      setFormData({ name: "", description: "", date: "", status: "Upcoming" })
    } catch (error) {
      console.error("Error creating/updating event:", error)
    }
  }

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token")
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { "x-auth-token": token },
      })
      setEvents((prev) => prev.filter((event) => event._id !== id))
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }

  const handleEdit = (event) => {
    setEditingEvent(event)
    setFormData(event)
    setIsEditing(true)
    setShowForm(true)
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 p-4 transition-transform duration-300 ease-in-out transform 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:inset-0`}
      >
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-2 text-indigo-600 font-medium">
            <span className="p-2 bg-indigo-100 rounded">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8 2v3M16 2v3M3.5 9.09h17M21 8.5V17c0 3-1.5 5-5 5H8c-3.5 0-5-2-5-5V8.5c0-3 1.5-5 5-5h8c3.5 0 5 2 5 5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Events</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
            <span className="p-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM20.59 22c0-3.87-3.85-7-8.59-7s-8.59 3.13-8.59 7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Attendee Profiles</span>
          </a>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-700 w-full">
            <span className="p-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M8.9 7.56c.31-3.6 2.16-5.07 6.21-5.07h.13c4.47 0 6.26 1.79 6.26 6.26v6.52c0 4.47-1.79 6.26-6.26 6.26h-.13c-4.02 0-5.87-1.45-6.2-4.99"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15 12H3.62M5.85 8.65 2.5 12l3.35 3.35"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between">
          {/* Hamburger menu */}
          <button className="p-2 md:hidden" onClick={toggleSidebar}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold text-gray-800 md:ml-0">Dashboard</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center text-sm md:text-base"
          >
            <span className="mr-2">+</span> Create Event
          </button>
        </header>

        {/* Tabs */}
        <div className="px-4 md:px-8 border-b border-gray-200 overflow-x-auto">
          <nav className="flex space-x-8 min-w-max">
            {["All", "Live", "Upcoming", "Past", "Your Events"].map((tab) => (
              <button
                key={tab}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event._id} 
                  event={event} 
                  onEdit={!isGuest ? handleEdit : null}  // ✅ Prevent guest from editing
                  onDelete={!isGuest ? handleDelete : null} // ✅ Prevent guest from deleting
                  isGuest={isGuest} // ✅ Pass guest status to EventCard component
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 md:py-12">
              <lottie-player
                src="https://lottie.host/932ceb64-7772-4985-a87e-485c73ee4b83/Vgu9CW11Gr.json"
                background="transparent"
                speed="1"
                style={{
                  width: "300px",
                  height: "300px",
                }}
                loop
                autoplay
              ></lottie-player>
              
              <h3 className="mt-4 text-lg font-medium">
                {isGuest ? "No Events Available" : "Create Your First Event"}
              </h3>

              <p className="mt-2 text-gray-600 text-sm md:text-base px-4">
                {isGuest 
                  ? "As a guest, you can explore events but cannot create or manage them."
                  : "You haven't created any events yet, but you're in the right place to start!"
                }
              </p>

              {/* ✅ Hide Create Event button for Guests */}
              {!isGuest && (
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm md:text-base"
                >
                  Create Event
                </button>
              )}
            </div>
          )}
        </div>

        
        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <EventForm
              formData={formData}
              setFormData={setFormData}
              handleFormSubmit={handleFormSubmit}
              isEditing={isEditing}
              onCancel={() => {
                setShowForm(false)
                setIsEditing(false)
                setFormData({ name: "", description: "", date: "", status: "Upcoming" })
              }}
            />
          </div>
        )}
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={toggleSidebar}></div>
      )}
    </div>
  )
}

export default Dashboard

