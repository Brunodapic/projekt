import { Autocomplete, Box, Button, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"

interface Props {
    setRoomId: (newRoomId: string) => void
}

function InputRoomId({ setRoomId }: Props) {

    const [rooms, setRooms] = useState(['1', '2'])
    const [inputValue, setInputValue] = useState('');


    const handleInputChange = (event: React.ChangeEvent<object>, newInputValue: string) => {
        if (newInputValue !== null) {
            setInputValue(newInputValue);
        }
    };

    const handleSubmit = () => {
        setRoomId(inputValue);
    };


    useEffect(() => {
        const getRooms = async () => {
            const response = await axios.get('localhost:3000/rooms')
            setRooms(rooms)
            return response
        }
        getRooms()

    }, [])


    return (
        <Box sx={{ margin: "15px" }}>
            <Autocomplete
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