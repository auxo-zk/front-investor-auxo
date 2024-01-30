import { Box, SxProps } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { imagePath } from 'src/constants/imagePath';

export default function Img({ sx, alt, src }: { sx?: SxProps; src: string; alt: string }) {
    return (
        <Box sx={{ position: 'relative', ...sx }}>
            <Image
                fill
                src={src || imagePath.DEFAULT_BANNER.src}
                alt={alt}
                style={{ objectFit: 'inherit', borderRadius: 'inherit' }}
                onError={(e) => {
                    e.currentTarget.src = imagePath.DEFAULT_BANNER.src;
                }}
            />
        </Box>
    );
}
