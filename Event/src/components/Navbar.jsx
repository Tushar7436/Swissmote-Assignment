import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu"; // New Component

const Navbar = () => {
  const { user, logout, isGuest } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Event Management</h1>
        
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu size={28} />
        </button>

        <ul className="hidden md:flex space-x-6">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/customers">Customers</Link></li>

          {!user && !isGuest && <li><Link to="/getstarted">Get Started</Link></li>}

          {(user || isGuest) && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          )}
        </ul>
      </div>

      {isMenuOpen && <HamburgerMenu onClose={() => setIsMenuOpen(false)} />}
    </nav>
  );
};

export default Navbar;
