import React from "react";
import { Button, ButtonGroup as MuiButtonGroup, SxProps } from "@mui/material";

type Props = {
    sx?: SxProps;
    fullWidth?: boolean;
    options: string[];
    selected: number;
    changeSelected: (index: number) => void;
};

export default function ButtonGroup({ sx, options, selected, changeSelected, fullWidth }: Props) {
    return (
        <MuiButtonGroup sx={sx} fullWidth={fullWidth}>
            {options.map((item, index) => {
                if (index == selected) {
                    return (
                        <Button key={"btn-group" + item + index} variant={"contained"} color="success">
                            {item}
                        </Button>
                    );
                }
                return (
                    <Button key={"btn-group" + item + index} variant={"text"} color="secondary" onClick={() => changeSelected(index)}>
                        {item}
                    </Button>
                );
            })}
        </MuiButtonGroup>
    );
}
