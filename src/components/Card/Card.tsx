import { Box, SxProps } from '@mui/material';
import React, { ReactNode } from 'react';
import Img from '../Img/Img';
import { imagePath } from 'src/constants/imagePath';

export default function Card({
    children,
    sx,
    avatar,
    banner,
    subChildren,
    sxBanner,
}: {
    children: ReactNode;
    sx?: SxProps;
    avatar?: string;
    banner?: string;
    subChildren?: ReactNode;
    sxBanner?: SxProps;
}) {
    return (
        <Box
            sx={{
                borderRadius: '12px',
                overflow: 'hidden',
                '&:hover': { boxShadow: 2 },
                transition: 'box-shadow 0.3s',
                bgcolor: 'background.secondary',
                height: '100%',
                flexDirection: 'column',
                ...sx,
            }}
        >
            <Img src={banner || imagePath.DEFAULT_BANNER.src} alt="banner project" sx={{ width: '100%', height: 'auto', aspectRatio: '3/1', ...sxBanner }} />

            <Box sx={{ px: 3, position: 'relative', zIndex: 1 }}>
                {avatar ? (
                    <Img
                        src={avatar}
                        alt="avatar project"
                        sx={{ position: 'absolute', width: '66px', height: '66px', top: 0, transform: 'translatey(-50%)', borderRadius: '50%', objectFit: 'cover', border: '4px solid white' }}
                    />
                ) : (
                    <Img
                        src={imagePath.DEFAULT_AVATAR.src}
                        alt="avatar project"
                        sx={{ position: 'absolute', width: '66px', height: '66px', top: 0, transform: 'translatey(-50%)', borderRadius: '50%', objectFit: 'cover', border: '4px solid white' }}
                    />
                )}
            </Box>
            <Box sx={{ px: 3, position: 'relative', minHeight: '100px', pt: '33px', pb: 3 }}>{children}</Box>
            {subChildren}
        </Box>
    );
}
