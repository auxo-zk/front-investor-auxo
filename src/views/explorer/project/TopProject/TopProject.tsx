import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { TProjectData } from 'src/services/project/api';
import CardProject from '../../../common/CardProject';
import Link from 'next/link';

export default function TopProject({ topProjects, showButtonMoreProjects }: { topProjects: TProjectData[]; showButtonMoreProjects: boolean }) {
    return (
        <Box mt={5}>
            <Box sx={{ display: 'flex', placeItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h6">Top Project</Typography>
                {showButtonMoreProjects ? (
                    <Link href={'/explorer/projects'} passHref>
                        <Button variant="contained">More Projects</Button>
                    </Link>
                ) : (
                    <></>
                )}
            </Box>

            <Box mt={2.5}>
                <Grid container spacing={3.5}>
                    {topProjects?.slice(0, 3).map((item, index) => {
                        return (
                            <Grid key={'topproject' + index + item.name} item xs={12} xsm={6} md={4}>
                                <CardProject data={item}></CardProject>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Box>
    );
}
