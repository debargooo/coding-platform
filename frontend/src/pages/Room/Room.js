import { useState } from "react";

const Room = () => {
  const [roomCode] = useState("ABCD1234"); // Hardcoded Room Code
  const [question, setQuestion] = useState(null);
  const [users] = useState([
    { id: 1, name: "Alice", solved: 2 },
    { id: 2, name: "Bob", solved: 3 },
    { id: 3, name: "Charlie", solved: 1 },
  ]);

  const questions = [
    "Reverse a Linked List",
    "Find the Missing Number in an Array",
    "Implement a LRU Cache",
    "Check if a String is a Palindrome",
  ];

  const handleGenerateQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setQuestion(questions[randomIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Room Code: {roomCode}</h1>
        
        {/* Question Section */}
        <div className="bg-gray-700 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">Coding Question</h2>
          {question ? (
            <p className="text-gray-300">{question}</p>
          ) : (
            <p className="text-gray-400">No question generated yet.</p>
          )}
        </div>

        {/* User List */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Participants</h2>
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user.id}
                className="flex justify-between bg-gray-700 px-4 py-2 rounded-lg"
              >
                <span>{user.name}</span>
                <span className="text-green-400">Solved: {user.solved}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Generate Question Button */}
        <button
          onClick={handleGenerateQuestion}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          Generate Random Question
        </button>
      </div>
    </div>
  );
};

export default Room;
