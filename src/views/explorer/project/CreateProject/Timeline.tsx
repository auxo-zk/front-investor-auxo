import { Typography, Box } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function Timeline() {
    return (
        <>
            <Typography variant="h6" mt={2} mb={4}>
                Time line
            </Typography>
            <Box className="timeline-row">
                <Box className="timeline-dot" />
                <Typography width={'180px'} variant="body1">
                    Application Period
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label="From" sx={{ mr: 3 }} />
                    <DateTimePicker label="To" />
                </LocalizationProvider>
            </Box>
            <Box className="timeline-row">
                <Box className="timeline-dot" />
                <Typography width={'180px'} variant="body1">
                    Application Period
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label="From" sx={{ mr: 3 }} />
                    <DateTimePicker label="To" />
                </LocalizationProvider>
            </Box>
            <Box className="timeline-row">
                <Box className="timeline-dot" />
                <Typography width={'180px'} variant="body1">
                    Application Period
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker label="From" sx={{ mr: 3 }} />
                    <DateTimePicker label="To" />
                </LocalizationProvider>
            </Box>
        </>
    );
}
