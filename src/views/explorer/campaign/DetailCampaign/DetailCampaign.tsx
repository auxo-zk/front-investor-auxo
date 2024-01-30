import { ChevronLeftRounded } from '@mui/icons-material';
import { Container, Breadcrumbs, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import ButtonGroup from 'src/components/ButtonGroup/ButtonGroup';
import Img from 'src/components/Img/Img';
import { TCampaignDetail } from 'src/services/campaign/api';
import CampaignOverview from './CampaignOverview/CampaignOverview';
import { imagePath } from 'src/constants/imagePath';
import NoData from 'src/components/NoData';

export default function DetailCampaigns({ data, idCampaign }: { data: TCampaignDetail; idCampaign: string }) {
    const [selected, setSelected] = useState<number>(0);
    return (
        <Container sx={{ pb: 5 }}>
            <Img src={data.banner || imagePath.DEFAULT_BANNER.src} alt="banner project" sx={{ width: '100%', height: 'auto', aspectRatio: '370/100', borderRadius: '0px 0px 12px 12px' }} />
            <Breadcrumbs sx={{ mt: 2 }}>
                <Link color="inherit" href="/explorer/campaigns" style={{ textDecoration: 'none', color: 'unset' }}>
                    <Box sx={{ display: 'flex', placeItems: 'center' }}>
                        <ChevronLeftRounded color="primary" sx={{ fontSize: '24px' }} />
                        <Typography color={'primary.main'}>All Campaigns</Typography>
                    </Box>
                </Link>
                <Typography color={'primary.main'} fontWeight={600}>
                    {data.name}
                </Typography>
            </Breadcrumbs>

            <Box sx={{ position: 'sticky', top: '64px', bgcolor: 'background.default', pb: 2, mt: 3 }}>
                <Typography variant="h3">{data.name}</Typography>
                <ButtonGroup
                    sx={{ mt: 3 }}
                    options={['Overview', 'Results']}
                    selected={selected}
                    changeSelected={(val) => {
                        setSelected(val);
                    }}
                    fullWidth={true}
                />
            </Box>
            {selected === 0 ? (
                <Box>
                    <CampaignOverview data={data.overview || {}} idCampaign={idCampaign} />
                </Box>
            ) : (
                <Box>
                    <NoData text="No Data" />
                </Box>
            )}
        </Container>
    );
}
