import React from 'react';
import { useSocket } from '../hooks';

function HomePage() {
    const socket = useSocket();
    console.log("Got the socket connection also", socket);
    const handleJoinRoom = () => {
        socket.dispatch({ type: "join-room" })
    } 
    return (
        <div>
            <h1>Hello from home page!</h1>
            <button onClick = {handleJoinRoom}> Join a room </button>
        </div>
    )
}

export default HomePage;