import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ReactNode } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function CustomAccordion({ content, title, index }: { title: string; content: string; index?: number }) {
    return (
        <Accordion sx={{ py: '20px', px: '10px' }}>
            <AccordionSummary expandIcon={<KeyboardArrowDownIcon />} sx={{ borderRadius: 1 }}>
                <Typography variant="h6" sx={{ '& > *': { m: 0 } }} fontWeight={500} mr={3} component={'div'} dangerouslySetInnerHTML={{ __html: title }}></Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="body1" sx={{ '& > *': { m: 0 } }} color="text.secondary" component={'div'} dangerouslySetInnerHTML={{ __html: content }}></Typography>
            </AccordionDetails>
        </Accordion>
    );
}
