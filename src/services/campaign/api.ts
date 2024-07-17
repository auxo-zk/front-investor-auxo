import axios from 'axios';
import { apiUrl } from '../url';
import { TProjectData } from '../project/api';
import { Constants } from '@auxo-dev/platform';

export enum CampaignState {
    'UPCOMING',
    'APPLICATION',
    'FUNDING',
    'ALLOCATION',
}

export type TCampaignData = { name: string; fundingOption: number; date: string; capacity: number; avatar: string; banner: string; state: CampaignState; campaignId: string };
export async function getLatestFundingCampaigns(active: boolean = true): Promise<TCampaignData[]> {
    const response: any[] = (await axios.get(apiUrl.getCampaignAll + `?active=${active}`)).data;
    console.log(response);

    return response.map((item) => {
        const timeLine = {
            startParticipation: item.timeline?.startParticipation ? item.timeline.startParticipation * 1000 : Date.now() + 60000,
            startFunding: item.timeline?.startFunding ? item.timeline.startFunding * 1000 : Date.now() + 60000,
            startRequesting: item.timeline?.startRequesting ? item.timeline.startRequesting * 1000 : Date.now() + 60000,
        };
        const now = new Date().getTime();
        let state = CampaignState.UPCOMING;
        if (now > timeLine.startParticipation && now < timeLine.startFunding) {
            state = CampaignState.APPLICATION;
        } else if (now > timeLine.startFunding && now < timeLine.startRequesting) {
            state = CampaignState.FUNDING;
        } else if (now > timeLine.startRequesting) {
            state = CampaignState.ALLOCATION;
        }
        return {
            name: item.ipfsData?.name || '---',
            fundingOption: item.ipfsData?.fundingOption || 2,
            capacity: item.ipfsData?.capacity || '0',
            date: new Date().toLocaleDateString(),
            avatar: item.ipfsData?.avatarImage || '',
            banner: item.ipfsData?.coverImage || '',
            state: state,
            campaignId: item.campaignId + '' || '#',
        };
    });
}
// **************************************************************************************************************************
export type TCampaignDetailOverview = {
    organizer: {
        address: string;
        name: string;
        avatar: string;
    };
    capacity: string;
    description: string;
    timeline: {
        startParticipation: number;
        startFunding: number;
        startRequesting: number;
    };
};

export type TCampaignQuestion = {
    question: string;
    hint: string;
    isRequired: boolean;
};

export type TCampaignResult = {};
export type TCampaignDetail = {
    campaignId: string;
    name: string;
    banner: string;
    avatar: string;
    overview: TCampaignDetailOverview;
    result: TCampaignResult;
    questions: TCampaignQuestion[];
};
export async function getCampaignOverview(campaignId: string): Promise<TCampaignDetail> {
    const response = (await axios.get(apiUrl.campaignDetail + `/${campaignId}`)).data;
    return {
        campaignId: response.campaignId + '' || '',
        name: response.ipfsData?.name || '----',
        banner: response?.ipfsData?.coverImage || '',
        avatar: response?.ipfsData?.avatarImage || '',
        overview: {
            organizer: {
                address: response?.ownerInfo?.address || '',
                avatar: response?.ownerInfo?.img || '',
                name: response?.ownerInfo?.name || 'Unnkown Name',
            },
            capacity: response.ipfsData?.capacity || '',
            description: response.ipfsData?.description || '',
            timeline: {
                startParticipation: response.timeline?.startParticipation * 1000 || 0,
                startFunding: response.timeline?.startFunding * 1000 || 0,
                startRequesting: response.timeline?.startRequesting * 1000 || 0,
            },
        },
        result: {},
        questions: response.ipfsData?.questions || [],
    };
}

export type TProjectFundData = TProjectData & { totalFundedAmount: number };
export async function getParticipatingProjects(campaignId: string): Promise<TProjectFundData[]> {
    const response = await axios.get(apiUrl.getParticipatingProjects(campaignId));
    return response.data.map((item: any) => {
        return {
            name: item.ipfsData?.name || '',
            avatar: item?.ipfsData?.avatarImage || '',
            banner: item?.ipfsData?.coverImage || '',
            desc: item.ipfsData?.description || '',
            date: new Date().toLocaleDateString(),
            idProject: item.projectId + '' || '#',
            totalFundedAmount: (item.totalFundedAmount / 10 ** 9) * Constants.MINIMAL_MINA_UNIT,
        };
    });
}
