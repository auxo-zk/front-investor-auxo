import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ReactNode } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function CustomAccordion({ content, title, index }: { title: ReactNode; content: ReactNode; index?: number }) {
    return (
        <Accordion sx={{ py: '20px', px: '10px' }}>
            <AccordionSummary expandIcon={<KeyboardArrowDownIcon />} sx={{ borderRadius: 1 }}>
                <Typography variant="h6" fontWeight={500} mr={3}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="body1" color="text.secondary">
                    {content}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}
