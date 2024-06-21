import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LeftBox from './components/LeftBox';
import RightBox from './components/RightBox';
import { IconSpinLoading } from 'src/assets/svg/icon';
import { getFundRaisingProject } from 'src/services/project/api';
import { useProjectDetailFunction } from '../state';

export default function FundRaisingProject({ projectId }: { projectId: string }) {
    const [loading, setLoading] = useState<boolean>(true);
    const { setProjectDetailData } = useProjectDetailFunction();

    useEffect(() => {
        (async () => {
            try {
                const response = await getFundRaisingProject(projectId);
                setProjectDetailData({ fundrasing: response, selectedCampaignIndex: response.length > 0 ? 0 : null });
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        })();
    }, []);

    if (loading) {
        return (
            <Box mt={3.5}>
                <IconSpinLoading sx={{ fontSize: '100px' }} />
            </Box>
        );
    }
    return (
        <Box sx={{ display: 'flex', gap: 3.5, mt: 3, position: 'relative', zIndex: 0 }}>
            <LeftBox />
            <RightBox />
        </Box>
    );
}
