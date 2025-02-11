import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const { guestLogin, user, isGuest } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Redirect if user is logged in or guest is active
  useEffect(() => {
    if (user || isGuest) {
      navigate("/dashboard");
    }
  }, [user, isGuest, navigate]);

  const handleGuestLogin = () => {
    guestLogin();
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Get Started</h1>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
          >
            Login
          </button>
          <button
            onClick={handleGuestLogin}
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
