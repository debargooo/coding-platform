import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";
import { LuEye,LuEyeClosed } from "react-icons/lu";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        name,  
        email,
        password,
      });
      
      if (response.status === 201) {
        toast.success("User registered successfully!");
        setTimeout(() => {
          navigate('/');
        }, 2000); 
      }
      
      
    } catch (error) {
      toast.error(error.response?.data.error || error.message)
      console.error("Error registering user:", error.response?.data || error.message);
    }
  };

  const handleEyeBtn = () => {
    setShowPassword((prev) => !prev); 
  };

  

  return (
    <div className="bg-[rgba(25,25,25,1)] flex items-center justify-center min-h-[calc(100vh-106px)]">
      <div className="bg-[rgba(40,40,40,1)] p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <span className="inline-block bg-gray-200 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/>
            </svg>
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">Create a new account</h2>
        <p className="text-white text-center mb-6">Enter your details to register.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-semibold mb-2 text-white">Full Name *</label>
            <input 
              type="text" 
              id="fullName" 
              className="form-input w-full px-4 py-2 border rounded-lg focus:ring-blue-500" 
      
              placeholder="James Brown" 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold mb-2 text-white">Email Address *</label>
            <input 
              type="email" 
              id="email" 
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" 
             
              placeholder="hello@alignui.com"
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold mb-2 text-white">Password *</label>
            <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              id="password" 
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" 
            
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)} 
            />
             <button
          type="button"
          onClick={handleEyeBtn}
          className="absolute top-[0.7rem] right-3 text-xl cursor-pointer text-gray-500"
        >
          {showPassword ? <LuEye /> : <LuEyeClosed />}
        </button>
            </div>
            
            <p className="text-gray-600 text-xs mt-1">Must contain 1 uppercase letter, 1 number, min. 8 characters.</p>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
          <p className="text-gray-600 text-xs text-center mt-4">
            By clicking Register, you agree to accept Apex Financial's
            <a href="#" className="text-blue-500 hover:underline"> Terms and Conditions</a>.
          </p>
         
        </form>
        
      </div>
      <ToastContainer className="absolute top-0 right-0" />
    </div>
  );
};

export default SignUp;
