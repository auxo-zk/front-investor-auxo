import { Field, Mina, PublicKey, UInt64, fetchAccount } from 'o1js';

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

// ---------------------------------------------------------------------------------------

import type { ZkApp as ZkAppPlatform } from '@auxo-dev/platform';
import { Constants, DkgLevel1Witness, NullifierArray, RandomVector, RequesterLevel1Witness, type ZkApp as ZkAppDkg } from '@auxo-dev/dkg';
import { ArgumentTypes } from 'src/global.config';
import { FileSystem } from 'src/states/cache';
import { NetworkId } from 'src/constants';
import { chainInfo } from 'src/constants/chainInfo';
import { TDataInputFund } from 'src/services/services';
import { CampaignLevel1Witness, Timeline, TimelineLevel1Witness } from '@auxo-dev/platform/build/esm/src/storages/CampaignStorage';
import { AmountVector } from '@auxo-dev/platform/build/esm/src/storages/FundingStorage';
import { CustomScalar, Utils } from '@auxo-dev/auxo-libs';
import { getRandomInt } from 'src/utils';
import { AddressWitness, ZkAppRef } from '@auxo-dev/platform/build/esm/src/storages/SharedStorage';

const state = {
    ZkAppPlatform: null as null | typeof ZkAppPlatform,
    ZkAppDkg: null as null | typeof ZkAppDkg,
    FundingRequesterContract: null as null | ZkAppDkg.Requester.RequesterContract,
    VestingRequesterContract: null as null | ZkAppDkg.Requester.RequesterContract,
    DkgContract: null as null | ZkAppDkg.DKG.DkgContract,
    RequestContract: null as null | ZkAppDkg.Request.RequestContract,
    ProjectContract: null as null | ZkAppPlatform.Project.ProjectContract,
    ParticipationContract: null as null | ZkAppPlatform.Participation.ParticipationContract,
    NullifierContract: null as null | ZkAppPlatform.Nullifier.NullifierContract,
    VestingContract: null as null | ZkAppPlatform.Vesting.VestingContract,
    TreasuryContract: null as null | ZkAppPlatform.TreasuryManager.TreasuryManagerContract,
    CampaignContract: null as null | ZkAppPlatform.Campaign.CampaignContract,
    FundingContract: null as null | ZkAppPlatform.Funding.FundingContract,
    transaction: null as null | Transaction,
    compileDone: 0 as number,
    networkId: null as null | NetworkId,
};

// ---------------------------------------------------------------------------------------

