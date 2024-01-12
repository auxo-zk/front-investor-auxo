import { Box, Button, SxProps, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { imagePath } from "src/constants/imagePath";

export default function FundingActivitiesBanner({ sx }: { sx?: SxProps }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 4,
                justifyContent: "space-around",
                borderRadius: "12px",
                background: "linear-gradient(29deg, #EEF5F5 13.9%, rgba(255, 255, 255, 0.00) 49.05%)",
                border: "1px solid",
                borderColor: "primary.dark",
                p: { xs: 3, xsm: 5 },
                ...sx,
            }}
        >
            <Image src={imagePath.THUMBNAIL2} alt="auxo thumbnail" style={{ maxWidth: "328px", height: "auto" }} />
            <Box sx={{ maxWidth: "434px" }}>
                <Typography variant="h2" mb={1.5}>
                    Funding Activities
                </Typography>
                <Typography variant="h5" mb={2} color={"primary.main"}>
                    Funding Activities
                </Typography>
                <Typography color={"primary.main"} mb={1}>
                    Explore diverse forms of funding activities and implement them on-chain to ensure both transparency and privacy protection.
                </Typography>
                <Button variant="contained">Register</Button>
            </Box>
        </Box>
    );
}
