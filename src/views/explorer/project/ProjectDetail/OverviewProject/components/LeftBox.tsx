import { Box, Typography } from '@mui/material';
import React from 'react';
import { FontInter } from 'src/assets/fonts';
import { useProjectDetailData } from '../../state';

export default function LeftBox() {
    const { overview } = useProjectDetailData();
    return (
        <Box sx={{ width: '100%' }}>
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h6">Raising Amount</Typography>
                    <Typography variant="h1" sx={{ fontFamily: FontInter.style.fontFamily, mt: 1 }}>
                        {overview.raisingAmount}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h6">Campaign Amount</Typography>
                    <Box sx={{ display: 'flex', placeItems: 'end', mt: 1 }}>
                        <Typography variant="h1" fontWeight={300} color={'secondary.main'}>
                            7
                        </Typography>
                        <Typography variant="h4" fontWeight={300} color={'secondary.main'}>
                            /13
                        </Typography>
                    </Box>
                </Box>
            </Box> */}

            <Typography variant="h6">Description</Typography>
            <Typography>{overview.description}</Typography>

            <Box sx={{ border: '1px solid', borderColor: 'background.primary', borderRadius: '12px', p: 3, mt: 3 }}>
                <Typography variant="h4" mb={1}>
                    Problem Statement
                </Typography>
                <Typography>{overview.problemStatement}</Typography>
            </Box>
            <Box sx={{ border: '1px solid', borderColor: 'background.primary', borderRadius: '12px', p: 3, mt: 3 }}>
                <Typography variant="h4" mb={1}>
                    Solution
                </Typography>
                <Typography>{overview.solution}</Typography>
            </Box>
            <Box sx={{ border: '1px solid', borderColor: 'background.primary', borderRadius: '12px', p: 3, mt: 3 }}>
                <Typography variant="h4" mb={1}>
                    Challenges & Risks{' '}
                </Typography>
                <Typography>{overview.challengesAndRisk}</Typography>
            </Box>
        </Box>
    );
}
