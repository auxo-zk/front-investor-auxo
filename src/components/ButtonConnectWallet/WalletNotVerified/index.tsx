import { Box, Button, IconButton, Typography } from '@mui/material';
import { useWalletData, useWalletFunction } from 'src/states/wallet';
import { formatAddress } from 'src/utils/format';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function WalletNotVerified() {
    const { userAddress } = useWalletData();
    const { disconnectWallet, login } = useWalletFunction();
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
                <CancelOutlinedIcon sx={{ mr: 1 }} />
                <Typography display={'flex'} alignItems={'center'} color="secondary.main" variant="body2">
                    Wallet not logged in
                </Typography>
            </Box>
            <Box sx={{ border: 'none', width: '100%', backgroundColor: 'divider', height: '2px' }} />
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" fullWidth sx={{ mb: 1 }} size="small" onClick={() => login()}>
                    Login
                </Button>
                <Button variant="outlined" fullWidth size="small" onClick={disconnectWallet}>
                    Disconnect
                </Button>
            </Box>
        </Box>
    );
}
