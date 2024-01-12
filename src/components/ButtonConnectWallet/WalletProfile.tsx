import { useWalletConnected, useWalletData } from 'src/states/wallet';
import WalletVerified from './WalletVerified';
import WalletNotVerified from './WalletNotVerified';
import { Paper } from '@mui/material';

export default function WalletProfile() {
    const { logged } = useWalletData();
    return (
        <Paper sx={{ minWidth: '300px' }}>
            {logged && <WalletVerified />}
            {!logged && <WalletNotVerified />}
        </Paper>
    );
}
