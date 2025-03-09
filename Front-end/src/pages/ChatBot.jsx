import React, { useState } from "react";
import { Container, Paper, TextField, Button, Typography, Box } from "@mui/material";

function ChatBot() {
    const [query, setQuery] = useState("");
    const [responses, setResponses] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8000/chatbot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query }),
        });

        const data = await response.json();
        setResponses([...responses, { user: query, bot: data.reply }]);
        setQuery("");
    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 3, mt: 5, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: "bold" }}>
                    Spiriter AI ChatBot
                </Typography>

               
                <Box
                    sx={{
                        height: 300,
                        overflowY: "auto",
                        p: 2,
                        bgcolor: "#f5f5f5",
                        borderRadius: 1,
                        mb: 2,
                    }}
                >
                    {responses.map((message, index) => (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="body1" color="primary">
                                <strong>User:</strong> {message.user}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                <strong>Bot:</strong> {message.bot}
                            </Typography>
                        </Box>
                    ))}
                </Box>

  
                <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Ask about a player or team..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Send
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}

export default ChatBot;
