import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import TableCell from 'src/components/Table/TableCell';
import TableRow from 'src/components/Table/TableRow';
import { TCampaignDetail, getCampaignOverview } from 'src/services/campaign/api';
import { TProjectDetail, getProjectDetail } from 'src/services/project/api';

export default function TableRowFund({ campaignId, projectId, funded, tableCellRatio }: { campaignId: string; projectId: string; funded: number; tableCellRatio: number[] }) {
    const [projectData, setProjectData] = React.useState<TProjectDetail | null>();
    const [campaignData, setCampaignData] = React.useState<TCampaignDetail | null>();

    useEffect(() => {
        (async () => {
            try {
                const campaign = await getCampaignOverview(campaignId);
                setCampaignData(campaign);
            } catch (error) {
                setCampaignData(null);
            }
        })();
    }, [campaignId]);

    useEffect(() => {
        (async () => {
            try {
                const project = await getProjectDetail(projectId);
                setProjectData(project);
            } catch (error) {
                setProjectData(null);
            }
        })();
    });
    return (
        <TableRow sx={{ minWidth: '900px' }}>
            <TableCell xs={tableCellRatio[0]}>
                <Typography>{campaignData?.name || `ID: ${campaignId}`}</Typography>
            </TableCell>
            <TableCell xs={tableCellRatio[1]}>
                <Typography>{campaignData?.overview?.organizer?.name || `Unknow name`}</Typography>
            </TableCell>
            <TableCell xs={tableCellRatio[2]}>
                <Typography>{projectData?.name || `ID ${projectId}`}</Typography>
            </TableCell>
            <TableCell xs={tableCellRatio[3]}>
                <Typography color={'primary.main'} fontWeight={600}>
                    {/* {investData[idFund].map((item) => item.amount).reduce((a, b) => a + b, 0)} MINA */}
                    {funded} MINA
                </Typography>
            </TableCell>
        </TableRow>
    );
}