export const zkFunctions = {
    setActiveInstanceToNetwork: async (args: { chainId: NetworkId }) => {
        const networkInfo = chainInfo[args.chainId];
        const Network = Mina.Network({
            mina: networkInfo.rpcUrl,
            archive: networkInfo.archiveUrl,
        });
        console.log(`${networkInfo.name} Instance Created`);
        Mina.setActiveInstance(Network);
        state.networkId = args.chainId;
    },
    getNetworkId: async (args: {}) => {
        return state.networkId;
    },
    loadContract: async (args: {}) => {
        const [{ ZkApp: ZkAppPlatform }, { ZkApp: ZkAppDkg }] = await Promise.all([import('@auxo-dev/platform'), import('@auxo-dev/dkg')]);
        state.ZkAppPlatform = ZkAppPlatform;
        state.ZkAppDkg = ZkAppDkg;
    },
    getPercentageComplieDone: async (args: {}) => {
        return ((state.compileDone / 20) * 100).toFixed(0);
    },
    compileContract: async (args: { fileCache: any }) => {
        await state.ZkAppDkg!.Requester.UpdateTask.compile({ cache: FileSystem(args.fileCache) }); // 1
        console.log('1. compile UpdateTask done');
        state.compileDone += 1;

        await state.ZkAppDkg!.Requester.RequesterContract.compile({ cache: FileSystem(args.fileCache) }); // 2
        console.log('2. compile RequesterContract done');
        state.compileDone += 1;

        await state.ZkAppDkg!.DKG.UpdateKey.compile({ cache: FileSystem(args.fileCache) }); // 3
        console.log('3. compile UpdateKey done');
        state.compileDone += 1;

        await state.ZkAppDkg!.DKG.DkgContract.compile({ cache: FileSystem(args.fileCache) }); // 4
        console.log('4. compile DkgContract done');
        state.compileDone += 1;

        await state.ZkAppDkg!.Request.ComputeResult.compile({ cache: FileSystem(args.fileCache) }); // 5
        console.log('5. compile ComputeResult done');
        state.compileDone += 1;

        await state.ZkAppDkg!.Request.UpdateRequest.compile({ cache: FileSystem(args.fileCache) }); // 6
        console.log('6. compile UpdateRequest done');
        state.compileDone += 1;

        await state.ZkAppDkg!.Request.RequestContract.compile({ cache: FileSystem(args.fileCache) }); // 7
        console.log('7. compile RequestContract done');
        state.compileDone += 1;

        await state.ZkAppPlatform!.Project.RollupProject.compile({ cache: FileSystem(args.fileCache) }); // 8
        console.log('8. compile RollupProject done');
        state.compileDone += 1;

        await state.ZkAppPlatform!.Campaign.RollupCampaign.compile({ cache: FileSystem(args.fileCache) }); // 9
        console.log('9. compile RollupCampaign done');
        state.compileDone += 1;

        await state.ZkAppPlatform!.Participation.RollupParticipation.compile({ cache: FileSystem(args.fileCache) }); // 10
        console.log('10. compile RollupParticipation done');
        state.compileDone += 1;

        await state.ZkAppPlatform!.Funding.RollupFunding.compile({ cache: FileSystem(args.fileCache) }); // 11
        console.log('11. compile RollupFunding done');
        state.compileDone += 1;

        await state.ZkAppPlatform!.TreasuryManager.RollupTreasuryManager.compile({ cache: FileSystem(args.fileCache) }); // 12
        console.log('12. compile RollupTreasuryManager done');
        state.compileDone += 1;

        await state.ZkAppPlatform!.Project.ProjectContract.compile({ cache: FileSystem(args.fileCache) }); // 13
        console.log('13. compile ProjectContract done');
        state.compileDone += 1;

        await state.ZkAppPlatform!.Campaign.CampaignContract.compile({ cache: FileSystem(args.fileCache) }); // 14
        console.log('14. compile CampaignContract done');
        state.compileDone += 1;

        await state.ZkAppPlatform!.Participation.ParticipationContract.compile({ cache: FileSystem(args.fileCache) }); // 15
        console.log('15. compile ParticipationContract done');
        state.compileDone += 1;

        await state.ZkAppPlatform!.Funding.FundingContract.compile({ cache: FileSystem(args.fileCache) }); // 16
        console.log('16. compile FundingContract done');
        state.compileDone += 1;

        await state.ZkAppPlatform!.TreasuryManager.TreasuryManagerContract.compile({ cache: FileSystem(args.fileCache) }); // 17
        console.log('17. compile TreasuryManagerContract done');
        state.compileDone += 1;

        await state.ZkAppPlatform!.Nullifier.RollupNullifier.compile({ cache: FileSystem(args.fileCache) }); // 18
        console.log('18. compile RollupNullifier done');
        state.compileDone += 1;

        await state.ZkAppPlatform!.Nullifier.NullifierContract.compile({ cache: FileSystem(args.fileCache) }); // 19
        console.log('19. compile NullifierContract done');
        state.compileDone += 1;

        await state.ZkAppPlatform!.Vesting.VestingContract.compile({ cache: FileSystem(args.fileCache) }); // 20
        console.log('20. compile VestingContract done');
        state.compileDone += 1;
    },
    fetchAccount: async (args: { publicKey58: string }) => {
        const publicKey = PublicKey.fromBase58(args.publicKey58);
        return await fetchAccount({ publicKey });
    },

    initZkappInstance: async (args: {
        fundingRequesterContract: string;
        vestingRequesterContract: string;
        requestContract: string;
        dkgContract: string;
        projectContract: string;
        participationContract: string;
        treasuryContract: string;
        nullifierContract: string;
        vestingContract: string;
        campaignContract: string;
        fundingContract: string;
    }) => {
        const fundingRequesterContractPub = PublicKey.fromBase58(args.fundingRequesterContract);
        state.FundingRequesterContract = new state.ZkAppDkg!.Requester.RequesterContract!(fundingRequesterContractPub);

        const vestingRequesterContractPub = PublicKey.fromBase58(args.vestingRequesterContract);
        state.VestingRequesterContract = new state.ZkAppDkg!.Requester.RequesterContract!(vestingRequesterContractPub);

        const requestContractPub = PublicKey.fromBase58(args.requestContract);
        state.RequestContract = new state.ZkAppDkg!.Request.RequestContract!(requestContractPub);

        const dkgContractPub = PublicKey.fromBase58(args.dkgContract);
        state.DkgContract = new state.ZkAppDkg!.DKG.DkgContract!(dkgContractPub);

        const projectContractPub = PublicKey.fromBase58(args.projectContract);
        state.ProjectContract = new state.ZkAppPlatform!.Project.ProjectContract!(projectContractPub);

        const participationContractPub = PublicKey.fromBase58(args.participationContract);
        state.ParticipationContract = new state.ZkAppPlatform!.Participation.ParticipationContract!(participationContractPub);

        const treasuryContractPub = PublicKey.fromBase58(args.treasuryContract);
        state.TreasuryContract = new state.ZkAppPlatform!.TreasuryManager.TreasuryManagerContract!(treasuryContractPub);

        const nullifierContractPub = PublicKey.fromBase58(args.nullifierContract);
        state.NullifierContract = new state.ZkAppPlatform!.Nullifier.NullifierContract!(nullifierContractPub);

        const vestingContractPub = PublicKey.fromBase58(args.vestingContract);
        state.VestingContract = new state.ZkAppPlatform!.Vesting.VestingContract!(vestingContractPub);

        const campaignContractPub = PublicKey.fromBase58(args.campaignContract);
        state.CampaignContract = new state.ZkAppPlatform!.Campaign.CampaignContract!(campaignContractPub);

        const fundingContractPub = PublicKey.fromBase58(args.fundingContract);
        state.FundingContract = new state.ZkAppPlatform!.Funding.FundingContract!(fundingContractPub);
    },

    investProjects: async (args: { sender: string; campaignId: string; funds: { projectId: string; index: number; amount: number; nullifier: number }[]; dataBackend: TDataInputFund }) => {
        const sender = PublicKey.fromBase58(args.sender);
        await fetchAccount({ publicKey: sender });
        await fetchAccount({ publicKey: state.FundingRequesterContract!.address });
        await fetchAccount({ publicKey: state.FundingContract!.address });
        await fetchAccount({ publicKey: state.DkgContract!.address });

        const dimensionIndexes = Utils.packNumberArray(
            args.funds.map((fund) => fund.index),
            8
        );
        const transaction = await Mina.transaction(sender, async () => {
            await state.FundingContract!.fund(
                new Field(args.campaignId),
                new Timeline({
                    startFunding: new UInt64(args.dataBackend.timeline.startFunding),
                    startParticipation: new UInt64(args.dataBackend.timeline.startParticipation),
                    startRequesting: new UInt64(args.dataBackend.timeline.startRequesting),
                }),
                TimelineLevel1Witness.fromJSON(args.dataBackend.timelineWitness),
                dimensionIndexes,
                new Field(args.dataBackend.projectCounter),
                CampaignLevel1Witness.fromJSON(args.dataBackend.projectCounterWitness),
                new Field(args.dataBackend.committeeId),
                new Field(args.dataBackend.keyId),
                RequesterLevel1Witness.fromJSON(args.dataBackend.keyWitnessForRequester),
                PublicKey.fromBase58(args.dataBackend.key),
                DkgLevel1Witness.fromJSON(args.dataBackend.keyWitnessForDkg),
                new AmountVector(args.funds.map((fund) => new UInt64((fund.amount * 10 ** 9) / Constants.SECRET_UNIT))),
                new RandomVector(args.funds.map((fund) => CustomScalar.fromUInt64(new UInt64(getRandomInt(2, 2 ** 64 - 1))))),
                new NullifierArray(args.funds.map((fund) => new Field(fund.nullifier))),
                AddressWitness.fromJSON(args.dataBackend.fundingContractWitness),
                ZkAppRef.fromJSON(args.dataBackend.campaignContractRef),
                ZkAppRef.fromJSON(args.dataBackend.participationContractRef),
                ZkAppRef.fromJSON(args.dataBackend.dkgContractRef),
                ZkAppRef.fromJSON(args.dataBackend.treasuryManagerContractRef),
                ZkAppRef.fromJSON(args.dataBackend.requesterContractRef)
            );
        });
        state.transaction = transaction;
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
