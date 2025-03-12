import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const RoomManagement = () => {
  const [roomCode, setRoomCode] = useState("");
  const [users, setUsers] = useState([]);
  const [joined, setJoined] = useState(false);
  const [view, setView] = useState("create");
  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => console.log("Connected to WebSocket:", socket.id));
    socket.on("roomCreated", (code) => {
      setRoomCode(code);
      setIsAdmin(true);
    });
    socket.on("roomUpdate", ({ users }) => setUsers(users));
    console.log(users)
    socket.on("competitionStarted", (code) => {
      if (code === roomCode) navigate(`/challenges/${roomCode}`);
    });

    return () => {
      socket.off("connect");
      socket.off("roomCreated");
      socket.off("roomUpdate");
      socket.off("competitionStarted");
    };
  }, [roomCode, navigate]);

  const createRoom = () => {
    if (!username) {
      alert("Enter your name before creating a room!");
      return;
    }
    socket.emit("createRoom", username);
  };

  const joinRoom = () => {
    if (!username || !roomCode) {
      alert("Enter your name and room code!");
      return;
    }
    socket.emit("joinRoom", { username, roomCode });
    console.log("Joining room:", roomCode, "as", username);
    setJoined(true);
  };

  const startCompetition = () => {
    socket.emit("startCompetition", roomCode);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded-lg text-black mb-4"
        />

        <div className="flex justify-between mb-4">
          <button
            onClick={() => setView("create")}
            className={`px-4 py-2 rounded-lg ${view === "create" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Create Room
          </button>
          <button
            onClick={() => setView("join")}
            className={`px-4 py-2 rounded-lg ${view === "join" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Join Room
          </button>
        </div>

        {view === "create" ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Create Room</h2>
            <button onClick={createRoom} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
              Generate Room Code
            </button>
            {roomCode && (
              <div className="mt-4">
                <p className="text-lg">Room Code: <span className="font-bold">{roomCode}</span></p>
                <button
                  onClick={() => navigator.clipboard.writeText(roomCode)}
                  className="ml-2 bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-lg"
                >
                  Copy
                </button>
                <h3 className="text-lg mt-4">Joined Users:</h3>
                <ul className="bg-gray-700 p-4 rounded-lg mt-2">
                  {users.map((user) => (
                    <li key={user.id} className="py-1">{user.username}</li>
                  ))}
                </ul>
                {isAdmin && (
                  <button
                    onClick={startCompetition}
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
                  >
                    Start Competition
                  </button>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Join Room</h2>
            <input
              type="text"
              placeholder="Enter Room Code"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="w-full p-2 rounded-lg text-black mb-4"
            />
            <button onClick={joinRoom} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
              Join
            </button>
            {joined && <p className="mt-4 text-gray-300">Waiting for host to start...</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default RoomManagement;
