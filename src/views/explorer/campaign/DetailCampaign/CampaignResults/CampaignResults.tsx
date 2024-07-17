import { OpenInNew } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IconMenuExplorer, IconSpinLoading } from 'src/assets/svg/icon';
import TableCell from 'src/components/Table/TableCell';
import TableHeader from 'src/components/Table/TableHeader';
import TableRow from 'src/components/Table/TableRow';
import TableWrapper from 'src/components/Table/TableWrapper';
import { getParticipatingProjects, TProjectFundData } from 'src/services/campaign/api';
import { formatNumber } from 'src/utils/format';

const tableCellRatio = [2, 4, 3, 3];

export default function CampaignResults({ campaignId }: { campaignId: string }) {
    const [listProject, setListProject] = useState<TProjectFundData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    async function getListParticipatingProjects() {
        setLoading(true);
        if (campaignId) {
            try {
                const data = await getParticipatingProjects(campaignId);
                setListProject(data);
            } catch (err) {
                console.log(err);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        getListParticipatingProjects();
    }, []);

    if (loading) {
        return (
            <Box pt={5}>
                <IconSpinLoading sx={{ fontSize: '100px' }} />
            </Box>
        );
    }
    return (
        <Box>
            <Box>
                <Typography variant="h5" mb={2}>
                    Participating Project
                </Typography>
                <TableWrapper>
                    <TableHeader sx={{ minWidth: '900px' }}>
                        <TableCell xs={tableCellRatio[0]}>
                            <Typography variant="body2" color={'text.secondary'}>
                                No.
                            </Typography>
                        </TableCell>
                        <TableCell xs={tableCellRatio[1]}>
                            <Typography variant="body2" color={'text.secondary'}>
                                Name
                            </Typography>
                        </TableCell>
                        <TableCell xs={tableCellRatio[2]}>
                            <Typography variant="body2" color={'text.secondary'}>
                                Funded
                            </Typography>
                        </TableCell>
                        <TableCell xs={tableCellRatio[4]}>
                            <Typography variant="body2" color={'text.secondary'}>
                                Details
                            </Typography>
                        </TableCell>
                    </TableHeader>
                    {listProject.map((item, index) => {
                        return (
                            <TableRow key={item.idProject + '-' + index} sx={{ minWidth: '900px' }}>
                                <TableCell xs={tableCellRatio[0]}>
                                    <Typography>{index}</Typography>
                                </TableCell>
                                <TableCell xs={tableCellRatio[1]}>
                                    <Typography>{item.name}</Typography>
                                </TableCell>
                                <TableCell xs={tableCellRatio[2]}>
                                    <Typography>{formatNumber(item.totalFundedAmount, { fractionDigits: 6 })} MINA</Typography>
                                </TableCell>
                                <TableCell xs={tableCellRatio[4]}>
                                    <Link href={'/explorer/projects/' + item.idProject} passHref style={{ textDecoration: 'none', color: 'unset' }}>
                                        <Typography variant="body2" color={'success'} display={'flex'} sx={{ placeItems: 'center', gap: 1 }}>
                                            Overview <OpenInNew />
                                        </Typography>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableWrapper>
            </Box>
        </Box>
    );
}
