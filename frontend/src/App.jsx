import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PgListingPage from './pages/PgListingPage';
import RoomDetailsPage from './pages/RoomDetailsPage';
import AvailabilityUpdatesPage from './pages/AvailabilityUpdatesPage';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminListings from './pages/admin/AdminListings';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminReports from './pages/admin/AdminReports';
import AdminRoommateMonitoring from './pages/admin/AdminRoommateMonitoring';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-student" element={<RegisterPage />} />
        <Route path="/register-owner" element={<RegisterPage />} />
        
        {/* Main App Routes */}
        <Route path="/app" element={<Layout />}>
          <Route index element={<PgListingPage />} />
          <Route path="rooms" element={<RoomDetailsPage />} />
          <Route path="availability" element={<AvailabilityUpdatesPage />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="listings" element={<AdminListings />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="roommate-monitoring" element={<AdminRoommateMonitoring />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
