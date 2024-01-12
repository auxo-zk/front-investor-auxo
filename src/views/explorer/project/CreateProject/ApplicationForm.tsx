import { Typography, Paper, Box, Button, TextField, IconButton } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import dynamic from 'next/dynamic';
import { useCreateProjectData, useCreateProjectFunctions } from './state';
const CustomEditor = dynamic(() => import('src/components/CustomEditor/CustomEditor'), { ssr: false });

export default function ApplicationForm() {
    const { setProjectData, setCustomSection } = useCreateProjectFunctions();
    const projectData = useCreateProjectData();

    const handleSectionTitle = (key: string, value: string) => {
        setCustomSection({
            [key]: {
                ...(projectData.customSections[key] || {}),
                title: value,
            },
        });
    };
    const handleSectionDescription = (key: string, value: string) => {
        setCustomSection({
            [key]: {
                ...(projectData.customSections[key] || {}),
                description: value,
            },
        });
    };
    const handleAddSection = () => {
        const newKey = Date.now();
        setCustomSection({
            [newKey]: {
                title: '',
                description: '',
            },
        });
    };
    const handleRemoveSection = (key: string) => {
        let tempObj = { ...projectData.customSections };
        if (Object.keys(tempObj).length === 1) {
            return;
        }
        try {
            delete tempObj[key];
        } catch (error) {}
        setProjectData({
            customSections: tempObj,
        });
    };
    return (
        <>
            {Object.entries(projectData?.customSections).map(([key, item], index) => {
                return (
                    <Paper key={key} sx={{ p: 3, my: 3, backgroundColor: '#FFF8F6' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                            <Typography variant="body1" color={'text.primary'} fontWeight={400}>
                                Provide information to explain the second scope of work
                            </Typography>
                            <IconButton onClick={() => handleRemoveSection(key)}>
                                <DeleteOutlineIcon />
                            </IconButton>
                        </Box>
                        <TextField
                            label="Title"
                            sx={{ mb: 2 }}
                            value={item.title}
                            onChange={(e) => {
                                handleSectionTitle(key, e.target.value);
                            }}
                        />
                        <CustomEditor value={item.description || ''} onChange={(v) => handleSectionDescription(key, v)} />
                    </Paper>
                );
            })}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button variant="outlined" onClick={handleAddSection}>
                    <AddIcon fontSize="large" sx={{ mr: 1 }} /> Add a custom section
                </Button>
            </Box>
        </>
    );
}
