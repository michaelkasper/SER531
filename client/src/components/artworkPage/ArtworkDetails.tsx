import {Divider, Grid, Typography} from "@mui/material";
import * as React from "react";
import {StardogArtwork} from "../../types/StardogArtwork";
import {ArtworkDetailsRow} from "./ArtworkDetailsRow";


type Props = {
    artwork: StardogArtwork;
}

export const ArtworkDetails = ({artwork}: Props) => {

    return <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={12}>
            <Typography variant="h6">{artwork?.artworkTitle.value}</Typography>
            <Divider light/>
        </Grid>
        <Grid item xs={12}>
            <ArtworkDetailsRow
                label={'Creation Location'}
                value={artwork?.artworkCreationLocation?.value}
            />
            <ArtworkDetailsRow
                label={'Media Type'}
                value={artwork?.mediaType?.value}
            />
            <ArtworkDetailsRow
                label={'Dimension'}
                value={artwork?.dimension?.value}
            />
            <ArtworkDetailsRow
                label={'Artist'}
                value={artwork?.artistName?.value}
            />
            <ArtworkDetailsRow
                label={'Location'}
                value={artwork?.country?.value}
            />
        </Grid>
    </Grid>;
}
