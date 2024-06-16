import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Card from 'src/components/Card/Card';
import { TCampaignData } from 'src/services/campaign/api';
import StateCampaign from './StateCampaign';
import { fundingOption } from 'src/constants';

export default function CardCampaign({ data }: { data: TCampaignData }) {
    return (
        <Card avatar={data.avatar} banner={data.banner}>
            <Box display={'flex'} sx={{ placeItems: 'center' }} mb={4}>
                <Link href={`/explorer/campaigns/${data.campaignId}`} style={{ textDecoration: 'none', color: 'unset' }}>
                    <Typography variant="h6" fontWeight={600}>
                        {data.name}
                    </Typography>
                </Link>
                <StateCampaign props={{ sx: { ml: ' auto' } }} state={data.state}></StateCampaign>
            </Box>

            <Typography>
                <Typography component={'span'} fontWeight={600}>
                    Type:
                </Typography>{' '}
                {fundingOption[data.fundingOption]}
            </Typography>
            <Typography>
                <Typography component={'span'} fontWeight={600}>
                    Capacity:
                </Typography>{' '}
                {data.capacity}
            </Typography>
        </Card>
    );
}
