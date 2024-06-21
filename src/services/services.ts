import axios from 'axios';
import { apiUrl } from './url';
import { TRef, TWitness } from './type';

export type TCommitteeData = {
    id: string;
    idCommittee: string;
    name: string;
    status: 'Active' | 'Pending';
    threshold: number;
    numberOfMembers: number;
    creator: string;
    members: { publicKey: string; alias: string; lastActive: string }[];
};
export async function getListCommittees(): Promise<TCommitteeData[]> {
    const response = await axios.get(apiUrl.listCommittee);
    console.log('List committee', response.data);

    return response.data.map((item: any) => {
        return {
            id: item['_id'],
            idCommittee: (item.committeeId + '').padStart(2, '0') || '---',
            name: item.ipfsData?.name || 'Unknown',
            status: item.active ? 'Active' : 'Pending',
            threshold: item.threshold || 0,
            numberOfMembers: item.numberOfMembers || 0,
            creator: item.ipfsData?.creator || 'Unknown',
            members: item.members || [],
        };
    });
}

type RTSeverSig = {
    msg: string[];
    signature: string;
};
export async function getServerSig(): Promise<RTSeverSig> {
    const response = (await axios.get(apiUrl.serverSigNature)).data as RTSeverSig;
    return response;
}

type RTGetTokenFromSig = string;
export async function getTokenFromSig(data: {
    address: string;
    role: number;
    signature: {
        r: string;
        s: string;
    };
    serverSignature: {
        msg: string[];
        signature: string;
    };
}): Promise<RTGetTokenFromSig> {
    console.log('🚀 ~ file: services.ts:60 ~ apiUrl.getTokenFromSig:', apiUrl.getTokenFromSig);
    const response = (await axios.post(apiUrl.getTokenFromSig, data)).data as RTGetTokenFromSig;
    return response;
}

// ************************************************************************************************************************************************
export type TDataInputFund = {
    timeline: {
        startParticipation: number;
        startFunding: number;
        startRequesting: number;
    };
    timelineWitness: TWitness;
    projectCounter: number;
    projectCounterWitness: TWitness;
    committeeId: number;
    keyId: number;
    keyWitnessForRequester: TWitness;
    key: string;
    keyWitnessForDkg: TWitness;
    fundingContractWitness: TWitness;
    campaignContractRef: TRef;
    participationContractRef: TRef;
    dkgContractRef: TRef;
    treasuryManagerContractRef: TRef;
    requesterContractRef: TRef;
};
export async function getDataInputFund(campaignId: string): Promise<TDataInputFund> {
    const response = await axios.get(apiUrl.getDataInputFund(campaignId));
    return response.data;
}
