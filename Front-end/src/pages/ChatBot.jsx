import React, { useState } from 'react';

function ChatBot() {
    const [query, setQuery] = useState('');
    const [responses, setResponses] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:8000/chatbot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: query }),
        });

        const data = await response.json();
        setResponses([...responses, { user: query, bot: data.reply }]);
        setQuery('');
    };

    return (
        <div>
            <div className="chat-window">
                {responses.map((message, index) => (
                    <div key={index}>
                        <p><strong>User:</strong> {message.user}</p>
                        <p><strong>Bot:</strong> {message.bot}</p>
                    </div>
                ))}
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask about a player or team..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default ChatBot;
