import { TextField } from "@mui/material"
import { useState } from "react"

interface Props {
    setUsername: (username: string) => void,
}

function InputName({ setUsername }: Props) {

    const [entered, setEntered] = useState(false);
    const [value,setValue] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!entered) {
            setValue(event.target.value);
        }
    };

    const handleInputBlur = () => {
        if(value.trim() === '') return
        setEntered(true);
        setUsername(value)
    };

    return (
        <TextField
            label={'Enter username'}
            variant="outlined"
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            disabled={entered}
        // Other TextField props can be added here
        />
    );
}


export default InputName