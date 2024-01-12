import { Avatar, Box, Button, Grid, IconButton, SxProps, TextField, Theme, Typography } from '@mui/material';
import { useCreateProjectData, useCreateProjectFunctions } from './state';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import { IconRemove } from 'src/assets/svg/icon';
import { MemberDataType } from 'src/services/project/api';

const rowStyle: SxProps<Theme> = (theme) => ({
    display: 'flex',
    alignItems: 'center',
});

export default function TeamMember() {
    const { teamMember } = useCreateProjectData();
    const { setTeamMember, setProjectData } = useCreateProjectFunctions();

    const handleAddTeamMember = () => {
        const timeStamp = Date.now();
        setTeamMember({
            [String(timeStamp)]: {
                profileName: '',
                role: '',
                socialLink: '',
            },
        });
    };

    const handleRemoveMember = (id: string) => {
        const current = { ...teamMember };
        try {
            delete current[id];
        } catch (error) {}
        setProjectData({ teamMember: current });
    };

    const handleEditTeamMember = (key: string, value: Partial<MemberDataType>) => {
        const tempValue = { ...teamMember![key] };
        setTeamMember({
            [key]: {
                ...tempValue,
                ...value,
            },
        });
    };
    return (
        <Box
            sx={{
                '& .member-row': {
                    my: 1,
                },
            }}
        >
            <Typography variant="h6" mb={2}>
                Team members
            </Typography>
            <Grid
                container
                sx={{
                    '& .MuiGrid-item': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                }}
                className="member-row"
                spacing={2}
            >
                <Grid item xs={12} md={3.5}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: '50px', height: '50px' }} />
                        <Typography ml={2} variant="body1" fontWeight={500}>
                            {teamMember!['root']?.profileName}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Typography variant="body1" fontWeight={500}>
                        {teamMember!['root']?.role}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="body1" fontWeight={500}>
                        {teamMember!['root']?.socialLink}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={1.5} sx={{ justifyContent: 'flex-end' }}>
                    <Button sx={{ minWidth: '100px' }} variant="outlined" onClick={handleAddTeamMember}>
                        Add
                    </Button>
                </Grid>
            </Grid>
            {Object.entries(teamMember || {}).map(([id, member], index) => {
                if (id === 'root') {
                    return;
                }
                return (
                    <Grid
                        key={id}
                        container
                        spacing={2}
                        sx={{
                            '& .MuiGrid-item': {
                                display: 'flex',
                                alignItems: 'center',
                            },
                        }}
                        className="member-row"
                    >
                        <Grid item xs={12} md={3.5}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Avatar sx={{ width: '50px', height: '50px' }} />
                                <TextField
                                    sx={{ ml: 2 }}
                                    label="Profile Name"
                                    onChange={(e) => {
                                        handleEditTeamMember(id, {
                                            profileName: e.target.value,
                                        });
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Role"
                                onChange={(e) => {
                                    handleEditTeamMember(id, {
                                        role: e.target.value,
                                    });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Social Link"
                                onChange={(e) => {
                                    handleEditTeamMember(id, {
                                        socialLink: e.target.value,
                                    });
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={1.5} sx={{ justifyContent: 'flex-end' }}>
                            <Box sx={{ minWidth: '100px', display: 'flex', justifyContent: 'center' }}>
                                <IconButton
                                    onClick={() => {
                                        handleRemoveMember(id);
                                    }}
                                >
                                    <IconRemove sx={{ fontSize: '2rem', color: 'background.primary' }} />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                );
            })}
        </Box>
    );
}
