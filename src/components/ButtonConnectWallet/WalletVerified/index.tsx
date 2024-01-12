import { Box, Button, IconButton, Typography } from '@mui/material';
import { useWalletData, useWalletFunction } from 'src/states/wallet';
import { formatAddress } from 'src/utils/format';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function WalletVerified() {
    const { userAddress } = useWalletData();
    const { logout } = useWalletFunction();
    return (
        <Box sx={{ boxShadow: 1, p: 2 }}>
            <Typography color="primary.main" variant="body1">
                Connected with auro wallet
            </Typography>
            <Box sx={{ display: 'flex', alignItem: 'center', mb: 1 }}>
                <Typography color="primary.main" display={'flex'} alignItems={'center'} variant="h6">
                    {formatAddress(userAddress)}
                </Typography>
                <IconButton>
                    <ContentCopyIcon />
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', alignItem: 'center', mb: 1 }}>
                <CheckCircleOutlineOutlinedIcon sx={{ mr: 1 }} />
                <Typography display={'flex'} alignItems={'center'} color="secondary.main" variant="body2">
                    Wallet logged in
                </Typography>
            </Box>
            <Box sx={{ border: 'none', width: '100%', backgroundColor: 'divider', height: '2px' }} />
            <Box sx={{ mt: 2 }}>
                <Box sx={{ mb: 2, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    <AccountCircleOutlinedIcon fontSize="large" />
                    <Typography ml={1} variant="body2" fontWeight={700} color={'primary.main'}>
                        Profile
                    </Typography>
                </Box>
                <Box sx={{ mt: 2, cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={logout}>
                    <LogoutOutlinedIcon fontSize="large" />
                    <Typography ml={1} variant="body2" fontWeight={700} color={'primary.main'}>
                        Logout
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
