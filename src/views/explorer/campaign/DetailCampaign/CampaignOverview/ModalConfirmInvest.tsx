import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { toast } from 'react-toastify';
import { IconMina } from 'src/assets/svg/icon';
import ButtonLoading from 'src/components/ButtonLoading/ButtonLoading';
import { TProjectData } from 'src/services/project/api';
import { getDataInputFund } from 'src/services/services';
import { useAppContract } from 'src/states/contracts';
import { useWalletData } from 'src/states/wallet';
import { getRandomInt, setDataFundProject } from 'src/utils';
import { formatNumber } from 'src/utils/format';

export default function ModalConfirmInvest({ listProject, campaignId }: { listProject: { data: TProjectData; investInput: string }[]; campaignId: string }) {
    const { userAddress } = useWalletData();
    const { workerClient } = useAppContract();
    const [loading, setLoading] = React.useState<boolean>(false);
    async function handleInvest() {
        setLoading(true);
        const idtoast = toast.loading('Create transaction and proving...', { position: 'top-center', type: 'info' });
        try {
            if (!userAddress) throw Error('Please connect your wallet first!');
            if (!workerClient) throw Error('Worker client is dead, reload page again!');

            const listFundProjects = listProject
                .map((item, index) => ({ projectId: item.data.idProject, amount: Number(item.investInput), index: index, nullifier: getRandomInt(2, 250) }))
                .filter((item) => item.amount != 0 && item.amount >= 0.01);
            console.log(listFundProjects);

            const dataBackend = await getDataInputFund(campaignId);
            await workerClient.investProjects({
                sender: userAddress,
                campaignId: campaignId,
                funds: listFundProjects,
                dataBackend: dataBackend,
            });
            await workerClient.proveTransaction();

            toast.update(idtoast, { render: 'Prove successfull! Sending the transaction...' });
            const transactionJSON = await workerClient.getTransactionJSON();
            console.log(transactionJSON);

            const { transactionLink } = await workerClient.sendTransaction(transactionJSON);
            console.log(transactionLink);
            listFundProjects.forEach((item) => {
                setDataFundProject(userAddress, campaignId, item.projectId, [{ amount: item.amount, nullifier: item.nullifier }]);
            });
            toast.update(idtoast, { render: 'Send transaction successfull!', isLoading: false, type: 'success', autoClose: 3000, hideProgressBar: false });
        } catch (err) {
            console.log(err);
            toast.update(idtoast, { render: (err as Error).message, type: 'error', position: 'top-center', isLoading: false, autoClose: 3000, hideProgressBar: false });
        }
        setLoading(false);
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', placeItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" color={'text.secondary'}>
                    Project Name
                </Typography>
                <Typography variant="body2" color={'text.secondary'}>
                    Funding vol
                </Typography>
            </Box>
            {listProject.map((item, index) => {
                if (Number(item.investInput) > 0) {
                    return (
                        <Box key={index} sx={{ display: 'flex', placeItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                            <Typography color={'primary.main'} variant="h6" fontWeight={600}>
                                {item.data.name}
                            </Typography>
                            <Typography color={'primary.main'} variant="h6" fontWeight={600} sx={{ display: 'flex', placeItems: 'center', gap: 1 }}>
                                {formatNumber(item.investInput, { fractionDigits: 2 })} <IconMina />
                            </Typography>
                        </Box>
                    );
                }
                return null;
            })}
            <Box textAlign={'right'} mt={4}>
                <ButtonLoading isLoading={loading} muiProps={{ variant: 'contained', onClick: handleInvest }}>
                    Invest
                </ButtonLoading>
            </Box>
        </Box>
    );
}
