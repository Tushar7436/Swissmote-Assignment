import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Customers from "./pages/Customers";
import GetStarted from "./pages/GetStarted";
import Navbar from "./components/Navbar";
import Events from "./pages/Events"; 
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/getstarted" element={<GetStarted />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/events" element={<Events />} />
      <Route path="*" element={<NotFound />} />
    

      {/* Protect Dashboard Route */}
      <Route
        path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}


export default App;


