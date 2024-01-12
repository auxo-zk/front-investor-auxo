import axios from 'axios';
import { apiUrl } from '../url';
import { LocalStorageKey } from 'src/constants';

// export type TProjectData = { name: string; date: string; desc: string };
//PROJECT LIST ************************************************************************************************************************************************
export type TProjectData = {
    name: string;
    desc: string;
    date: string;
    banner: string;
    avatar: string;
};
const getJwt = () => {
    return localStorage.getItem(LocalStorageKey.AccessToken) || '';
};

export const apiGetTopProject = '';

export async function getTopProject(): Promise<TProjectData[]> {
    const response: any[] = (await axios.get(apiUrl.getTopProject)).data;
    return response.map((item: any) => ({
        name: item.ipfsData?.name || '',
        avatar: item.avatar || '',
        banner: item.banner || '',
        desc: item.ipfsData?.description || '',
        date: new Date().toLocaleDateString(),
    }));
}

//PROJECT DETAIL ************************************************************************************************************************************************
export type TProjectOverview = {
    raisingAmount?: number;
    campaignAmount?: number;
    description: string;
    problemStatement: string;
    solution: string;
    challengesAndRisk: string;
    documents: string[];
    member: {
        name: string;
        role: string;
        link: string;
    }[];
};

export type TProjectFundRaising = {
    raisedAmount?: number;
    targetAmount?: number;
    raiseInfo: {
        scope: string;
        budgetRequired: string;
        etc: string;
    }[];
    documents: string[];
};

export type TProjectDetail = {
    name: string;
    avatar: string;
    date: string;
    overview: TProjectOverview;
    fundrasing: TProjectFundRaising;
};
export async function getProjectDetail(projectId: string): Promise<TProjectDetail> {
    const response = (await axios.get(apiUrl.projectDetail + `/${projectId}`)).data;
    return {
        name: response.ipfsData.name,
        avatar: '',
        date: new Date().toLocaleDateString(),
        fundrasing: {
            raisedAmount: 0,
            targetAmount: 0,
            raiseInfo: [
                {
                    budgetRequired: '30.000 MINA',
                    etc: new Date().toLocaleDateString(),
                    scope: '1',
                },
                {
                    budgetRequired: '30.000 MINA',
                    etc: new Date().toLocaleDateString(),
                    scope: '2',
                },
                {
                    budgetRequired: '30.000 MINA',
                    etc: new Date().toLocaleDateString(),
                    scope: '3',
                },
            ],
            documents: [],
        },
        overview: {
            description: response.ipfsData.description,
            documents: [],
            member: response.ipfsData.members,
            problemStatement: response.ipfsData.problemStatement,
            campaignAmount: 0,
            raisingAmount: 0,
            challengesAndRisk: response.ipfsData.challengesAndRisks,
            solution: response.ipfsData.solution,
        },
    };
}

//PROJECT EDIT ******************************************************************************************************************************************
export type MemberDataType = {
    profileName: string;
    role: string;
    socialLink: string;
};
export type TEditProjectData = {
    draftId?: string;
    name: string;
    banner: string;
    publicKey: string;
    overViewDescription: string;
    problemStatement: string;
    solution: string;
    challengeAndRisk: string;
    customSections: {
        [key: string]: {
            title: string;
            description?: string;
        };
    };
    teamMember?: {
        [id: string]: MemberDataType;
    };
    additionalDocument?: any;
};

export async function saveProject(address: string, project: TEditProjectData) {
    if (!project.draftId || !address) {
        return;
    }
    const jwt = getJwt();
    await axios.post(
        apiUrl.saveProject + `${address}/drafts/${project.draftId}`,
        {
            address: address,
            name: project.name,
            publicKey: project.publicKey,
            description: project.overViewDescription,
            problemStatement: project.problemStatement,
            solution: project.solution,
            challengeAndRisks: project.challengeAndRisk,
            members: project.teamMember,
            documents: [],
        },
        {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }
    );
    return { success: true };
}

export async function createProject(address: string, project: TEditProjectData) {
    if (!address) {
        return;
    }
    const jwt = getJwt();
    await axios.post(
        apiUrl.saveProject + `/drafts`,
        {
            address: address,
            name: project.name,
            publicKey: project.publicKey,
            description: project.overViewDescription,
            problemStatement: project.problemStatement,
            solution: project.solution,
            challengeAndRisks: project.challengeAndRisk,
            members: Object.values(project.teamMember || {}),
            documents: [],
        },
        {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }
    );
    return { success: true };
}

export type ProjectMetaData = {
    name: string;
    avatar: string;
    banner: string;
    type: 'project' | 'draft';
    overviewDesc: string;
};
export async function getDraftProject(): Promise<ProjectMetaData[]> {
    const response: any[] = (await axios.get(apiUrl.getDraft, { headers: { Authorization: `Bearer ${getJwt()}` } })).data || [];
    return response.map((item) => ({
        name: item.name,
        avatar: item.avatar || '',
        banner: item.nammer || '',
        type: 'draft',
        overviewDesc: item.description,
    }));
}
export async function getUserProject(address: string): Promise<ProjectMetaData[]> {
    const response: any[] = (await axios.get(apiUrl.getProject + `/${address}/projects`, { headers: { Authorization: `Bearer ${getJwt()}` } })).data || [];
    return response.map((item) => ({
        name: item.name,
        avatar: item.avatar || '',
        banner: item.nammer || '',
        type: 'draft',
        overviewDesc: item.description,
    }));
}
