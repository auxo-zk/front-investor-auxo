import { atom, useAtomValue, useSetAtom } from 'jotai';
import { Cache } from 'o1js';
import { useEffect } from 'react';

export const FileSystem = (files: any): Cache => ({
    read({ persistentId, uniqueId, dataType }: any) {
        // read current uniqueId, return data if it matches
        if (!files[persistentId]) {
            console.log('=========================================================================');
            console.log('read null file persistentId =>', { persistentId, uniqueId, dataType });
            return undefined;
        }

        const currentId = files[persistentId].header;

        if (currentId !== uniqueId) {
            console.log('=========================================================================');
            console.log('current id did not match persistent id =>', currentId);
            return undefined;
        }

        if (dataType === 'string') {
            return new TextEncoder().encode(files[persistentId].data);
        }

        return undefined;
    },
    write({ persistentId, uniqueId, dataType }: any, data: any) {
        console.log('write =>', { persistentId, uniqueId, dataType });
    },
    canWrite: true,
});

const cacheContractFile = [
    { name: 'lagrange-basis-fp-1024', type: 'string' },
    { name: 'lagrange-basis-fp-16384', type: 'string' },
    { name: 'lagrange-basis-fp-2048', type: 'string' },
    { name: 'lagrange-basis-fp-32768', type: 'string' },
    { name: 'lagrange-basis-fp-4096', type: 'string' },
    { name: 'lagrange-basis-fp-512', type: 'string' },
    { name: 'lagrange-basis-fp-8192', type: 'string' },
    { name: 'lagrange-basis-fq-16384', type: 'string' },
    { name: 'lagrange-basis-fq-8192', type: 'string' },
    { name: 'srs-fp-65536', type: 'string' },
    { name: 'srs-fq-32768', type: 'string' },
    { name: 'step-vk-batchdecryption-decrypt', type: 'string' },
    { name: 'step-vk-campaigncontract-createcampaign', type: 'string' },
    { name: 'step-vk-campaigncontract-rollup', type: 'string' },
    { name: 'step-vk-commitmentcontract-commit', type: 'string' },
    { name: 'step-vk-commitmentcontract-rollup', type: 'string' },
    { name: 'step-vk-computeresponse-compute', type: 'string' },
    { name: 'step-vk-computeresponse-init', type: 'string' },
    { name: 'step-vk-computeresult-compute', type: 'string' },
    { name: 'step-vk-computeresult-init', type: 'string' },
    { name: 'step-vk-dkgcontract-committeeaction', type: 'string' },
    { name: 'step-vk-dkgcontract-finalizecontributionround', type: 'string' },
    { name: 'step-vk-dkgcontract-update', type: 'string' },
    { name: 'step-vk-finalizeresponse-compute', type: 'string' },
    { name: 'step-vk-finalizeresponse-contribute', type: 'string' },
    { name: 'step-vk-finalizeresponse-finalize', type: 'string' },
    { name: 'step-vk-finalizeresponse-init', type: 'string' },
    { name: 'step-vk-fundingcontract-fund', type: 'string' },
    { name: 'step-vk-fundingcontract-refund', type: 'string' },
    { name: 'step-vk-fundingcontract-rollup', type: 'string' },
    { name: 'step-vk-participationcontract-participatecampaign', type: 'string' },
    { name: 'step-vk-participationcontract-rollup', type: 'string' },
    { name: 'step-vk-projectcontract-createproject', type: 'string' },
    { name: 'step-vk-projectcontract-createprojectwithvesting', type: 'string' },
    { name: 'step-vk-projectcontract-rollup', type: 'string' },
    { name: 'step-vk-projectcontract-updateproject', type: 'string' },
    { name: 'step-vk-requestcontract-claimfee', type: 'string' },
    { name: 'step-vk-requestcontract-initialize', type: 'string' },
    { name: 'step-vk-requestcontract-refund', type: 'string' },
    { name: 'step-vk-requestcontract-resolve', type: 'string' },
    { name: 'step-vk-requestcontract-update', type: 'string' },
    { name: 'step-vk-requestercontract-createtask', type: 'string' },
    { name: 'step-vk-requestercontract-finalizetask', type: 'string' },
    { name: 'step-vk-requestercontract-submitencryption', type: 'string' },
    { name: 'step-vk-requestercontract-updatetasks', type: 'string' },
    { name: 'step-vk-responsecontract-contribute', type: 'string' },
    { name: 'step-vk-responsecontract-finalize', type: 'string' },
    { name: 'step-vk-rollupcampaign-createcampaignstep', type: 'string' },
    { name: 'step-vk-rollupcampaign-firststep', type: 'string' },
    { name: 'step-vk-rollupcommitment-commit', type: 'string' },
    { name: 'step-vk-rollupcommitment-firststep', type: 'string' },
    { name: 'step-vk-rollupfunding-firststep', type: 'string' },
    { name: 'step-vk-rollupfunding-fundstep', type: 'string' },
    { name: 'step-vk-rollupfunding-refundstep', type: 'string' },
    { name: 'step-vk-rollupparticipation-firststep', type: 'string' },
    { name: 'step-vk-rollupparticipation-participatecampaignstep', type: 'string' },
    { name: 'step-vk-rollupproject-createprojectstep', type: 'string' },
    { name: 'step-vk-rollupproject-firststep', type: 'string' },
    { name: 'step-vk-rollupproject-updateprojectstep', type: 'string' },
    { name: 'step-vk-rolluptreasurymanager-abortcampaignstep', type: 'string' },
    { name: 'step-vk-rolluptreasurymanager-claimfundstep', type: 'string' },
    { name: 'step-vk-rolluptreasurymanager-completecampaignstep', type: 'string' },
    { name: 'step-vk-rolluptreasurymanager-firststep', type: 'string' },
    { name: 'step-vk-treasurymanagercontract-abortcampaign', type: 'string' },
    { name: 'step-vk-treasurymanagercontract-claimfund', type: 'string' },
    { name: 'step-vk-treasurymanagercontract-completecampaign', type: 'string' },
    { name: 'step-vk-treasurymanagercontract-refund', type: 'string' },
    { name: 'step-vk-treasurymanagercontract-rollup', type: 'string' },
    { name: 'step-vk-updatekey-generate', type: 'string' },
    { name: 'step-vk-updatekey-init', type: 'string' },
    { name: 'step-vk-updatekey-update', type: 'string' },
    { name: 'step-vk-updaterequest-init', type: 'string' },
    { name: 'step-vk-updaterequest-initialize', type: 'string' },
    { name: 'step-vk-updaterequest-resolve', type: 'string' },
    { name: 'step-vk-updatetask-accumulate', type: 'string' },
    { name: 'step-vk-updatetask-create', type: 'string' },
    { name: 'step-vk-updatetask-init', type: 'string' },
    { name: 'step-vk-vestingcontract-claimmilestonefund', type: 'string' },
    { name: 'step-vk-vestingcontract-createvestingrequest', type: 'string' },
    { name: 'step-vk-vestingcontract-vote', type: 'string' },
    { name: 'wrap-vk-batchdecryption', type: 'string' },
    { name: 'wrap-vk-campaigncontract', type: 'string' },
    { name: 'wrap-vk-commitmentcontract', type: 'string' },
    { name: 'wrap-vk-computeresponse', type: 'string' },
    { name: 'wrap-vk-computeresult', type: 'string' },
    { name: 'wrap-vk-dkgcontract', type: 'string' },
    { name: 'wrap-vk-finalizeresponse', type: 'string' },
    { name: 'wrap-vk-fundingcontract', type: 'string' },
    { name: 'wrap-vk-participationcontract', type: 'string' },
    { name: 'wrap-vk-projectcontract', type: 'string' },
    { name: 'wrap-vk-requestcontract', type: 'string' },
    { name: 'wrap-vk-requestercontract', type: 'string' },
    { name: 'wrap-vk-responsecontract', type: 'string' },
    { name: 'wrap-vk-rollupcampaign', type: 'string' },
    { name: 'wrap-vk-rollupcommitment', type: 'string' },
    { name: 'wrap-vk-rollupfunding', type: 'string' },
    { name: 'wrap-vk-rollupparticipation', type: 'string' },
    { name: 'wrap-vk-rollupproject', type: 'string' },
    { name: 'wrap-vk-rolluptreasurymanager', type: 'string' },
    { name: 'wrap-vk-treasurymanagercontract', type: 'string' },
    { name: 'wrap-vk-updatekey', type: 'string' },
    { name: 'wrap-vk-updaterequest', type: 'string' },
    { name: 'wrap-vk-updatetask', type: 'string' },
    { name: 'wrap-vk-vestingcontract', type: 'string' },
];

