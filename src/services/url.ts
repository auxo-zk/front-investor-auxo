import { BACKEND_BASE_URL } from './baseUrl';

export const apiUrl = {
    listCommittee: `${BACKEND_BASE_URL}/committee`,
    createCommittee: `${BACKEND_BASE_URL}/committee`,
    //signature
    serverSigNature: `${BACKEND_BASE_URL}/v0/auth`,
    getTokenFromSig: `${BACKEND_BASE_URL}/v0/auth`,
    //Project
    getTopProject: `${BACKEND_BASE_URL}/v0/projects`,
    saveProject: `${BACKEND_BASE_URL}/v0/builders`,
    createProject: `${BACKEND_BASE_URL}/v0/builders`,
    getDraft: `${BACKEND_BASE_URL}/v0/builders/drafts`,
    getProject: `${BACKEND_BASE_URL}/v0/builders`,
    checkJwt: `${BACKEND_BASE_URL}/v0/auth/profile`,
    //project detail
    projectDetail: `${BACKEND_BASE_URL}/v0/projects`,
    //profile
    getUserProfile: `${BACKEND_BASE_URL}/v0/builders`,

    //campaign
    getCampaign: `${BACKEND_BASE_URL}/v0/campaigns`,
    getCampaignAll: `${BACKEND_BASE_URL}/v0/campaigns/all`,
    campaignDetail: `${BACKEND_BASE_URL}/v0/campaigns`,
    getParticipatingProjects: (campaignId: string) => `${BACKEND_BASE_URL}/v0/campaigns/${campaignId}/projects`,

    getDataInputFund: (campaignId: string) => `${BACKEND_BASE_URL}/v0/method-inputs/funding-contract/fund?campaignId=${campaignId}`,
    getParticipationsByProjectId: (projectId: string) => `${BACKEND_BASE_URL}/v0/projects/${projectId}/participations`,
};
