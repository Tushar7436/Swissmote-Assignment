import { useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={`w-64 bg-white border-r border-gray-200 p-4 ${sidebarOpen ? "block" : "hidden"} sm:block`}>
      <nav className="space-y-4">
        <a href="#" className="flex items-center space-x-2 text-indigo-600 font-medium">
          <span className="p-2 bg-indigo-100 rounded">📅</span>
          <span>Events</span>
        </a>
        <a href="#" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <span className="p-2">👥</span>
          <span>Attendee Profiles</span>
        </a>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 mt-6"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

import PropTypes from 'prop-types';

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
};

export default Sidebar;
