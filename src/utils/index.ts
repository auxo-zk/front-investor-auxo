export function isNumeric(num: any) {
    return !isNaN(num) && !isNaN(parseFloat(num));
}

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getKeyFundProject(addressUser: string, campaignId: string, projectId: string) {
    return `invest-${addressUser}-${campaignId}-${projectId}`;
}

export type TDataFundProject = { nullifier: number; amount: number }[];
export function getDataFundProject(addressUser: string, campaignId: string, projectId: string) {
    const data = localStorage.getItem(getKeyFundProject(addressUser, campaignId, projectId));
    if (data) {
        return JSON.parse(data) as TDataFundProject;
    }
    return [] as TDataFundProject;
}

export function setDataFundProject(addressUser: string, campaignId: string, projectId: string, data: TDataFundProject) {
    const oldData = getDataFundProject(addressUser, campaignId, projectId);
    const newData = [...oldData, ...data];
    localStorage.setItem(getKeyFundProject(addressUser, campaignId, projectId), JSON.stringify(newData));
}
