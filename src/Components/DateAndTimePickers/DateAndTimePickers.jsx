import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

export default function DateTimeValidation({ handleChange, value, label }) {
    const [time, setTime] = React.useState(new Date());

    React.useEffect(() => {
        const updateTime = setTimeout(() => {
            setTime(new Date());
        }, (60 - time.getSeconds()) * 1000)
        return () => {
            clearTimeout(updateTime);
        }
    })
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div style={{ width: 300 }}>
                <DateTimePicker
                    renderInput={(params) => (
                        <TextField {...params} margin="normal" variant="standard" />
                    )}
                    label={label}
                    value={value}
                    onChange={handleChange}
                    minDateTime={time}
                    minTime={time}
                    required
                />
            </div>
        </LocalizationProvider>
    );
}
