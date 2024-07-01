import { Box, Typography } from '@mui/material';
import React from 'react';
import { FontInter } from 'src/assets/fonts';
import { useProjectDetailData } from '../../state';
import { KeyProjectInput } from 'src/services/project/api';
import { formatNumber } from 'src/utils/format';
import { IconMina } from 'src/assets/svg/icon';

export default function LeftBox() {
    const { overview, totalClaimedAmount, totalFundedAmount } = useProjectDetailData();
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h6">Claimed Amount</Typography>
                    <Box sx={{ display: 'flex', placeItems: 'center', mt: 1, gap: 1 }}>
                        <IconMina sx={{ fontSize: '40px' }} />
                        <Typography variant="h2" sx={{ fontFamily: FontInter.style.fontFamily }}>
                            {formatNumber(totalClaimedAmount, { fractionDigits: 2 })}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h6">Funded Amount</Typography>
                    <Box sx={{ display: 'flex', placeItems: 'center', mt: 1, gap: 1 }}>
                        <IconMina sx={{ fontSize: '40px' }} />
                        <Typography variant="h2" fontWeight={300} color={'secondary.main'}>
                            {formatNumber(totalFundedAmount, { fractionDigits: 2 })}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Typography variant="h6" mt={6}>
                Description
            </Typography>
            <Box dangerouslySetInnerHTML={{ __html: overview.description }}></Box>

            <Box sx={{ border: '1px solid', borderColor: 'background.primary', borderRadius: '12px', p: 3, mt: 3 }}>
                <Typography variant="h4" mb={1}>
                    Problem Statement
                </Typography>
                <Box dangerouslySetInnerHTML={{ __html: overview[KeyProjectInput.problemStatement] }}></Box>
            </Box>
            <Box sx={{ border: '1px solid', borderColor: 'background.primary', borderRadius: '12px', p: 3, mt: 3 }}>
                <Typography variant="h4" mb={1}>
                    Solution
                </Typography>
                <Box dangerouslySetInnerHTML={{ __html: overview[KeyProjectInput.solution] }}></Box>
            </Box>
            <Box sx={{ border: '1px solid', borderColor: 'background.primary', borderRadius: '12px', p: 3, mt: 3 }}>
                <Typography variant="h4" mb={1}>
                    Challenges & Risks{' '}
                </Typography>
                <Box dangerouslySetInnerHTML={{ __html: overview[KeyProjectInput.challengesAndRisks] }}></Box>
            </Box>
        </Box>
    );
}
