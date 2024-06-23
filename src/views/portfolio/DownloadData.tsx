import { FileDownloadOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import { useWalletData } from 'src/states/wallet';
import { downloadTextFile, getDataFundProject, getKeyFundProject } from 'src/utils';

export default function DownloadData() {
    const { userAddress } = useWalletData();
    function downloadData() {
        if (userAddress) {
            const key = getKeyFundProject(userAddress);
            const value = getDataFundProject(userAddress);
            downloadTextFile(JSON.stringify({ key, value }), `${key}.txt`);
        } else {
            toast.error('Please connect your wallet first!');
        }
    }
    return (
        <Button onClick={downloadData} variant="outlined" startIcon={<FileDownloadOutlined />}>
            Download
        </Button>
    );
}
