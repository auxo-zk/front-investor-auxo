import { Avatar, Box, Grid, Typography } from '@mui/material';
import { IconCloud } from 'src/assets/svg/icon';

export default function AdditionalDoc() {
    return (
        <Box>
            <Typography variant="h6">Additional Documents</Typography>
            <Typography mt={1.5} variant="body1" color="text.secondary" sx={{ maxWidth: '651px', wordBreak: 'break-word' }}>
                Submit any additional documents to provide additional information about your project Allowed formats:{' '}
                <Typography variant="body1" component="span" fontWeight={600}>
                    PDF, PNG, JPG
                </Typography>
            </Typography>
            <Grid container mt={1} spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Box
                        sx={(theme) => ({
                            width: '100%',
                            minHeight: '240px',
                            backgroundColor: 'background.secondary',
                            borderRadius: 2.5,
                            border: '1px dashed ' + theme.palette.primary.light,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                        })}
                    >
                        <IconCloud sx={{ fontSize: '4rem' }} />
                        <Typography variant="body2" fontWeight={500}>
                            Browse
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box>
                        <Typography mb={2} variant="body1" fontWeight={600}>
                            Uploaded Files
                        </Typography>
                        <Box sx={{ maxHeight: '200px', overflow: 'auto' }}>
                            {Array.from(Array(10).keys()).map((item, index) => {
                                return (
                                    <Box key={index} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', my: 1 }}>
                                        <Avatar sx={{ border: '1px solid black' }} />
                                        <Typography ml={2}>Test file {index}</Typography>
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
