import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { KeyProjectInput, TProjectDetail, TProjectFundRaising } from 'src/services/project/api';

export type TStateDetailProject = TProjectDetail & { fundrasing: TProjectFundRaising[]; selectedCampaignIndex: number | null };

const initData: TStateDetailProject = {
    name: '',
    avatar: '',
    date: '',
    banner: '',
    totalClaimedAmount: 0,
    totalFundedAmount: 0,
    overview: {
        description: '',
        documents: [],
        member: [],
        campaignAmount: 0,
        raisingAmount: 0,
        [KeyProjectInput.solution]: '',
        [KeyProjectInput.challengesAndRisks]: '',
        [KeyProjectInput.problemStatement]: '',
    },

    selectedCampaignIndex: null,
    fundrasing: [],
};

const projectDetail = atom<TStateDetailProject>(initData);

export default function InitProjectDetailData({ data }: { data: TProjectDetail }) {
    const setProjectDetailData = useSetAtom(projectDetail);
    useEffect(() => {
        setProjectDetailData((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
        // console.log('set:', data);
    }, []);
    return <></>;
}

export const useProjectDetailData = () => useAtomValue(projectDetail);
export function useProjectDetailFunction() {
    const _setProjectDetailData = useSetAtom(projectDetail);

    function setProjectDetailData(data: Partial<TStateDetailProject>) {
        _setProjectDetailData((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    }
    return {
        setProjectDetailData,
    };
}
