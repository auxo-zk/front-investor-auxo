import { ExpandMoreRounded } from '@mui/icons-material';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { use, useEffect, useMemo, useState } from 'react';
import { IconMina, IconSpinLoading, IconUSD } from 'src/assets/svg/icon';
import NoData from 'src/components/NoData';
import { getParticipatingProjects } from 'src/services/campaign/api';
import { TProjectData } from 'src/services/project/api';
import { useModalFunction } from 'src/states/modal';
import { formatNumber } from 'src/utils/format';
import CardProject from 'src/views/common/CardProject';
import ModalConfirmInvest from './ModalConfirmInvest';
import { getTotalFunedProject } from 'src/utils';
import { useWalletData } from 'src/states/wallet';

export default function ParticipatingProjects({ campaignId, timeForFund }: { campaignId: string; timeForFund: boolean }) {
    const { openModal } = useModalFunction();
    const [listProject, setListProject] = useState<{ data: TProjectData; investInput: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { lengthInvest, totalInvest } = useMemo(() => {
        let count = 0;
        let total = 0;
        for (let item of listProject) {
            const invest = Number(item.investInput);
            if (invest) {
                if (invest >= 0.01) {
                    total += Number(item.investInput);
                    count++;
                }
            }
        }
        return {
            lengthInvest: count,
            totalInvest: total,
        };
    }, [listProject]);

    async function getListParticipatingProjects() {
        setLoading(true);
        if (campaignId) {
            try {
                const data = await getParticipatingProjects(campaignId);
                setListProject(data.map((item) => ({ data: item, investInput: '' })));
            } catch (err) {
                console.log(err);
            }
        }
        setLoading(false);
    }

    function enterInvestAmount(index: number, value: string) {
        setListProject((prev) => {
            const newData = [...prev];
            newData[index].investInput = value;
            return newData;
        });
    }

    function openModalInvest() {
        openModal({
            title: 'Confirm Funding Transaction',
            content: <ModalConfirmInvest listProject={listProject} campaignId={campaignId} />,
            modalProps: {
                maxWidth: 'xs',
            },
        });
    }

    useEffect(() => {
        getListParticipatingProjects();
    }, []);

    if (loading) {
        return (
            <Box sx={{ py: 5 }}>
                <IconSpinLoading sx={{ fontSize: '100px' }} />
            </Box>
        );
    }
    if (listProject.length == 0) {
        return <NoData text="No Project Found!" />;
    }
    return (
        <Box>
            <Typography variant="h6" mb={3}>
                Participating Projects ({listProject.length})
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, placeItems: 'center', mb: 3 }}>
                <TextField variant="outlined" color="secondary" label="Search project" name="project_name" sx={{ width: '100%', maxWidth: '305px' }} />
                <Box ml={'auto'} sx={{ display: 'flex', placeItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    {timeForFund ? (
                        <>
                            <IconUSD />
                            <Typography sx={{}}>
                                Investing{' '}
                                <Typography component={'span'} fontWeight={600} color={'secondary.main'}>
                                    {formatNumber(totalInvest, { fractionDigits: 2 })}
                                </Typography>{' '}
                                <Typography component={'span'} color={'secondary.main'}>
                                    MINA
                                </Typography>{' '}
                                in{' '}
                                <Typography component={'span'} color={'primary.light'} fontWeight={600}>
                                    {lengthInvest}
                                </Typography>{' '}
                                projects
                            </Typography>
                            <Button variant="contained" sx={{ ml: 'auto' }} disabled={lengthInvest == 0} onClick={openModalInvest}>
                                Invest
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" sx={{ ml: 'auto' }} disabled>
                            Not time for funding
                        </Button>
                    )}
                </Box>
            </Box>

            <Grid container spacing={3}>
                {listProject.map((item, index) => {
                    return (
                        <Grid key={'projectJoinedcampain' + index + item.data.idProject} item xs={12} xsm={6} md={4}>
                            <CardProjectJoinedCampain item={item} onChange={(value) => enterInvestAmount(index, value)} campaignId={campaignId} timeForFund={timeForFund} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}

function CardProjectJoinedCampain({
    item,
    onChange,
    campaignId,
    timeForFund,
}: {
    item: { data: TProjectData; investInput: string };
    onChange: (value: string) => void;
    campaignId: string;
    timeForFund: boolean;
}) {
    const { userAddress } = useWalletData();
    const invested = useMemo(() => {
        if (userAddress) {
            return getTotalFunedProject(userAddress, campaignId, item.data.idProject);
        }
        return 0;
    }, [item.data.idProject, userAddress]);
    return (
        <CardProject data={item.data}>
            <Box>
                <Box sx={{ px: 3, pb: 3 }}>
                    <Box sx={{ display: 'flex', placeItems: 'center' }}>
                        <Typography color={'text.secondary'}>Invested</Typography>
                        <Typography variant="h6" ml={'auto'} mr={1}>
                            {formatNumber(invested, { fractionDigits: 2 })}
                        </Typography>
                        <Typography variant="h6" fontWeight={400}>
                            MINA
                        </Typography>
                    </Box>
                    <TextField
                        type="number"
                        name="invest_amount"
                        label="Invest"
                        value={item.investInput}
                        onChange={(e) => onChange(e.target.value)}
                        InputProps={{ endAdornment: <IconMina /> }}
                        autoFocus={true}
                        fullWidth
                        disabled={!timeForFund}
                        error={Number(item.investInput) != 0 && Number(item.investInput) < 0.01}
                        helperText={Number(item.investInput) != 0 && Number(item.investInput) < 0.01 ? 'Minimum investment amount is 0.01 MINA' : ''}
                        sx={{ mt: 2, bgcolor: 'white', borderRadius: '10px' }}
                    />
                </Box>
            </Box>
        </CardProject>
    );
}
