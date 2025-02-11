import { useContext } from "react";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

const HamburgerMenu = ({ onClose }) => {
  const { user, logout, isGuest } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    onClose();
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 bg-blue-600 text-white z-50 flex flex-col p-8 space-y-6 animate-slide-in">
      <button onClick={onClose} className="self-end text-white text-3xl">
        <X size={36} />
      </button>
      
      <ul className="space-y-4 text-xl">
        <li><Link to="/" onClick={onClose}>Home</Link></li>
        <li><Link to="/services" onClick={onClose}>Services</Link></li>
        <li><Link to="/gallery" onClick={onClose}>Gallery</Link></li>
        <li><Link to="/customers" onClick={onClose}>Customers</Link></li>

        {!user && !isGuest && (
          <li><Link to="/getstarted" onClick={onClose}>Get Started</Link></li>
        )}

        {(user || isGuest) && (
          <>
            <li><Link to="/dashboard" onClick={onClose}>Dashboard</Link></li>
            <li><button onClick={handleLogout} className="text-red-400">Logout</button></li>
          </>
        )}
      </ul>
    </div>
  );
};
HamburgerMenu.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default HamburgerMenu;
