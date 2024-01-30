import { Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Card from 'src/components/Card/Card';
import { TCampaignData } from 'src/services/campaign/api';

export default function CardCampaign({ data }: { data: TCampaignData }) {
    return (
        <Card avatar={data.avatar} banner={data.banner}>
            <Link href={`/explorer/campaigns/${data.campaignId}`} style={{ textDecoration: 'none', color: 'unset' }}>
                <Typography variant="h6" fontWeight={600} mb={4}>
                    {data.name}
                </Typography>
            </Link>

            <Typography>
                <Typography component={'span'} fontWeight={600}>
                    Type:
                </Typography>{' '}
                {data.type}
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
