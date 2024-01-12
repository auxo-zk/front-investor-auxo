import { Box, Button, Popover } from '@mui/material';
import { useState } from 'react';
import { useWalletData } from 'src/states/wallet';
import { formatAddress } from 'src/utils/format';
import WalletProfile from './WalletProfile';

export default function ConnectedWalletButton() {
    const { userAddress } = useWalletData();
    const [open, setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>
                {formatAddress(userAddress)}
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <WalletProfile />
            </Popover>
        </>
    );
}
