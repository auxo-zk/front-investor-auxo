import { Mina, PublicKey, fetchAccount } from 'o1js';

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { ZkApp as ZkAppPlatform } from '@auxo-dev/platform';
import type { ZkApp as ZkAppDkg } from '@auxo-dev/dkg';
import { ArgumentTypes } from 'src/global.config';
import { FileSystem } from 'src/states/cache';

const state = {
    ZkAppPlatform: null as null | typeof ZkAppPlatform,
    ZkAppDkg: null as null | typeof ZkAppDkg,
    RequestContract: null as null | ZkAppDkg.Request.RequestContract,
    FundingContract: null as null | ZkAppPlatform.Funding.FundingContract,
    transaction: null as null | Transaction,
    complieDone: 0 as number,
};

// ---------------------------------------------------------------------------------------

export const zkFunctions = {
    setActiveInstanceToBerkeley: async (args: {}) => {
        const Berkeley = Mina.Network('https://proxy.berkeley.minaexplorer.com/graphql');
        console.log('Berkeley Instance Created');
        Mina.setActiveInstance(Berkeley);
    },
    loadContract: async (args: {}) => {
        const [{ ZkApp: ZkAppPlatform }, { ZkApp: ZkAppDkg }] = await Promise.all([import('@auxo-dev/platform'), import('@auxo-dev/dkg')]);
        state.ZkAppPlatform = ZkAppPlatform;
        state.ZkAppDkg = ZkAppDkg;
    },
    getPercentageComplieDone: async (args: {}) => {
        return ((state.complieDone / 5) * 100).toFixed(0);
    },
    compileContract: async (args: { fileCache: any }) => {
        await state.ZkAppDkg!.Request.CreateRequest.compile({ cache: FileSystem(args.fileCache) }); // 1
        console.log('complie CreateRequest done');
        state.complieDone += 1;

        await state.ZkAppDkg!.Request.RequestContract.compile({ cache: FileSystem(args.fileCache) }); // 2
        console.log('complie RequestContract done');
        state.complieDone += 1;

        await state.ZkAppPlatform!.Funding.CreateReduceProof.compile({ cache: FileSystem(args.fileCache) }); // 3
        console.log('complie CreateReduceProof done');
        state.complieDone += 1;

        await state.ZkAppPlatform!.Funding.CreateRollupProof.compile({ cache: FileSystem(args.fileCache) }); // 4
        console.log('complie CreateRollupProof done');
        state.complieDone += 1;

        await state.ZkAppPlatform!.Funding.FundingContract.compile({ cache: FileSystem(args.fileCache) }); // 5
        console.log('complie FundingContract done');
        state.complieDone += 1;
    },
    fetchAccount: async (args: { publicKey58: string }) => {
        const publicKey = PublicKey.fromBase58(args.publicKey58);
        return await fetchAccount({ publicKey });
    },

    initZkappInstance: async (args: { fundingContract: string; requestContract: string }) => {
        const fundingContractPub = PublicKey.fromBase58(args.fundingContract);
        state.FundingContract = new state.ZkAppPlatform!.Funding.FundingContract!(fundingContractPub);

        const requestContractPub = PublicKey.fromBase58(args.requestContract);
        state.RequestContract = new state.ZkAppDkg!.Request.RequestContract!(requestContractPub);
    },

    proveTransaction: async (args: {}) => {
        await state.transaction!.prove();
    },
    getTransactionJSON: async (args: {}) => {
        return state.transaction!.toJSON();
    },
};

export type TZkFuction = keyof typeof zkFunctions;
// ---------------------------------------------------------------------------------------
export type ArgumentZkFuction<NameFunction extends TZkFuction> = ArgumentTypes<(typeof zkFunctions)[NameFunction]>['0'];
export type ReturenValueZkFunction<NameFunction extends TZkFuction> = ReturnType<(typeof zkFunctions)[NameFunction]>;

// export type TCallEvent<NameFunction extends TZkFuction> = (fn: NameFunction, args: ArgumentTypes<(typeof zkFunctions)[NameFunction]>['0']) => ReturnType<(typeof zkFunctions)[NameFunction]>;
