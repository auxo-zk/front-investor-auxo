import { Autocomplete, Box, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TProjectData, getAddressProject } from 'src/services/project/api';
import { useModalData, useModalFunction } from 'src/states/modal';
import { useWalletData } from 'src/states/wallet';

const mockOptions = [
    {
        label: 'Mina hackathon 1',
        value: 1,
    },
    {
        label: 'Mina hackathon 2',
        value: 2,
    },
    {
        label: 'Mina hackathon 3',
        value: 3,
    },
];
// getAddressProject
export default function ProjectSelect() {
    const [project, setProject] = useState<number | string>();
    const [listProject, setListProject] = useState<TProjectData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { userAddress } = useWalletData();
    const router = useRouter();
    const { closeModal } = useModalFunction();
    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            try {
                const res = await getAddressProject(userAddress);
                setListProject(res);
            } catch (error) {}
            setLoading(false);
        };
        fetchProjects();
    }, [userAddress]);
    return (
        <Box>
            {/* <Typography variant="h6">Select your project</Typography> */}
            <Typography variant="body1" mb={3}>
                {`Select a project to apply for this fundraising campaignYou will be required to provide answers to the organizer's questions to complete the application process`}
            </Typography>
            {/* <Select>
                {mockOptions.map((item, index) => {
                    return (
                        <MenuItem key={item.value} value={item.value}>
                            {item.label}
                        </MenuItem>
                    );
                })}
            </Select> */}
            <Autocomplete
                options={listProject.map((pj) => ({ label: pj.name, value: pj.idProject }))}
                renderInput={(params) => <TextField {...params} color="secondary" placeholder="Select project" />}
                onChange={(e, value) => setProject(value?.value)}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3, justifyContent: 'flex-end' }}>
                <Button
                    disabled={!project}
                    variant="contained"
                    onClick={() => {
                        closeModal();
                        router.push(`/${router.asPath}/milestones-detail/${project}`);
                    }}
                >
                    Continue
                </Button>
            </Box>
        </Box>
    );
}
