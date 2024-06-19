import { ExpandMoreRounded } from '@mui/icons-material';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { IconMina, IconSpinLoading, IconUSD } from 'src/assets/svg/icon';
import NoData from 'src/components/NoData';
import { getParticipatingProjects } from 'src/services/campaign/api';
import { TProjectData } from 'src/services/project/api';
import { formatNumber } from 'src/utils/format';
import CardProject from 'src/views/common/CardProject';

export default function ParticipatingProjects({ campaignId }: { campaignId: string }) {
    const [listProject, setListProject] = useState<{ data: TProjectData; investInput: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { lengthInvest, totalInvest } = useMemo(() => {
        let count = 0;
        let total = 0;
        for (let item of listProject) {
            if (Number(item.investInput)) {
                total += Number(item.investInput);
                count++;
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
                    <Button variant="contained" sx={{ ml: 'auto' }}>
                        Invest
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {listProject.map((item, index) => {
                    return (
                        <Grid key={'projectJoinedcampain' + index + item.data.idProject} item xs={12} xsm={6} md={4}>
                            <CardProjectJoinedCampain item={item} onChange={(value) => enterInvestAmount(index, value)} />
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}

function CardProjectJoinedCampain({ item, onChange }: { item: { data: TProjectData; investInput: string }; onChange: (value: string) => void }) {
    return (
        <CardProject data={item.data}>
            <Box
                sx={{
                    bgcolor: 'background.secondary',
                    '.toggleProject:checked + .btn-toggle > .icon': { transform: 'rotateX(180deg)' },
                    '.toggleProject:checked + .btn-toggle + .content-toggle': { gridTemplateRows: '1fr' },
                }}
            >
                <input className="toggleProject" type="checkbox" id={`toggle-${item.data.idProject}`} style={{ display: 'none' }} />
                <Typography
                    component={'label'}
                    htmlFor={`toggle-${item.data.idProject}`}
                    className="btn-toggle"
                    variant="body2"
                    sx={{ display: 'flex', placeItems: 'center', justifyContent: 'center', gap: 1, cursor: 'pointer', fontWeight: 600, pb: 2 }}
                >
                    Invest <ExpandMoreRounded className="icon" sx={{ transition: 'transform 0.3s' }} />
                </Typography>
                <Box className="content-toggle" sx={{ display: 'grid', gridTemplateRows: '0fr', transition: 'grid-template-rows 0.3s' }}>
                    <Box sx={{ overflow: 'hidden', boxShadow: '0px 4px 8px 0px rgba(44, 151, 143, 0.28) inset' }}>
                        <Box sx={{ px: 3, py: 2 }}>
                            <Box sx={{ display: 'flex', placeItems: 'center' }}>
                                <Typography color={'text.secondary'}>Invested</Typography>
                                <Typography variant="h6" ml={'auto'} mr={1}>
                                    1,000
                                </Typography>
                                <Typography variant="h6" fontWeight={400}>
                                    MINA
                                </Typography>
                            </Box>
                            <TextField
                                type="number"
                                name="invest_amount"
                                label="From"
                                value={item.investInput}
                                onChange={(e) => onChange(e.target.value)}
                                InputProps={{ endAdornment: <IconMina /> }}
                                autoFocus={true}
                                fullWidth
                                sx={{ mt: 2 }}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </CardProject>
    );
}
