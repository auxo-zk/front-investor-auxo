import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
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
    { name: 'lagrange-basis-fp-512', type: 'string' },
    { name: 'lagrange-basis-fp-65536', type: 'string' },
    { name: 'lagrange-basis-fp-8192', type: 'string' },
    { name: 'lagrange-basis-fq-16384', type: 'string' },
    { name: 'srs-fp-65536', type: 'string' },
    { name: 'srs-fq-32768', type: 'string' },
    { name: 'step-vk-create-request-firststep', type: 'string' },
    { name: 'step-vk-create-request-nextstep', type: 'string' },
    { name: 'step-vk-create-rollup-status-firststep', type: 'string' },
    { name: 'step-vk-create-rollup-status-nextstep', type: 'string' },
    { name: 'step-vk-fundingcontract-checkmvalue', type: 'string' },
    { name: 'step-vk-fundingcontract-checkrvalue', type: 'string' },
    { name: 'step-vk-fundingcontract-fund', type: 'string' },
    { name: 'step-vk-fundingcontract-reduce', type: 'string' },
    { name: 'step-vk-fundingcontract-rollupactionsstate', type: 'string' },
    { name: 'step-vk-fundingcontract-rolluprequest', type: 'string' },
    { name: 'step-vk-requestcontract-request', type: 'string' },
    { name: 'step-vk-requestcontract-resolverequest', type: 'string' },
    { name: 'step-vk-requestcontract-rolluprequest', type: 'string' },
    { name: 'step-vk-requestcontract-unrequest', type: 'string' },
    { name: 'step-vk-rollup-actions-firststep', type: 'string' },
    { name: 'step-vk-rollup-actions-nextstep', type: 'string' },
    { name: 'wrap-vk-create-request', type: 'string' },
    { name: 'wrap-vk-create-rollup-status', type: 'string' },
    { name: 'wrap-vk-fundingcontract', type: 'string' },
    { name: 'wrap-vk-requestcontract', type: 'string' },
    { name: 'wrap-vk-rollup-actions', type: 'string' },
];

function fetchFiles(files: { name: string; type: string }[]) {
    return Promise.all(
        files.map((file) => {
            return Promise.all([fetch(`/Caches/${file.name}.header`).then((res) => res.text()), fetch(`/Caches/${file.name}`).then((res) => res.text())]).then(([header, data]) => ({
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
