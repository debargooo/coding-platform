import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Problems from "./pages/Problems/Problems";
import SingleProblem from "./pages/Problems/SingleProblem";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import RoomManagement from "./pages/Room/RoomMangement";
import Room from "./pages/Room/Room";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protected Routes */}
          <Route path="/problems" element={<ProtectedRoute><Problems /></ProtectedRoute>} />
          <Route path="/problems/:titleSlug" element={<ProtectedRoute><SingleProblem /></ProtectedRoute>} />
          <Route path="/challenges" element={<ProtectedRoute><RoomManagement /></ProtectedRoute>} />
          <Route path="/challenges/:roomCode" element={<ProtectedRoute><Room /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
