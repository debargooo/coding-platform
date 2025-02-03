import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Problems from "./pages/Problems/Problems";
import SingleProblem from "./pages/Problems/SingleProblem";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
function App() {
  return (
   
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={<Problems/>} />
        <Route path="/problems/:titleSlug" element={<SingleProblem />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        {/* Add other routes here */}
      </Routes>
    </Router>

  );
}

export default App;
