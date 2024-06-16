import { ImageRounded, InsertDriveFile } from '@mui/icons-material';
import { SvgComponent } from 'src/assets/svg/icon';

export enum LocalStorageKey {
    'IsConnected' = 'isConnected',
    'AccessToken' = 'accessToken',
}

export enum LocalStorageValue {
    'IsConnectedYes' = 'yes',
    'IsConnectedNo' = 'no',
}

export const fileIcon: { [k: string]: SvgComponent } = {
    'image/jpeg': ImageRounded,
    'image/webp': ImageRounded,
    'image/png': ImageRounded,
    'image/svg': ImageRounded,
    unknown: InsertDriveFile,
};

export enum NetworkId {
    'Berkeley' = 'Berkeley',
    'AuxoNetwork' = 'AuxoNetwork',
    'Mainnet' = 'Mainnet',
    'AuxoDevNet' = 'AuxoDevNetwork',
}

export const fundingOption = ['Private Grant', 'Public Funding', 'Unknow'];
