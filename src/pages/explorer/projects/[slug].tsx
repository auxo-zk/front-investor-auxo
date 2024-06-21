import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import React from 'react';
import { getProjectDetail } from 'src/services/project/api';
import ProjectDetail from 'src/views/explorer/project/ProjectDetail/ProjectDetail';
import InitProjectDetailData from 'src/views/explorer/project/ProjectDetail/state';

export default function DetailProject({ data, idProject }: InferGetStaticPropsType<typeof getServerSideProps>) {
    return (
        <>
            <InitProjectDetailData data={data} />
            <ProjectDetail projectId={idProject} />
        </>
    );
}

export const getServerSideProps = (async (context) => {
    try {
        const id = context.params?.slug || '';
        const res = await getProjectDetail(id as any);
        const data = res;

        return {
            props: { data, idProject: id as string },
        };
    } catch (error) {
        console.log(error);
        return { notFound: true };
    }
}) satisfies GetServerSideProps;
