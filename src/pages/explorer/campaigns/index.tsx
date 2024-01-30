import { Box, Container, TextField, Typography } from '@mui/material';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import React from 'react';
import { imagePath } from 'src/constants/imagePath';
import { getLatestFundingCampaigns } from 'src/services/campaign/api';
import LatestFundingCampaigns from 'src/views/explorer/campaign/LatestFundingCampaigns/LatestFundingCampaigns';

export default function Campaigns({ latestFundingCampaigns }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Container sx={{ py: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h1" textTransform={'uppercase'} maxWidth={'720px'}>
                        Explore funding campaigns
                    </Typography>

                    <TextField label="Search..." type="text" name="search_committee" color="secondary" sx={{ mt: 3, maxWidth: '479px' }} fullWidth></TextField>
                </Box>

                <Box sx={{ display: { xs: 'none', xsm: 'block' } }}>
                    <Image src={imagePath.THUMBNAIL1} alt="auxo thumbnail" style={{ maxWidth: '256px', height: 'auto', width: '100%' }} />
                </Box>
            </Box>
            <LatestFundingCampaigns text="Top funding campaigns" latestFundingCampaigns={latestFundingCampaigns.slice(0, 3)} />

            <Box sx={{ mt: 10 }}>
                <LatestFundingCampaigns text="Latest Funding Campaigns" latestFundingCampaigns={latestFundingCampaigns} />
            </Box>
        </Container>
    );
}

export const getStaticProps = (async (context) => {
    try {
        const res = await getLatestFundingCampaigns();
        const latestFundingCampaigns = res;
        return {
            props: {
                latestFundingCampaigns,
            },

            revalidate: 60, // In seconds
        };
    } catch (error) {
        return { notFound: true };
    }
}) satisfies GetStaticProps;
