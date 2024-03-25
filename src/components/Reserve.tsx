import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Select , MenuItem, TextField } from '@mui/material'
import { Dayjs } from "dayjs"

export default function Reserve({onNameChange, onLastNameChange, onCitizenIDChange, onBookDateChange, onHospitalChange}: {onNameChange:Function, onLastNameChange:Function, onCitizenIDChange:Function, onBookDateChange:Function, onHospitalChange:Function}){
    
    const [name, setName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [citizenID, setCitizenID] = useState<string>('')
    const [bookDate, setBookDate ] = useState<Dayjs|null>(null)
    const [hospital, setHospital] = useState<string>('')

    return (
        <div className="bg-slate-100 rounded-lg w-fit px-5 py-5 flex flex-col justify-center items-center inline-block">
            <TextField variant="standard" name="Name" label="Name" className="h-[50px] w-[200px] mb-5"
                value={name} onChange={(e) => {setName(e.target.value); onNameChange(e.target.value)}}
            ></TextField>
            <TextField variant="standard" name="LastName" label="LastName" className="h-[50px] w-[200px] mb-5"
                value={lastName} onChange={(e) => {setLastName(e.target.value); onLastNameChange(e.target.value)}}
            ></TextField>
            <TextField variant="standard" name="Citizen ID" label="Citizen ID" className="h-[50px] w-[200px] mb-5"
                value={citizenID} onChange={(e) => {setCitizenID(e.target.value); onCitizenIDChange(e.target.value)}}
            ></TextField>
            <Select variant="standard" name="Hospital" id="Hospital" className="h-[50px] w-[200px] mb-5"
                value={hospital} onChange={(e)=>{setHospital(e.target.value); onHospitalChange(e.target.value) }}>
                <MenuItem value="Chula">Chulalongkorn Hospital</MenuItem>
                <MenuItem value="Rajavithi">Rajavithi Hospital</MenuItem>
                <MenuItem value="Thammasat">Thammasat University Hospital</MenuItem>
            </Select>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white"
                    value={bookDate} onChange={(value)=>{setBookDate(value); onBookDateChange(value)}}
                ></DatePicker>
            </LocalizationProvider>
        </div>
    );
}
