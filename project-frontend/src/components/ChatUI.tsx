import { Box, Grid, TextField, Button, Paper, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';


export interface messageType {
    text: string,
    sender: string
}
const messagesBegining: messageType[] = [
    { text: "Hi there!", sender: "bot" },
    { text: "Hello!", sender: "user" },
    { text: "How can I assist you today?", sender: "bot" },
];

const ChatUI = ({ incomingMessage,setSendMessage }: { incomingMessage: messageType,setSendMessage:(inputMessage:string)=>void }) => {
    const [messages, setMessages] = useState(messagesBegining)
    const [input, setInput] = useState("");

    useEffect(() => {
        setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    }, [incomingMessage])



    const handleSend = () => {
        if (input.trim() !== "") {
            console.log(input);
            const newMessage: messageType = { text: input, sender: "user" }; // Create a new user message
            setMessages((prevMessages) => [...prevMessages, newMessage]); // Add new message to the existing messages array
            setSendMessage(input.trim())
            setInput("");
        }
    };

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInput(event.target.value);
    };

    return (
        <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
            <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                {messages.map((message: messageType, index: number) => (
                    <Message key={index} message={message} />
                ))}
            </Box>
            <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            fullWidth
                            placeholder="Type a message"
                            value={input}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            fullWidth
                            size="large"
                            color="primary"
                            variant="contained"
                            endIcon={<SendIcon />}
                            onClick={handleSend}
                        >
                            Send
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

const Message = ({ message }: { message: messageType }) => {
    const isBot = message.sender === "bot";

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: isBot ? "flex-start" : "flex-end",
                mb: 2,
            }}
        >
            <Paper
                variant="outlined"
                sx={{
                    p: 1,
                    backgroundColor: isBot ? "primary.light" : "secondary.light",
                }}
            >
                <Typography variant="body1">{message.text}</Typography>
            </Paper>
        </Box>
    );
};

export default ChatUI;