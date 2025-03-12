import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { Editor } from "@monaco-editor/react";
import { GridLoader } from "react-spinners";
import LanguageSelector from "../../Components/LanguageSelector/LanguageSelector";
import { CODE_SNIPPETS } from "../../Components/constants";
import { executeCode } from "../../redux/slices/api";

const socket = io("http://localhost:8080");

const Room = () => {
  const { roomCode } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [problem, setProblem] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState("");
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:8080/problems/");
        if (Array.isArray(response.data) && response.data.length >= 5) {
          const shuffled = response.data.sort(() => 0.5 - Math.random()).slice(0, 5);
          setQuestions(shuffled);
          fetchProblemDetails(shuffled[0].titleSlug);
        } else {
          setError("Not enough questions available.");
        }
      } catch (err) {
        setError(err.message || "Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    socket.emit("getRoomData", roomCode);
    socket.on("roomUpdate", ({ users }) => {
      console.log("Updated users:", users);
      setUsers([...users]);  
    });

    fetchQuestions();

    return () => {
      socket.off("roomUpdate");
    };
  }, [roomCode]);

  const fetchProblemDetails = async (titleSlug) => {
    try {
      const response = await axios.get(`http://localhost:8080/problems/${titleSlug}`);
      setProblem(response.data);
    } catch (err) {
      setError("Failed to fetch problem details");
    }
  };

  const nextQuestion = () => {
    const nextIndex = (currentQuestionIndex + 1) % questions.length;
    setCurrentQuestionIndex(nextIndex);
    fetchProblemDetails(questions[nextIndex].titleSlug);
  };

  const prevQuestion = () => {
    const prevIndex = (currentQuestionIndex - 1) % questions.length;
    setCurrentQuestionIndex(prevIndex);
    fetchProblemDetails(questions[prevIndex].titleSlug);
  };


  const runCode = async () => {
    if (!problem || !problem.exampleTestcases) {
      setOutput("No test cases available");
      return;
    }

    try {
      const response = await executeCode(language, code.trim() || CODE_SNIPPETS[language]);
      setOutput(response.run.output);
    } catch (err) {
      setOutput(`Error executing code: ${err.message}`);
    }
  };

  if (loading) return <GridLoader color="rgb(75 219 190)" className="flex justify-center items-center min-h-screen" />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-full mx-auto">
      <h1 className="text-3xl font-bold text-center mb-4">Room Code: {roomCode}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-4">Problem Statement</h2>
          {problem && (
            <div>
              <h3 className="text-lg font-bold">{problem.questionTitle}</h3>
              <p dangerouslySetInnerHTML={{ __html: problem.question }}></p>
              <div className="flex space-x-4 mb-6">
              <button onClick={prevQuestion} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Prev Question
              </button>
              <button onClick={nextQuestion} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Next Question
              </button>
              </div>
             
            </div>
          )}
          <h3 className="text-lg font-semibold mt-6">Participants</h3>
          <ul className="bg-gray-700 p-4 rounded-lg">
            {users.map((user) => (
              <li key={user.id} className="flex justify-between py-2">
                <span>{user.username}</span>
                <span className="text-green-400">Solved: {user.solved || 0}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <LanguageSelector language={language} onSelect={setLanguage} />
          <Editor height="500px" language={language} theme='vs-dark' value={code} onChange={setCode} options={{ fontSize: 14 }} />
          <button onClick={runCode} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Run Code
          </button>
          <h3 className="text-lg font-semibold mt-4">Output:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg text-gray-800">{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default Room;