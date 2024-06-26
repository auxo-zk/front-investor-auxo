import { ChevronLeftRounded } from '@mui/icons-material';
import { Container, Breadcrumbs, Box, Typography } from '@mui/material';
import Link from 'next/link';
import Img from 'src/components/Img/Img';

import ButtonGroup from 'src/components/ButtonGroup/ButtonGroup';
import { useProjectDetailData } from './state';
import { useState } from 'react';
import FundRaisingProject from './FundrasingProject/FundRaising';
import OverviewProject from './OverviewProject/OverviewProject';

export default function ProjectDetail({ projectId }: { projectId: string }) {
    const { name, avatar, banner, date, overview } = useProjectDetailData();
    const [selected, setSelected] = useState<number>(0);
    return (
        <Container sx={{ pb: 5 }}>
            <Img src={banner} alt="banner project" sx={{ width: '100%', height: 'auto', aspectRatio: '370/100', borderRadius: '0px 0px 12px 12px' }} />
            <Breadcrumbs sx={{ mt: 2 }}>
                <Link color="inherit" href="/explorer/projects" style={{ textDecoration: 'none', color: 'unset' }}>
                    <Box sx={{ display: 'flex', placeItems: 'center' }}>
                        <ChevronLeftRounded color="primary" sx={{ fontSize: '24px' }} />
                        <Typography color={'primary.main'}>All Projects</Typography>
                    </Box>
                </Link>
                <Typography color={'primary.main'} fontWeight={600}>
                    {name}
                </Typography>
            </Breadcrumbs>

            <Box sx={{ position: 'sticky', top: '64px', bgcolor: 'background.default', pb: 2, zIndex: 2 }}>
                <Box sx={{ display: 'flex', placeItems: 'center', gap: 1, mt: 2 }}>
                    <Img src={avatar} alt="avatar project" sx={{ width: '66px', height: '66px', borderRadius: '50%' }}></Img>
                    <Box sx={{ display: 'flex', placeItems: 'baseline', gap: 1 }}>
                        <Typography variant="h3">{name}</Typography>
                        <Typography variant="body2">Joined 24/12/2023</Typography>
                    </Box>
                </Box>
                <ButtonGroup
                    sx={{ mt: 3 }}
                    options={['Overview', 'Fundraising']}
                    selected={selected}
                    changeSelected={(val) => {
                        setSelected(val);
                    }}
                    fullWidth={true}
                />
            </Box>

            {selected === 0 && <OverviewProject />}
            {selected === 1 && <FundRaisingProject projectId={projectId} />}
        </Container>
    );
}
