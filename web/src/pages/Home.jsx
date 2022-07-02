import React from 'react';
import { useSocket } from '../hooks/socket';

function HomePage(props) {
    const socket = useSocket();
    console.log("Got the socket connection also", socket);
    return (
        <div>
            <h1>Hello from home page!</h1>
        </div>
    )
}

export default HomePage;