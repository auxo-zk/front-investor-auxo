import { Box, Container, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { imagePath } from 'src/constants/imagePath';
import { getTopProject } from 'src/services/project/api';
import TopProject from 'src/views/explorer/project/TopProject/TopProject';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import LatestFundingCampaigns from 'src/views/explorer/campaign/LatestFundingCampaigns/LatestFundingCampaigns';
import { getLatestFundingCampaigns } from 'src/services/campaign/api';
import FundingActivitiesBanner from 'src/views/banners/FundingActivitiesBanner';

export default function Explorer({ topProjects, latestFundingCampaigns }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Container sx={{ pt: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
                <Typography variant="h1" textTransform={'uppercase'} maxWidth={'614px'}>
                    Explore the Future of On-chain Funding
                </Typography>
                <Box>
                    <Image src={imagePath.THUMBNAIL1} alt="auxo thumbnail" style={{ maxWidth: '256px', height: 'auto', width: '100%' }} />
                </Box>
            </Box>

            <TopProject topProjects={topProjects} showButtonMoreProjects={true} />
            <LatestFundingCampaigns latestFundingCampaigns={latestFundingCampaigns} />

            <FundingActivitiesBanner sx={{ mt: 6 }} />
            <br />
            <br />
            <br />
        </Container>
    );
}

export const getStaticProps = (async (context) => {
    try {
        const res = await Promise.all([getTopProject(), getLatestFundingCampaigns()]);
        const topProjects = res[0];
        const latestFundingCampaigns = res[1];

        return {
            props: {
                topProjects,
                latestFundingCampaigns,
            },

            revalidate: 60, // In seconds
        };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}) satisfies GetStaticProps;
