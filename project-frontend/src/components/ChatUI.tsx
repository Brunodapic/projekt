import { Box, Grid, TextField, Button, Paper, Typography } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';


export interface messageType {
    text: string,
    sender: string
}
const messagesBegining: messageType[] = [];

const ChatUI = ({ incomingMessage, setSendMessage, roomId }: { incomingMessage: messageType | undefined, setSendMessage: (inputMessage: string) => void, roomId: string }) => {
    const [messages, setMessages] = useState(messagesBegining)
    const [input, setInput] = useState("");

    useEffect(() => {
        if (incomingMessage) setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    }, [incomingMessage])

    useEffect(() => {
        setMessages([]);
    }, [roomId])


    const handleSend = () => {
        if (input.trim() !== "") {
            const newMessage: messageType = { text: input, sender: "user" }; // Create a new user message
            setMessages((prevMessages) => [...prevMessages, newMessage]); // Add new message to the existing messages array
            setSendMessage(input.trim())
            setInput("");
        }
    };

    const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setInput(event.target.value);
    };

    const handleEnterKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <Box sx={{ height: "75vh", display: "flex", flexDirection: "column" }}>
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
                            onKeyDown={handleEnterKeyPress}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button
                            sx={{ width: "80px" }}
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