import { atom, useAtomValue, useSetAtom } from 'jotai';
import { PublicKey, fetchAccount } from 'o1js';
import { useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { LocalStorageKey, LocalStorageValue } from 'src/constants';
import { verifyJwt } from 'src/services/profile/api';
import { getServerSig, getTokenFromSig } from 'src/services/services';

export type TWalletData = {
    userAddress: string;
    isConnecting: boolean;
    loadingZkClient: boolean;
    logged: boolean;
};
const initData: TWalletData = {
    userAddress: '',
    isConnecting: false,
    loadingZkClient: true,
    logged: false,
};

const wallet = atom<TWalletData>(initData);

export const useWalletData = () => useAtomValue(wallet);
export const useWalletFunction = () => {
    const _setWalletData = useSetAtom(wallet);
    const walletData = useAtomValue(wallet);

    function setWalletData(data: Partial<TWalletData>) {
        _setWalletData((prev) => {
            return { ...prev, ...data };
        });
    }

    async function connectWallet() {
        setWalletData({ isConnecting: true });
        try {
            const mina = (window as any).mina;
            if (mina == null) {
                throw Error('You have to install Auro wallet first!');
            }

            const address: string = (await mina.requestAccounts())[0];

            setWalletData({ userAddress: address, isConnecting: false, logged: false });
            localStorage.setItem(LocalStorageKey.IsConnected, LocalStorageValue.IsConnectedYes);
            if (!localStorage.getItem(LocalStorageKey.AccessToken)) {
                await login(address);
            }
        } catch (err) {
            console.log(err);
            toast((err as Error).message, { type: 'error', position: 'top-center', theme: 'dark' });

            setWalletData({
                userAddress: '',
                isConnecting: false,
                logged: false,
            });
            localStorage.setItem(LocalStorageKey.IsConnected, LocalStorageValue.IsConnectedNo);
        }
    }

    async function updateLoginStatus() {
        if (localStorage.getItem(LocalStorageKey.AccessToken)) {
            setWalletData({ logged: true });
        } else {
            setWalletData({ logged: false });
        }
    }

    async function disconnectWallet() {
        setWalletData(initData);
        localStorage.setItem(LocalStorageKey.IsConnected, LocalStorageValue.IsConnectedNo);
        localStorage.removeItem(LocalStorageKey.AccessToken);
        setWalletData({ logged: false });
    }

    async function logout() {
        await disconnectWallet();
        localStorage.removeItem(LocalStorageKey.AccessToken);
        setWalletData({ logged: false });
    }

    async function login(walletAddress: string = '') {
        try {
            const message = await getServerSig();
            const sig = await signMessage(JSON.stringify(message));
            console.log('🚀 ~ file: wallet.tsx:97 ~ login ~ sig:', sig);
            if (sig) {
                const token = await getTokenFromSig({
                    address: walletAddress || walletData.userAddress,
                    role: 2,
                    serverSignature: message,
                    signature: {
                        r: sig.signature.field,
                        s: sig.signature.scalar,
                    },
                });
                localStorage.setItem(LocalStorageKey.AccessToken, token);
                setWalletData({ logged: true });
                toast('Login Success', { type: 'success' });
            }
        } catch (error) {
            toast((error as Error).message, { type: 'error' });
        }
    }

    async function signMessage(content: string) {
        try {
            const signature = await window.mina?.signMessage({ message: content });
            return signature;
        } catch (error) {
            console.log('🚀 ~ file: wallet.tsx:100 ~ signMessage ~ error:', error);
        }
    }

    async function checkJwt() {
        if (!localStorage.getItem(LocalStorageKey.AccessToken)) {
            // logout();
        } else {
            try {
                const res = await verifyJwt();
            } catch (error) {
                logout();
                toast('Token invalid or expired, please login again', { type: 'error' });
            }
        }
    }
    return {
        setWalletData,
        connectWallet,
        disconnectWallet,
        logout,
        login,
        updateLoginStatus,
        signMessage,
        checkJwt,
    };
};

export function InitWalletData() {
    const { connectWallet, updateLoginStatus, checkJwt } = useWalletFunction();
    const { userAddress, logged } = useWalletData();
    useEffect(() => {
        async function fetch() {
            if (localStorage.getItem(LocalStorageKey.IsConnected) == LocalStorageValue.IsConnectedYes) {
                await connectWallet();
            }
            await updateLoginStatus();
        }
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (userAddress) {
            window.mina?.on('accountsChanged', (accounts: string[]) => {
                localStorage.removeItem(LocalStorageKey.AccessToken);
                connectWallet();
            });
            return () => {
                window.mina?.on('accountsChanged', (accounts: string[]) => {});
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userAddress]);

    useEffect(() => {
        if (logged) {
            checkJwt();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [logged]);

    return null;
}

export const useWalletConnected = () => {
    const walletData = useWalletData();
    const isLogIn: Boolean = useMemo(() => {
        if (localStorage.getItem(LocalStorageKey.AccessToken) && walletData.userAddress) {
            return true;
        }
        return false;
    }, [walletData.userAddress]);
    return isLogIn;
};
