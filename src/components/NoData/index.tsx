import { Box, Typography } from '@mui/material';
import { IconEmpty } from 'src/assets/svg/icon';

export default function NoData({ text }: { text?: string }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 3 }}>
            <IconEmpty sx={{ width: '100px', height: '100px' }} />
            <Typography variant="body2" color="#9FC5C2">
                {text || 'Empty Data'}
            </Typography>
        </Box>
    );
}
