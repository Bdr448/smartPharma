import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/common/Login";
import Register from "./pages/common/Register";
import ForgotPassword from "./pages/common/ForgotPassword";
import PharmacyDashboard from "./pages/pharmacy/PharmacyDashboard";
import MedicineSearch from "./pages/customer/MedicineSearch";
import Availability from "./pages/customer/Availability";
import Profile from "./pages/common/Profile";
import NotFound from "./pages/common/NotFound";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={["pharmacy"]}>
              <PharmacyDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/medicine-upload"
          element={
            <PrivateRoute roles={["pharmacy"]}>
              <PharmacyDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-complaint"
          element={
            <PrivateRoute roles={["customer"]}>
              <MedicineSearch />
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute roles={["customer"]}>
              <Availability />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute roles={["customer", "pharmacy"]}>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
