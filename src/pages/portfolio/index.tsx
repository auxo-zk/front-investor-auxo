import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import BoxPrivateData from 'src/components/BoxPrivateData/BoxPrivateData';
import TableCell from 'src/components/Table/TableCell';
import TableHeader from 'src/components/Table/TableHeader';
import TableRow from 'src/components/Table/TableRow';
import TableWrapper from 'src/components/Table/TableWrapper';
import { useWalletData } from 'src/states/wallet';
import { TDataFundProject, getDataFundProject } from 'src/utils';
import DownloadData from 'src/views/portfolio/DownloadData';
import TableRowFund from 'src/views/portfolio/TableRowFund';
import UploadFundData from 'src/views/portfolio/UploadFundData';

const tableCellRatio = [3, 3, 3, 3];

export default function Contribution() {
    const { userAddress } = useWalletData();
    const [investData, setInvestData] = React.useState<TDataFundProject>({});
    const [error, setError] = React.useState<Error | null>(null);

    const fetchDataFromLocal = () => {
        setError(null);
        try {
            if (!userAddress) throw Error('User address is not found');
            const data = getDataFundProject(userAddress);
            setInvestData(data);
        } catch (error) {
            console.log(error);
            setInvestData({});
            setError(error as Error);
        }
    };
    React.useEffect(() => {
        fetchDataFromLocal();
    }, [userAddress]);

    return (
        <Container sx={{ pt: 5 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h1">Portfolio</Typography>
            </Box>

            <BoxPrivateData>
                <Box textAlign={'right'} mb={3}>
                    <DownloadData />
                    <UploadFundData refetch={fetchDataFromLocal} />
                </Box>

                {error ? (
                    <Typography mb={3} textAlign={'center'}>
                        {(error as Error).message || 'Fail to fetch data!'}
                    </Typography>
                ) : (
                    <></>
                )}
                <TableWrapper>
                    <TableHeader sx={{ minWidth: '900px' }}>
                        <TableCell xs={tableCellRatio[0]}>
                            <Typography variant="body2" color={'text.secondary'}>
                                Campaign ID
                            </Typography>
                        </TableCell>
                        <TableCell xs={tableCellRatio[1]}>
                            <Typography variant="body2" color={'text.secondary'}>
                                Organizer
                            </Typography>
                        </TableCell>
                        <TableCell xs={tableCellRatio[2]}>
                            <Typography variant="body2" color={'text.secondary'}>
                                Project
                            </Typography>
                        </TableCell>
                        <TableCell xs={tableCellRatio[2]}>
                            <Typography variant="body2" color={'text.secondary'}>
                                Funded
                            </Typography>
                        </TableCell>
                    </TableHeader>

                    {Object.keys(investData).map((idFund) => {
                        const [campaignId, projectId] = idFund.split('-');
                        return (
                            <TableRowFund
                                campaignId={campaignId}
                                projectId={projectId}
                                tableCellRatio={tableCellRatio}
                                key={idFund}
                                funded={investData[idFund].map((item) => item.amount).reduce((a, b) => a + b, 0)}
                            ></TableRowFund>
                        );
                    })}
                </TableWrapper>
            </BoxPrivateData>
        </Container>
    );
}
