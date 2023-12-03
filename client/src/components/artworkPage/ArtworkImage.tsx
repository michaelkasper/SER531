import {Card, Grid, Typography} from "@mui/material";
import * as React from "react";
import {makeStyles} from "tss-react/mui";
import {ArtworkSearchRespons} from "../../types/stardog/ArtworkSearchRespons";


type Props = {
    itemId?: string;
    artwork: ArtworkSearchRespons;
}

export const ArtworkImage = ({artwork}: Props) => {
    return <Card sx={{maxWidth: 400, padding: 0, margin: 0}}>
        <img
            width={400}
            height={'100%'}
            src={artwork.artworkImageURL.value}
        />
    </Card>;
}
