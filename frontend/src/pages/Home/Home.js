import React from 'react';
import { FaCode, FaVideo, FaChartLine, FaUsers } from 'react-icons/fa';
import bgImg from '../../assests/bgImg.jpg'
import { Link,  useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

// Sample data for popular courses
const popularCourses = [
  {
    id: 1,
    title: 'React for Beginners',
    description: 'Learn the fundamentals of React.js and build dynamic web applications.',
    image: 'https://via.placeholder.com/400x200', // Replace with actual image URLs
  },
  {
    id: 2,
    title: 'Advanced Algorithms',
    description: 'Master complex algorithms and improve your problem-solving skills.',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    id: 3,
    title: 'Full-Stack Development',
    description: 'Become a full-stack developer with hands-on projects and tutorials.',
    image: 'https://via.placeholder.com/400x200',
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleStartCoding = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/status", {
        withCredentials: true,
      });
      if (response.data.authenticated) {
        navigate("/problems");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Auth check failed:", error.message);
      navigate("/login");
    }
  };


  return (
    <div className="font-sans antialiased text-gray-900">
      <section className="bg-[rgba(25,25,25,1)] text-white flex flex-col justify-center items-center md:h-[50vh] text-center">
      <div className="container mx-auto p-6 xl:px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Master Coding & Technology with CodeMaster
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Solve challenges, learn from video lectures, and become a coding expert.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/problems"
            className="bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow hover:bg-gray-100 transition"
            onClick={handleStartCoding} 
          >
            Start Coding
          </Link>
          <a
            href="#"
            className="bg-transparent border border-white text-white font-semibold py-3 px-6 rounded hover:bg-white hover:text-blue-600 transition"
          >
            Explore Courses
          </a>
        </div>
      </div>
    </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
          <div className="flex flex-wrap -mx-4">
            {/* Feature 1 */}
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <FaCode className="text-blue-500 text-4xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Coding Challenges</h3>
                <p>
                  Tackle a wide range of problems covering algorithms, data structures, and more.
                </p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <FaVideo className="text-purple-500 text-4xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Video Courses</h3>
                <p>
                  Learn from expert instructors through comprehensive video lectures on various technologies.
                </p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <FaChartLine className="text-green-500 text-4xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                <p>
                  Monitor your learning journey with progress bars, badges, and leaderboards.
                </p>
              </div>
            </div>
            {/* Feature 4 */}
            <div className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <FaUsers className="text-yellow-500 text-4xl mb-4" />
                <h3 className="text-xl font-semibold mb-2">Community Support</h3>
                <p>
                  Join forums and discussion groups to collaborate and seek help from fellow coders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Courses</h2>
          <div className="flex flex-wrap -mx-4">
            {popularCourses.map((course) => (
              <div key={course.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold mb-2">{course.title}</h3>
                    <p className="text-gray-700 mb-4">{course.description}</p>
                    <a
                      href="#"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a
              href="#"
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow hover:bg-blue-700 transition"
            >
              View All Courses
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="flex flex-wrap -mx-4">
            {/* Engaging Content */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Engaging Content</h3>
              <p>
                Our platform offers expert instructors, real-world projects, and personalized learning paths to ensure an engaging and effective learning experience.
              </p>
            </div>
            {/* Interactive Learning */}
            <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Interactive Learning</h3>
              <p>
                Hands-on coding exercises integrated with video lectures provide a seamless and interactive learning environment.
              </p>
            </div>
            {/* Success Stories */}
            <div className="w-full lg:w-1/3 px-4 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Success Stories</h3>
              <p>
                Hear from our users who have successfully advanced their careers and mastered new technologies through our platform.
              </p>
            </div>
          </div>
          {/* Testimonials */}
          <div className="mt-12">
            <h3 className="text-3xl font-semibold text-center mb-8">What Our Users Say</h3>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4">
                    "CodeMaster has transformed the way I learn to code. The challenges are well-designed and the video lectures are top-notch!"
                  </p>
                  <p className="font-semibold">- Jane Doe</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4">
                    "The progress tracking and community support kept me motivated throughout my learning journey."
                  </p>
                  <p className="font-semibold">- John Smith</p>
                </div>
              </div>
              <div className="w-full lg:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <p className="text-gray-700 mb-4">
                    "I landed my dream job thanks to the comprehensive courses and practical coding challenges provided by CodeMaster."
                  </p>
                  <p className="font-semibold">- Alice Johnson</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-[rgba(25,25,25,1)]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Join thousands of learners and coders.</h2>
          <p className="text-xl mb-8 text-white">
            Start your journey towards becoming a coding expert today.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="#"
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow hover:bg-blue-700 transition"
            >
              Sign Up Free
            </a>
            <a
              href="#"
              className="bg-transparent border border-blue-600 text-blue-600 font-semibold py-3 px-6 rounded hover:bg-blue-600 hover:text-white transition"
            >
              Start Learning
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 py-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap -mx-4">
            {/* About Us */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p>
                CodeMaster is dedicated to providing high-quality coding challenges and comprehensive video courses to help you master programming and advance your career.
              </p>
            </div>
            {/* Quick Links */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Courses
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Challenges
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* Social Media */}
            <div className="w-full md:w-1/3 px-4 mb-8">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">
                  {/* Example: Twitter Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557a9.93 9.93 0 01-2.828.775 4.932 4.932 0 002.165-2.724c-.951.555-2.005.959-3.127 1.184A4.916 4.916 0 0016.616 3c-2.737 0-4.952 2.215-4.952 4.951 0 .388.043.764.127 1.124C7.691 8.87 4.066 6.882 1.64 3.905a4.822 4.822 0 00-.666 2.486c0 1.708.87 3.213 2.188 4.096a4.904 4.904 0 01-2.245-.616v.062c0 2.385 1.693 4.374 3.946 4.827a4.935 4.935 0 01-2.239.085 4.928 4.928 0 004.6 3.417A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.058 0 14.01-7.513 14.01-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0024 4.557z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  {/* Example: Facebook Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0h-21.35C.596 0 0 .597 0 1.333v21.333C0 23.403.596 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.764v2.313h3.588l-.467 3.622h-3.121V24h6.116c.729 0 1.325-.597 1.325-1.333V1.333C24 .597 23.404 0 22.675 0z" />
                  </svg>
                </a>
                <a href="#" className="hover:text-white">
                  {/* Example: LinkedIn Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.066-1.867-3.066-1.869 0-2.155 1.459-2.155 2.964v5.7h-3v-10h2.884v1.367h.041c.402-.761 1.385-1.562 2.849-1.562 3.048 0 3.612 2.007 3.612 4.617v5.578z" />
                  </svg>
                </a>
                {/* Add more social icons as needed */}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; {new Date().getFullYear()} CodeMaster. All rights reserved.</p>
            <p className="mt-2">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>{' '}
              |{' '}
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
