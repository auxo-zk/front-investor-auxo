import axios from 'axios';

export type TCampaignData = { name: string; type: string; date: string; capacity: string };
export const apiLatestFundingCampaigns = '';
export async function getLatestFundingCampaigns(): Promise<TCampaignData[]> {
    // const response = await axios.get(apiGetTopProject)

    return [
        { name: 'Watcher.Guru', date: '2023/12/1', capacity: '0/40 projects', type: 'Public, Grants' },
        { name: 'Watcher.Guru', date: '2023/12/1', capacity: '0/40 projects', type: 'Public, Grants' },
    ];
}
