import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';
import Img from '../Img/Img';

export type TDataStackTeamMember = {
    urlImage: string;
    name: string;
    desc: string;
    sx?: SxProps;
};
export default function StackTeamMember(props: TDataStackTeamMember) {
    return (
        <Box sx={{ cursor: 'pointer', display: 'flex', placeItems: 'center', gap: 2, ...props.sx }}>
            <Img src={props.urlImage} alt="user member avatar" sx={{ height: '50px', width: '50px', borderRadius: '50%' }} />
            <Box>
                <Typography color={'primary.main'} fontWeight={500}>
                    {props.name}
                </Typography>
                <Typography variant="body2">{props.desc}</Typography>
            </Box>
        </Box>
    );
}
