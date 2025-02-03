import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEasyQuestion } from '../../redux/slices/codingSlice';
import { Link } from 'react-router-dom';
import {GridLoader } from 'react-spinners'
const EasyQuestions = () => {
  const dispatch = useDispatch();
  const { easyQuestions, status, error } = useSelector((state) => state.easyQs);


  useEffect(() => {
    dispatch(fetchEasyQuestion());
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className='flex justify-center items-center min-h-screen bg-[rgba(25,25,25,1)]'>
        <GridLoader color='rgb(75 219 190)' />
      </div>
    );
  }
  if (status === 'failed') return <p className="text-center text-red-500">Error: {error}</p>;
  if (easyQuestions.length > 0) {
    easyQuestions.forEach(question => {
     const titleSlug = question.titleSlug;
     return titleSlug;
    });
  }

  // Function to set color based on difficulty
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-500'; // Green for easy
      case 'medium':
        return 'text-yellow-500'; // Yellow for medium
      case 'hard':
        return 'text-red-500'; // Red for hard
      default:
        return 'text-gray-500'; // Default color for unknown difficulties
    }
  };

  return (
    <div className='w-full bg-[rgba(25,25,25,1)]'>
 <div className="p-6 max-w-[65vw] mx-auto ]">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">All Problems</h1>
      <div className="flex flex-col gap-5 bg-[rgba(25,25,25,1)]">
        {easyQuestions.map((question, index) => (
           <Link 
           to={`/problems/${question.titleSlug}`} // Use template literal correctly
           className="text-lg font-semibold text-white mb-2 md:mb-0"
         >
          <div className="p-4 shadow-lg rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between bg-[#292929]" key={index}>
            {/* Title Container with Fixed Width */}
            <div className="w-full md:w-[32rem]">
            
                {question.title}
            
            </div>

            {/* Difficulty and Topic Container */}
            <div className="flex flex-col md:flex-row md:items-center  md:w-2/3 space-y-2 md:space-y-0 md:space-x-8 justify-between">
              <p className="text-white">
                Difficulty: <span className={`font-semibold ${getDifficultyColor(question.difficulty)}`}>{question.difficulty}</span>
              </p>
              <p className="text-white">
                Topic: <span className="font-semibold">{question.topicTags.map(tag => tag.name).join(', ')}</span>
              </p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
    </div>
   
  );
};

export default EasyQuestions;
