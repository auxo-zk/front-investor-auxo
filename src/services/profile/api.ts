import { url } from 'inspector';
import { apiUrl } from '../url';
import axios from 'axios';
import { getJwt } from '../project/api';

export type TProfileData = {
    address: string;
    name: string;
    role: string;
    link: string;
    description: string;
    img: string;
};

export async function getUserProfile(address: string): Promise<TProfileData> {
    const response: any = await axios.get(apiUrl.getUserProfile + `/${address}`);
    return {
        address: response.address,
        name: response.name || '',
        description: response.description || '',
        img: response.img?.URL || '',
        link: response.link || '',
        role: response.role || '',
    };
}

export async function verifyJwt() {
    const jwt = getJwt();
    await axios.get(apiUrl.checkJwt, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
    return true;
}
