import { ChevronLeftRounded } from '@mui/icons-material';
import { Box, Breadcrumbs, Button, Container, Link, Paper, Switch, TextField, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
const CustomEditor = dynamic(() => import('src/components/CustomEditor/CustomEditor'), { ssr: false });
import Img from 'src/components/Img/Img';
import { useCreateProjectData, useCreateProjectFunctions } from './state';
import TeamMember from './TeamMembers';
import AdditionalDoc from './AdditionalDoc';
import { useState } from 'react';
import ButtonLoading from 'src/components/ButtonLoading/ButtonLoading';
import { useRouter } from 'next/router';

export default function CreateCampaign() {
    const { overViewDescription, challengeAndRisk, problemStatement, solution, name, publicKey } = useCreateProjectData();
    const { setProjectData, handleCreateProject } = useCreateProjectFunctions();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const handleSaveButton = async () => {
        try {
            setLoading(true);
            await handleCreateProject();
            setLoading(false);
            router.push('/profile');
        } catch (error) {
            setLoading(false);
        }
    };
    return (
        <Container
            sx={(theme) => ({
                pb: 5,
                '& .timeline-row': {
                    display: 'flex',
                    alignItems: 'center',
                    my: 4,
                },
                '& .timeline-dot': { width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'background.primary', border: '2px solid ' + theme.palette.primary.light, mr: 1.5 },
            })}
        >
            <Img
                src="https://bitnews.sgp1.digitaloceanspaces.com/uploads/admin/R4LE00ioowv4m5dB_1690012540.jpg"
                alt="banner project"
                sx={{ width: '100%', height: 'auto', aspectRatio: '370/100', borderRadius: '0px 0px 12px 12px' }}
            />
            <Breadcrumbs sx={{ mt: 2 }}>
                <Link color="inherit" href="/explorer/projects" style={{ textDecoration: 'none', color: 'unset' }}>
                    <Box sx={{ display: 'flex', placeItems: 'center' }}>
                        <ChevronLeftRounded color="primary" sx={{ fontSize: '24px' }} />
                        <Typography color={'primary.main'}>All Campaigns</Typography>
                    </Box>
                </Link>
                <Link color="inherit" href="#" style={{ textDecoration: 'none', color: 'unset' }}>
                    <Typography color={'primary.main'} fontWeight={600}>
                        PI network
                    </Typography>
                </Link>
            </Breadcrumbs>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Typography variant="h1">Project's information editor</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', my: 3 }}>
                <TextField
                    fullWidth
                    label="Project's name"
                    type="text"
                    name="project_name"
                    sx={{ mr: 3 }}
                    value={name}
                    onChange={(e) => {
                        setProjectData({ name: e.target.value });
                    }}
                />
                <TextField
                    fullWidth
                    label="Public key"
                    type="text"
                    name="project_name"
                    sx={{ ml: 3 }}
                    value={publicKey}
                    onChange={(e) => {
                        setProjectData({ publicKey: e.target.value });
                    }}
                />
            </Box>
            <Typography variant="h6" mt={6} mb={1}>
                Overview description
            </Typography>
            <CustomEditor
                value={overViewDescription}
                onChange={(v: string) => {
                    setProjectData({ overViewDescription: v });
                }}
            />

            <Typography variant="h6" mt={6} mb={1}>
                Problem Statement*
            </Typography>
            <CustomEditor
                value={problemStatement}
                onChange={(v: string) => {
                    setProjectData({ problemStatement: v });
                }}
            />

            <Typography variant="h6" mt={6} mb={1}>
                Solution*
            </Typography>
            <CustomEditor
                value={solution}
                onChange={(v: string) => {
                    setProjectData({ solution: v });
                }}
            />

            <Typography variant="h6" mt={6} mb={1}>
                Challenges & Risks*
            </Typography>
            <CustomEditor
                value={challengeAndRisk}
                onChange={(v: string) => {
                    setProjectData({ challengeAndRisk: v });
                }}
            />
            {/* <ApplicationForm /> */}
            <Box sx={{ mt: 5 }}>
                <TeamMember />
            </Box>
            <Box sx={{ mt: 5 }}>
                <AdditionalDoc />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <ButtonLoading muiProps={{ variant: 'contained', onClick: handleSaveButton, sx: { mr: 1 } }} isLoading={loading}>
                    Save
                </ButtonLoading>
                <Button variant="contained">Submit</Button>
            </Box>
        </Container>
    );
}
