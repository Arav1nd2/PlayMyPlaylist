import React from 'react';
import { useFormState, useSocket } from '../hooks';

function HomePage() {
    const socket = useSocket();    
    async function createRoom() {
        const { data, errors } = getFormState();
        try {
            const response = await fetch("http://localhost:3000/api/room", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json());
            console.log(response)
            return response.payload.roomID;
        } catch(err) {
            console.log("Something went wrong!", err);
        }
        return null;
    }

    const handleCreateJoinRoom = async () => {
        console.log("Heyy!")
        const roomID = await createRoom();
        console.log(roomID)
        if(roomID) {
            socket.dispatch({ type: "join-room" , payload: { roomID }})
        }
    } 
    const joinRoom = () => {
        const { data: { roomID } } = getFormState();
        // why the hell is this an array?
        const room = roomID[0];
        console.log("Trying to join buddy", room);
        if(typeof room !== 'string') return;
        if(room.length <= 0) return;
        socket.dispatch({ type: "join-room" , payload: { roomID: room }})
    }
    const { getFieldProps, getFormState } = useFormState({ 
        maxPlayers: 2,
        songsPerPlayer: 3,
        maxRounds: 6,
        roomID: ''
    })
    return (
        <div>
            <h1>Create a room!!</h1>
            <input type="number" {...getFieldProps('maxPlayers')}/>
            <input type="number" {...getFieldProps('songsPerPlayer')}/>
            <input type="number" {...getFieldProps('maxRounds')}/>
            <button onClick = {handleCreateJoinRoom}> Create a room </button>
            <hr />
            <h1> Join a room </h1>
            <input type="text" {...getFieldProps('roomID')} />
            <button onClick={joinRoom}> Join the room </button>
        </div>
    )
}

export default HomePage;