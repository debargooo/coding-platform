import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Editor } from '@monaco-editor/react'; // Import Monaco Editor
import { GridLoader } from 'react-spinners';
import LanguageSelector from '../../Components/LanguageSelector/LanguageSelector';
import { CODE_SNIPPETS } from '../../Components/constants';
import { executeCode } from '../../redux/slices/api';

const SingleProblem = () => {
  const { titleSlug } = useParams(); // Get titleSlug from URL
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(''); // State to manage code editor content
  const [output, setOutput] = useState(''); // State to manage code execution output
  const [testResults, setTestResults] = useState(''); // State for test case results
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/problems/${titleSlug}`);
        setProblem(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch problem');
        setLoading(false);
      }
    };
    
    fetchProblem();
  }, [titleSlug]);

  const onSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setCode(CODE_SNIPPETS[selectedLanguage] || ""); // Set code based on language selection
  };

  const runCode = async () => {
    if (!problem || !problem.exampleTestcases) {
      setOutput("No test cases available");
      return;
    }
  
    const codeToExecute = code.trim() === '' ? CODE_SNIPPETS[language] : code;
    console.log("Current Code:", codeToExecute);
  
    try {
      const response = await executeCode(language, codeToExecute);
      console.log("API Response Data:", response);
  
      // 🛠 Fix: Ensure response.run.output exists before calling `trim()`
      const actualOutput = response.run.output ;
      console.log(actualOutput)
      setOutput(actualOutput);
  
      // ✅ Compare output with test cases
      validateTestCases(actualOutput, problem.exampleTestcases);
    } catch (err) {
      setOutput(`Error executing code: ${err.message}`);
    }
  };
  const validateTestCases = (actualOutput, expectedTestCases) => {
    // If expectedTestCases is a string, split by new lines
    if (typeof expectedTestCases === "string") {
      expectedTestCases = expectedTestCases.split("\n");
    }
  
    let accumulatedResults = ''; // Variable to store all test case results
  
    // Loop through each test case
    expectedTestCases.forEach((testCase, index) => {
      const isCorrect = actualOutput.trim() === testCase.trim();  // Compare the actual output with the expected output
      const resultText = `Test Case ${index + 1}: Expected: "${testCase}", Got: "${actualOutput.trim()}"\nResult: ${isCorrect ? 'Passed' : 'Failed'}\n\n`;
      
      // Accumulate results
      accumulatedResults += resultText;
    });
  
    // After the loop, set all accumulated results in the state at once
    setTestResults(accumulatedResults);
  };
  
  
  

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <GridLoader color='rgb(75 219 190)' />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // Helper to set difficulty color
  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="p-6 max-w-full mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">{problem.questionTitle}</h1>
      <p className="text-center mb-4">
        <span className="text-lg">Difficulty:</span>
        <span className={`ml-2 font-semibold ${getDifficultyColor(problem.difficulty)}`}>
          {problem.difficulty}
        </span>
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Problem Statement */}
        <div className="flex-1">
          <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Problem Statement</h2>
            <div className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: problem.question }}></div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Tags:</h3>
            <div className="flex flex-wrap space-x-2">
              {problem.topicTags.map((tag) => (
                <span key={tag.slug} className="bg-blue-100 text-blue-500 px-2 py-1 rounded-lg">{tag.name}</span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Hints:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {problem.hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1">
          <div className="mb-6">
            <LanguageSelector language={language} onSelect={onSelect} />
            <h3 className="text-lg font-semibold">Your Code:</h3>
            <Editor
              height="500px"
              language={language}
              defaultValue={CODE_SNIPPETS[language]}
              theme='vs-dark'
              value={code}
              onChange={(value) => setCode(value)}
              options={{ fontSize: 14 }}
            />
            <button 
              onClick={runCode}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Run Code
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold">Example Testcases:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-gray-800">{problem.exampleTestcases}</pre>
          </div>
       
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Output:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-gray-800">{output}</pre>
          </div>

          {/*<div className="mb-6">
            <h3 className="text-lg font-semibold">Test Cases Result:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-gray-800">{testResults}</pre>
          </div>*/}
        </div>
      </div>

      <a href={problem.link} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
        View problem on LeetCode
      </a>
    </div>
  );
};

export default SingleProblem;
