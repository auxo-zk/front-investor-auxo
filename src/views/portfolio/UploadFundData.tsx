import { FileUploadOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { ChangeEvent, useRef } from 'react';
import { toast } from 'react-toastify';

export default function UploadFundData({ refetch }: { refetch: () => void }) {
    const refUploadFileBtn = useRef<HTMLInputElement>(null);

    function upload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target) {
                    const result = e.target.result;
                    console.log(result);
                    try {
                        const data = JSON.parse(result?.toString() || '{}') as { key: string; value: string };
                        localStorage.setItem(data.key, JSON.stringify(data.value));
                        toast.success('Upload and Save data done!');
                        refetch();
                        event.target.value = '';
                    } catch (e) {
                        toast.error('Data file is invalid!', { autoClose: 4000 });
                    }
                }
            };
            reader.readAsText(file);
        }
    }
    return (
        <>
            <input ref={refUploadFileBtn} type="file" onChange={upload} style={{ display: 'none' }} />
            <Button sx={{ ml: 1 }} variant="contained" onClick={() => refUploadFileBtn.current?.click()} startIcon={<FileUploadOutlined />}>
                Upload Investment Data
            </Button>
        </>
    );
}
