export function isNumeric(num: any) {
    return !isNaN(num) && !isNaN(parseFloat(num));
}

export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getKeyFundProject(addressUser: string) {
    return `invest-${addressUser}`;
}

export type TDataFundProject = Record<string, { nullifier: number; amount: number }[]>;
export function getDataFundProject(addressUser: string) {
    const data = localStorage.getItem(getKeyFundProject(addressUser));
    if (data) {
        return JSON.parse(data) as TDataFundProject;
    }
    return {} as TDataFundProject;
}

export function setDataFundProject(addressUser: string, campaignId: string, projectId: string, data: { nullifier: number; amount: number }[]) {
    let fundData = getDataFundProject(addressUser);

    const oldData = fundData[`${campaignId}-${projectId}`] || [];
    const newData = [...oldData, ...data];

    fundData[`${campaignId}-${projectId}`] = newData;
    localStorage.setItem(getKeyFundProject(addressUser), JSON.stringify(fundData));
}

export function downloadTextFile(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/plain' });

    // Creating a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Simulating a click on the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}
