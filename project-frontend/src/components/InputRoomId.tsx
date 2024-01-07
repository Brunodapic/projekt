import { Autocomplete, Box, Button, TextField } from "@mui/material"
import axios from "axios"
import { useCallback, useEffect, useState } from "react"

interface Props {
    setRoomId: (newRoomId: string) => void,
    sendMessage:string
}

function InputRoomId({ setRoomId,sendMessage }: Props) {

    const [rooms, setRooms] = useState(['1'])
    const [inputValue, setInputValue] = useState('');


    const handleInputChange = (event: React.ChangeEvent<object>, newInputValue: string) => {
        if (newInputValue !== null) {
            setInputValue(newInputValue);
        }
    };

    const handleSubmit = useCallback(() => {
        setRoomId(inputValue);
    },[inputValue, setRoomId]);


    useEffect(() => {
        const getRooms = async () => {
            const response = await axios.get('http://localhost:3000/rooms');
            setRooms(response.data)
            return response
        }
        getRooms()

    }, [handleSubmit,sendMessage])


    return (
        <Box sx={{ margin: "15px" }}>
            <Autocomplete
                defaultValue={"1"}
                value={inputValue}
                onChange={(newValue) => {
                    if (typeof newValue === 'string') {
                        setInputValue(newValue);
                    }
                }} inputValue={inputValue}
                onInputChange={handleInputChange}
                options={rooms}
                renderInput={(params) => (
                    <TextField {...params} label="Type something" variant="outlined" />
                )}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>

    );
}

export default InputRoomId