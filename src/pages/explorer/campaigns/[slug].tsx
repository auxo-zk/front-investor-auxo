import { ChevronLeft, ChevronLeftRounded } from '@mui/icons-material';
import { Box, Breadcrumbs, Container, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import ButtonGroup from 'src/components/ButtonGroup/ButtonGroup';
import Img from 'src/components/Img/Img';

export default function DetailCampaign() {
    return (
        <Container sx={{ pb: 5 }}>
            <Img
                src="https://bitnews.sgp1.digitaloceanspaces.com/uploads/admin/R4LE00ioowv4m5dB_1690012540.jpg"
                alt="banner project"
                sx={{ width: '100%', height: 'auto', aspectRatio: '370/100', borderRadius: '0px 0px 12px 12px' }}
            />
            <Breadcrumbs sx={{ mt: 2 }}>
                <Link color="inherit" href="/explorer/campaigns" style={{ textDecoration: 'none', color: 'unset' }}>
                    <Box sx={{ display: 'flex', placeItems: 'center' }}>
                        <ChevronLeftRounded color="primary" sx={{ fontSize: '24px' }} />
                        <Typography color={'primary.main'}>All Campaigns</Typography>
                    </Box>
                </Link>
                <Link color="inherit" href="#" style={{ textDecoration: 'none', color: 'unset' }}>
                    <Typography color={'primary.main'} fontWeight={600}>
                        Campaigns Name
                    </Typography>
                </Link>
            </Breadcrumbs>

            <Box sx={{ position: 'sticky', top: '64px', bgcolor: 'background.default', pb: 2, mt: 3 }}>
                <Typography variant="h3">PI NEtwork celebrates pi2day 2023</Typography>
                <ButtonGroup sx={{ mt: 3 }} options={['Overview', 'Fundraising']} selected={0} changeSelected={(val) => {}} fullWidth={true} />
            </Box>
        </Container>
    );
}
