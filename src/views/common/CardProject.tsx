import { Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import Card from 'src/components/Card/Card';
import { TProjectData } from 'src/services/project/api';
import { formatDate } from 'src/utils/format';

export default function CardProject({ data }: { data: TProjectData }) {
    return (
        <Card avatar={data.avatar}>
            <Link href={`/explorer/projects/idprojectdadad`} style={{ textDecoration: 'none', color: 'unset' }}>
                <Typography variant="h6" fontWeight={600} mt={1}>
                    {data.name}
                </Typography>
            </Link>
            <Typography variant="body3" mt={0.3} mb={1}>
                {formatDate(data.date, 'dd MMM yyyy')}
            </Typography>
            {/* <Typography variant="h6" color={'secondary.main'}>
                $870.975.003
            </Typography>
            <Typography variant="body3" mt={0.3} mb={1} color={'secondary.main'}>
                $1.870.975.003
            </Typography> */}
            <Typography mt={2} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical' }}>
                {data.desc}
            </Typography>
        </Card>
    );
}
