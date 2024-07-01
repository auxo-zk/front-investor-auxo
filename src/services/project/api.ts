import axios from 'axios';
import { apiUrl } from '../url';
import { LocalStorageKey } from 'src/constants';
import { TFileSaved } from '../type';

export enum KeyProjectInput {
    'solution' = 'solution',
    'problemStatement' = 'problemStatement',
    'challengesAndRisks' = 'challengesAndRisk',
}
//PROJECT LIST ************************************************************************************************************************************************
export type TProjectData = {
    name: string;
    desc: string;
    date: string;
    banner: string;
    avatar: string;
    idProject: string;
};
export const getJwt = () => {
    return localStorage.getItem(LocalStorageKey.AccessToken) || '';
};

export async function getTopProject(): Promise<TProjectData[]> {
    const response: any[] = (await axios.get(apiUrl.getTopProject)).data;
    return response.map((item: any) => ({
        name: item.ipfsData?.name || '',
        avatar: item?.ipfsData?.avatarImage || '',
        banner: item?.ipfsData?.coverImage || '',
        desc: item.ipfsData?.description || '',
        date: new Date().toLocaleDateString(),
        idProject: item.projectId + '' || '#',
    }));
}

export async function getAddressProject(address: string): Promise<TProjectData[]> {
    const response: any[] = (await axios.get(apiUrl.getTopProject + `?member=${address}`)).data;
    return response.map((item: any) => ({
        name: item.ipfsData?.name || '',
        avatar: item?.ipfsData?.avatarImage || '',
        banner: item?.ipfsData?.coverImage || '',
        desc: item.ipfsData?.description || '',
        date: new Date().toLocaleDateString(),
        idProject: item.projectId + '' || '#',
    }));
}

//PROJECT DETAIL ************************************************************************************************************************************************
export type TMemberData = {
    name: string;
    role: string;
    link: string;
    publicKey: string;
};

export type TScopeOfWork = {
    deadline: string;
    information: string;
    milestone: string;
    raisingAmount: string;
};

export type TProjectOverview = {
    raisingAmount?: number;
    campaignAmount?: number;
    description: string;
    documents: TFileSaved[];
    member: TMemberData[];
} & {
    [key in KeyProjectInput]: string;
};

export type TProjectDetail = {
    name: string;
    avatar: string;
    banner: string;
    date: string;
    totalClaimedAmount: number;
    totalFundedAmount: number;
    overview: TProjectOverview;
};
export async function getProjectDetail(projectId: string): Promise<TProjectDetail> {
    const response = (await axios.get(apiUrl.projectDetail + `/${projectId}`)).data;
    return {
        name: response?.ipfsData?.name || '',
        avatar: response?.ipfsData?.avatarImage || '',
        banner: response?.ipfsData?.coverImage || '',
        date: new Date().toLocaleDateString(),
        totalClaimedAmount: response?.totalClaimedAmount || 0,
        totalFundedAmount: response?.totalFundedAmount || 0,
        overview: {
            description: response?.ipfsData?.description || '',
            documents: response?.ipfsData?.documents || [],
            member: response?.ipfsData?.members || [],
            campaignAmount: 0,
            raisingAmount: 0,
            [KeyProjectInput.solution]: response?.ipfsData ? response?.ipfsData[KeyProjectInput.solution] || '' : '',
            [KeyProjectInput.problemStatement]: response?.ipfsData ? response?.ipfsData[KeyProjectInput.problemStatement] || '' : '',
            [KeyProjectInput.challengesAndRisks]: response?.ipfsData ? response?.ipfsData[KeyProjectInput.challengesAndRisks] || '' : '',
        },
    };
}

export type TQuestions = {
    question: string;
    hint: string;
    isRequired: boolean;
};
export type TProjectFundRaising = {
    campaignId: string;
    campaignName: string;
    fundedAmount: number;
    targetAmount: number;
    raiseInfo: {
        scope: string;
        budgetRequired: string;
        etc: string;
    }[];
    documents: TFileSaved[];
    scopeOfWorks: TScopeOfWork[];
    questions: TQuestions[];
    answers: string[];
};

export async function getFundRaisingProject(projectId: string): Promise<TProjectFundRaising[]> {
    const response = (await axios.get(apiUrl.getParticipationsByProjectId(projectId))).data;
    return response.map((item: any) => ({
        campaignId: item.campaignId + '',
        campaignName: item.campaign?.ipfsData?.name || '',
        fundedAmount: item.claimedAmount || 0,
        targetAmount:
            item.ipfsData?.scopeOfWorks?.reduce((accumulator: number, item: any) => {
                return accumulator + Number(item.raisingAmount);
            }, 0) || 0,
        raiseInfo: item.raiseInfo || [],
        documents: item.ipfsData?.documents || [],
        scopeOfWorks: item.ipfsData?.scopeOfWorks || [],
        questions: item.campaign?.ipfsData?.questions || [],
        answers: item.ipfsData?.answers || [],
    }));
}
