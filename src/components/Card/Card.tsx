import { Box, SxProps } from '@mui/material';
import React, { ReactNode } from 'react';
import Img from '../Img/Img';
import { imagePath } from 'src/constants/imagePath';

export default function Card({ children, sx, avatar, banner }: { children: ReactNode; sx?: SxProps; avatar?: string; banner?: string }) {
    return (
        <Box sx={{ borderRadius: '12px', overflow: 'hidden', '&:hover': { boxShadow: 2 }, transition: 'box-shadow 0.3s', ...sx }}>
            {!banner && <Img src={imagePath.DEFAULT_BANNER.src} alt="banner project" sx={{ width: '100%', height: 'auto', aspectRatio: '3/1' }} />}
            {banner && (
                <Img
                    src="https://trunganhmedia.com/wp-content/uploads/2023/02/thiet-ke-banner-quang-cao-1400x518.jpg"
                    alt="banner project"
                    sx={{ width: '100%', height: 'auto', aspectRatio: '3/1' }}
                />
            )}

            <Box sx={{ px: 3, position: 'relative', zIndex: 1 }}>
                {avatar ? (
                    <Img
                        src="https://www.aipromptsgalaxy.com/wp-content/uploads/2023/06/subrat_female_avatar_proud_face_Aurora_a_25-year-old_girl_with__fd0e4c59-bb7e-4636-9258-6690ec6a71e7.png"
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
            <Box sx={{ px: 3, position: 'relative', minHeight: '100px', bgcolor: 'background.secondary', pt: '33px', pb: 3 }}>{children}</Box>
        </Box>
    );
}
