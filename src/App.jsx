
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import MainLayout from "./layouts/MainLayout";
import OwnerDashboardLayout from "./layouts/OwnerDashboardLayout";

import OwnerOverview from "./pages/owner/OwnerOverview";
import OwnerProperties from "./pages/owner/OwnerProperties";
import OwnerBookingRequests from "./pages/owner/OwnerBookingRequests";
import AddProperty from "./pages/owner/AddProperty";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AccessDenied from "./pages/AccessDenied";
import BecomeOwner from "./pages/BecomeOwner";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOwnerApplications from "./pages/admin/AdminOwnerApplications";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainLayout>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/access-denied" element={<AccessDenied />} />

            <Route
              element={
                <ProtectedRoute allowedRoles={["Tenant", "Owner"]} />
              }
            >
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-bookings" element={<MyBookings />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["Tenant"]} />}>
              <Route
                path="/tenant/become-owner"
                element={<BecomeOwner />}
              />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["Owner"]} />}>
              <Route path="/owner" element={<OwnerDashboardLayout />}>
                <Route path="dashboard" element={<OwnerOverview />} />
                <Route path="properties" element={<OwnerProperties />} />
                <Route
                  path="booking-requests"
                  element={<OwnerBookingRequests />}
                />
                <Route path="add-property" element={<AddProperty />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
              <Route path="/admin" element={<AdminDashboardLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route
                  path="owner-applications"
                  element={<AdminOwnerApplications />}
                />
              </Route>
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
