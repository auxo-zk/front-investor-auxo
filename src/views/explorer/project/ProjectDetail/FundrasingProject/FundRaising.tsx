import { Box } from '@mui/material';
import React from 'react';
import LeftBox from './components/LeftBox';
import RightBox from './components/RightBox';

export default function FundRaisingProject() {
    return (
        <Box sx={{ display: 'flex', gap: 3.5, mt: 3, position: 'relative', zIndex: 0 }}>
            <LeftBox />
            <RightBox />
        </Box>
    );
}
