import React from 'react';
import { InitWalletData } from './wallet';
import { InitCache } from './cache';
import { InitContracts } from './contracts/InitContracts';

export default function InitStateAll() {
    return (
        <>
            <InitWalletData />
            <InitCache />
            <InitContracts />
        </>
    );
}
