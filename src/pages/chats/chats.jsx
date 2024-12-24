import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import 'tailwindcss/tailwind.css';

const socket = io('http://localhost:3000');

const Chats = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for incoming messages
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        // Cleanup on component unmount
        return () => {
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            // Emit the message to the server
            socket.emit('message', message);
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
                <List className="mb-4">
                    {messages.map((msg, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={msg} />
                        </ListItem>
                    ))}
                </List>
                <div className="flex">
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={sendMessage}
                        className="ml-2"
                    >
                        Send
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Chats;