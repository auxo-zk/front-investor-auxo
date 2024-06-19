import { Chip, ChipProps } from '@mui/material';
import React from 'react';
import { CampaignState } from 'src/services/campaign/api';

export default function StateCampaign({ state, props }: { state: CampaignState; props?: ChipProps }) {
    if (state === CampaignState.UPCOMING) {
        return <Chip variant="outlined" color="secondary" label="Upcoming" {...props} />;
    }
    if (state === CampaignState.APPLICATION) {
        return <Chip variant="outlined" color="secondary" label="Application" {...props} />;
    }
    if (state === CampaignState.FUNDING) {
        return <Chip variant="outlined" color="secondary" label="Fundraising" {...props} />;
    }

    return <Chip variant="outlined" color="success" label="Allocation" {...props} />;
}
