import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { TProjectDetail } from 'src/services/project/api';

const initData: TProjectDetail = {
    name: '',
    avatar: '',
    date: '',
    fundrasing: {
        raiseInfo: [],
        raisedAmount: 0,
        targetAmount: 0,
        documents: [],
    },
    overview: {
        challengesAndRisk: '',
        description: '',
        documents: [],
        member: [],
        problemStatement: '',
        solution: '',
        campaignAmount: 0,
        raisingAmount: 0,
    },
};

const projectDetail = atom<TProjectDetail>(initData);

export default function InitProjectDetailData({ data }: { data: TProjectDetail }) {
    const setProjectDetailData = useSetAtom(projectDetail);
    useEffect(() => {
        setProjectDetailData(data);
        console.log('set:', data);
    }, [data, setProjectDetailData]);
    return <></>;
}

export const useProjectDetailData = () => useAtomValue(projectDetail);
