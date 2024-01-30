import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { TCampaignDetail, getCampaignOverview } from 'src/services/campaign/api';
import DetailCampaigns from 'src/views/explorer/campaign/DetailCampaign/DetailCampaign';

export default function DetailCampaign({ data, idCampaign }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <DetailCampaigns data={data} idCampaign={idCampaign} />;
}

export const getServerSideProps = (async (context) => {
    try {
        const id = context.params?.campaignId || '';
        const res = await getCampaignOverview(id as any);
        const data = res;

        return {
            props: { idCampaign: id as string, data },
        };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}) satisfies GetServerSideProps;
