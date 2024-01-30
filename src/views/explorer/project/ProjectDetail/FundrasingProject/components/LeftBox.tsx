import { Avatar, Box, Grid, MenuItem, Select, Typography } from '@mui/material';
import React from 'react';
import CustomAccordion from 'src/components/CustomAccordion/CustomAccordion';
import { formatDate, formatNumber } from 'src/utils/format';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useProjectDetailData } from '../../state';
import { IconMina } from 'src/assets/svg/icon';

export default function LeftBox() {
    const { fundrasing } = useProjectDetailData();

    return (
        <Box>
            <Select color="secondary" fullWidth sx={{ mb: 4 }}>
                <MenuItem value="Mina Hackathon">
                    <Typography>Mina Hackathon</Typography>
                </MenuItem>
                <MenuItem value="Mina Hackathon2">
                    <Typography>Mina Hackathon 2</Typography>
                </MenuItem>
                <MenuItem value="Mina Hackathon3">
                    <Typography>Mina Hackathon 3</Typography>
                </MenuItem>
                <MenuItem value="Mina Hackathon4">
                    <Typography>Mina Hackathon 4</Typography>
                </MenuItem>
            </Select>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant="h6">Raised Amount</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', my: 2 }}>
                        <Avatar src="" alt="" sx={{ width: '36px', height: '36px', p: 0 }}>
                            <IconMina sx={{ fontSize: '2.5rem' }} />
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                            <Typography variant="h4" color={'text.secondary'}>
                                {formatNumber(fundrasing.raisedAmount || 123456789)}
                            </Typography>
                            <Typography variant="body2">$336.578.854</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6">Taget Amount</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', my: 2 }}>
                        <Avatar src="" alt="" sx={{ width: '36px', height: '36px', p: 0 }}>
                            <IconMina sx={{ fontSize: '2.5rem' }} />
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                            <Typography variant="h4" color={'text.secondary'}>
                                {formatNumber(fundrasing.targetAmount || 123456789)}
                            </Typography>
                            <Typography variant="body2">$336.578.854</Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ width: '100%', backgroundColor: '#FFF8F6', borderRadius: 2, overflow: 'hidden', mb: 7 }}>
                <Box sx={{ backgroundColor: 'secondary.light', p: 2, my: 0 }}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Typography variant="body2">Scope</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2">Budget Required</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body2">ETC</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ m: 0, p: 2 }}>
                    {fundrasing?.raiseInfo?.map((item, index) => {
                        return (
                            <Grid key={index} container sx={{ my: 2 }}>
                                <Grid item xs={4}>
                                    <Typography variant="body1">{item.scope}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1" fontWeight={600}>
                                        {item.budgetRequired}
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant="body1" fontWeight={300}>
                                        {item.etc ? formatDate(item.etc, 'dd MMM yyyy') : 'Not specific'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        );
                    })}
                </Box>
            </Box>
            <Box sx={{ my: 1 }}>
                <CustomAccordion
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
            </Box>
            <Box sx={{ my: 1 }}>
                <CustomAccordion
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
            </Box>{' '}
            <Box sx={{ my: 1 }}>
                <CustomAccordion
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
            </Box>{' '}
            <Box sx={{ my: 1 }}>
                <CustomAccordion
                    title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod?"
                    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.  Laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                />
            </Box>
        </Box>
    );
}
