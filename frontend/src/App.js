import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Problems from "./pages/Problems/Problems";
import SingleProblem from "./pages/Problems/SingleProblem";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { AuthProvider } from "./contexts/AuthContext";
import Room from "./pages/Room/Room";
function App() {
  return (
   <AuthProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems/>} />
        <Route path="/problems/:titleSlug" element={<SingleProblem />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/challenges" element={<Room/>} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
