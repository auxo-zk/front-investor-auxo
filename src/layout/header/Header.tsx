import { Menu } from '@mui/icons-material';
import { Box, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import ButtonConnectWallet from 'src/components/ButtonConnectWallet/ButtonConnectWallet';

export default function Header({ headerHeight }: { headerHeight: string }) {
    const [isScrollDown, setIsScrollDown] = useState<boolean>(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setIsScrollDown(true);
        } else {
            setIsScrollDown(false);
        }
    };
    return (
        <Box
            sx={{
                borderBottom: '1px solid',
                background: isScrollDown ? '#fff' : '',
                borderColor: 'divider',
                height: headerHeight,
                position: 'sticky',
                top: '0',
                left: 0,
                width: '100%',
                zIndex: '900',
            }}
        >
            <Container sx={{ height: headerHeight, display: 'flex', placeItems: 'center' }}>
                <Box component={'label'} htmlFor="control-sidebar" sx={{ display: { xs: 'flex', lg: 'none' }, cursor: 'pointer', ml: 1 }}>
                    <Menu sx={{ fontSize: '28px' }} />
                </Box>
                <ButtonConnectWallet />
            </Container>
        </Box>
    );
}
