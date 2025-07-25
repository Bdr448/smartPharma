import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import MedicineSearch from "./pages/MedicineSearch";
import Availability from "./pages/Availability";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PharmacyDashboard />} />
        <Route path="/new-complaint" element={<MedicineSearch />} />
        <Route path="/reports" element={<Availability />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
