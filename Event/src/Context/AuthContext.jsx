import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isGuest, setIsGuest] = useState(localStorage.getItem("guest") === "true");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      axios
        .get("http://localhost:5000/api/auth/user")
        .then(response => setUser(response.data))
        .catch(() => {
          setUser(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    localStorage.setItem("token", response.data.token);
    setToken(response.data.token);
    setUser(response.data.user);  
  };

  const signup = async (name, email, password) => {
    const response = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
    localStorage.setItem("token", response.data.token);
    setToken(response.data.token);
    setUser(response.data.user);  
  };

  // ✅ Fix Guest Login
  const guestLogin = () => {
    localStorage.setItem("guest", "true");
    setIsGuest(true); // ✅ Triggers Navbar re-render
    setUser({ name: "Guest" });  // ✅ Ensures Navbar updates immediately
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("guest");
    setUser(null);
    setToken(null);
    setIsGuest(false); // ✅ Ensures Navbar resets properly
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, guestLogin, logout, isGuest }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext };
