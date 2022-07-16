import './App.css';
import io from 'socket.io-client'
import { useState } from 'react';
import Chat from './components/Chat';

const socket = io.connect("http://localhost:3001")

function App() {
  const [roomName, setRoomName] = useState("")
  const [username, setUsername] = useState("")

  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== "" && roomName !== "") {
      socket.emit("join_room", { roomName, username })
      setShowChat(true)
    }
  }
  return (
    <div className="App">
      {!showChat ? (
        <>
          <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Your Name..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room Name..."
            onChange={(event) => {
              setRoomName(event.target.value);
            }}
          />
          <button onClick={joinRoom} className="btn btn-primary">Join A Room</button>
        </div>
        </>
      ): (
        <Chat socket={socket} username={username} roomName={roomName} />
      )}
    </div>
  );
}

export default App;