function fetchFiles(files: { name: string; type: string }[]) {
    return Promise.all(
        files.map((file) => {
            return Promise.all([
                fetch(`https://storage.googleapis.com/platform-caches/${file.name}.header`).then((res) => res.text()),
                fetch(`https://storage.googleapis.com/platform-caches/${file.name}`).then((res) => res.text()),
            ]).then(([header, data]) => ({
                file,
                header,
                data,
            }));
        })
    ).then((cacheList) =>
        cacheList.reduce((acc: any, { file, header, data }) => {
            acc[file.name] = { file, header, data };

            return acc;
        }, {})
    );
}

export type TCacheData = {
    isFetching: boolean;
    filesCache: any;
};
const initData: TCacheData = {
    isFetching: true,
    filesCache: null,
};

const cacheContract = atom<TCacheData>(initData);

export const useCacheContractData = () => useAtomValue(cacheContract);

export const useCacheContractFunction = () => {
    const _setCacheContractData = useSetAtom(cacheContract);

    function setCacheContractData(data: Partial<TCacheData>) {
        _setCacheContractData((prev) => {
            return { ...prev, ...data };
        });
    }

    async function fetchFileCache() {
        setCacheContractData({ isFetching: true });
        try {
            console.log('Fetching file cache....');
            const files = await fetchFiles(cacheContractFile);
            console.log('Fetch file cache done', files);
            setCacheContractData({ filesCache: files, isFetching: false });
        } catch (err) {
            console.log(err);
            setCacheContractData({ filesCache: null, isFetching: false });
        }
    }
    return {
        fetchFileCache,
    };
};

export function InitCache() {
    const { fetchFileCache } = useCacheContractFunction();
    useEffect(() => {
        fetchFileCache();
    }, []);
    return <></>;
}
