import { GetServerSideProps, GetStaticProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import { TProjectDetail, getProjectDetail } from 'src/services/project/api';
import ProjectDetail from 'src/views/explorer/project/ProjectDetail/ProjectDetail';
import InitProjectDetailData from 'src/views/explorer/project/ProjectDetail/state';

export default function DetailProject({ data }: InferGetStaticPropsType<typeof getServerSideProps>) {
    return (
        <>
            <InitProjectDetailData data={data} />;
            <ProjectDetail />
        </>
    );
}

export const getServerSideProps = (async (context) => {
    try {
        const res = await getProjectDetail('0');
        const data = res;

        return {
            props: { data },
        };
    } catch (error) {
        return { notFound: true };
    }
}) satisfies GetServerSideProps<{
    data: TProjectDetail;
}>;
