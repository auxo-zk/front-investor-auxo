import { SaveAltRounded } from '@mui/icons-material';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { IconFolder } from 'src/assets/svg/icon';
import { useProjectDetailData } from '../../state';

export default function RightBox() {
    const { fundrasing, selectedCampaignIndex } = useProjectDetailData();
    return (
        <Box sx={{ minWidth: '309px', zIndex: -1 }}>
            <Box sx={{ borderRadius: '12px', bgcolor: 'background.secondary', p: { xs: 2, xsm: 3 }, boxShadow: 3 }}>
                <Box sx={{ display: 'flex', placeItems: 'baseline', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Documents</Typography>
                    <Box sx={{ display: 'flex', placeItems: 'end', gap: 0.5 }}>
                        <Typography variant="body3" color={'primary.main'}>
                            Download All
                        </Typography>
                        <IconFolder fontSize="small" color={'primary'} />
                    </Box>
                </Box>

                {selectedCampaignIndex != null ? (
                    <>
                        {fundrasing[selectedCampaignIndex]?.documents.map((item, index) => {
                            return (
                                <Box
                                    key={index}
                                    component={'a'}
                                    href={item.URL}
                                    target="_blank"
                                    sx={{ textDecoration: 'none', display: 'flex', justifyContent: 'space-between', placeItems: 'center', pt: 3 }}
                                >
                                    <Typography variant="body2" color={'primary.light'}>
                                        {item.fileName}
                                    </Typography>
                                    <SaveAltRounded sx={{ color: 'primary.light', cursor: 'pointer' }} fontSize="small" />
                                </Box>
                            );
                        })}
                        {fundrasing[selectedCampaignIndex]?.documents?.length === 0 && (
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', placeItems: 'center', pt: 3 }}>
                                <Typography>No Document</Typography>
                            </Box>
                        )}
                    </>
                ) : (
                    <></>
                )}

                <Divider sx={{ mt: 3.5 }} />
            </Box>
        </Box>
    );
}
