import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import LostItems from "./pages/LostItems";
import FoundItems from "./pages/FoundItems";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import Matches from "./pages/Matches";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import "./index.css";

// Wrapper to hide navbar on login/signup pages
function LayoutWithNavbar({ children }) {
const { user } = useAuth();
return (
<>
{user && <Navbar />}
{children}
</>
);
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <LayoutWithNavbar>
          <div className="App">
            <Routes>

              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/lost"
                element={
                  <ProtectedRoute>
                    <LostItems />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/found"
                element={
                  <ProtectedRoute>
                    <FoundItems />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/report-lost"
                element={
                  <ProtectedRoute>
                    <ReportLost />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/report-found"
                element={
                  <ProtectedRoute>
                    <ReportFound />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/matches"
                element={
                  <ProtectedRoute>
                    <Matches />
                  </ProtectedRoute>
                }
              />

            </Routes>
          </div>
        </LayoutWithNavbar>
      </Router>
    </AuthProvider>
  );
}

export default App;
