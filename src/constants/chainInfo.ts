import { NetworkId } from '.';

export type ChainInfo = {
    id: NetworkId;
    name: string;
    rpcUrl: string;
    archiveUrl: string;
    explorerUrl: string;
};

export const AuxoDevNetInfo: ChainInfo = {
    id: NetworkId.AuxoDevNet,
    name: 'Auxo Dev Network',
    rpcUrl: 'https://explorer-dev.auxo.fund/graphql',
    archiveUrl: 'https://explorer-dev.auxo.fund/archive',
    explorerUrl: 'https://explorer.auxo.fund',
};

export const BerkeleyInfo: ChainInfo = {
    id: NetworkId.Berkeley,
    name: 'Berkeley',
    rpcUrl: 'https://minaexplorer.com/graphql',
    archiveUrl: 'https://minaexplorer.com/archive',
    explorerUrl: 'https://minaexplorer.com',
};

export const MainnetInfo: ChainInfo = {
    id: NetworkId.Mainnet,
    name: 'Mainnet',
    rpcUrl: 'https://graphql.minaexplorer.com/',
    archiveUrl: 'https://archive.minaexplorer.com/',
    explorerUrl: 'https://minaexplorer.com',
};

export const AuxoNetworkInfo: ChainInfo = {
    id: NetworkId.AuxoNetwork,
    name: 'Auxo Network',
    rpcUrl: 'https://explorer.auxo.dev/graphql',
    archiveUrl: 'https://explorer.auxo.dev/archive',
    explorerUrl: 'https://explorer.auxo.fund/',
};

export const chainInfo = {
    [NetworkId.AuxoDevNet]: AuxoDevNetInfo,
    [NetworkId.Berkeley]: BerkeleyInfo,
    [NetworkId.Mainnet]: MainnetInfo,
    [NetworkId.AuxoNetwork]: AuxoNetworkInfo,
};
