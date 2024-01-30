import { Box, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IconSpinLoading } from 'src/assets/svg/icon';
import NoData from 'src/components/NoData';
import { getParticipatingProjects } from 'src/services/campaign/api';
import { TProjectData } from 'src/services/project/api';
import CardProject from 'src/views/common/CardProject';

export default function ParticipatingProjects({ campaignId }: { campaignId: string }) {
    const [listProject, setListProject] = useState<TProjectData[]>([]);
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
            <TextField variant="outlined" color="secondary" label="Search project" name="project_name" sx={{ width: '100%', maxWidth: '380px', mb: 3 }} />

            <Grid container spacing={3}>
                {listProject.map((item, index) => {
                    return (
                        <Grid key={'projectJoinedcampain' + index + item.name} item xs={12} xsm={6} md={4}>
                            <CardProject data={item}></CardProject>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
