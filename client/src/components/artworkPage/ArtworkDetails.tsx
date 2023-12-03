import React, {MouseEvent} from "react";
import {Button, Grid, Typography} from "@mui/material";
import {StardogArtwork} from "../../types/StardogArtwork";
import {ArtworkDetailsRow} from "./ArtworkDetailsRow";
import {Divider} from "../Divider";
import {useExplainModal} from "../../hooks/useExplainModal";
import {StardogExplained} from "../../types/StardogExplained";

type Props = {
    artwork: StardogArtwork;
    explained: StardogExplained;
}

export const ArtworkDetails = ({artwork, explained}: Props) => {
    const {openExplain} = useExplainModal();

    const onExplainSPARQL = (e: MouseEvent) => {
        e.preventDefault();
        if (explained) {
            openExplain("Artwork Details", explained);
        }
    }

    return <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={11}>
            <Typography variant="h6">{artwork?.artworkTitle.value}</Typography>
        </Grid>
        <Grid item xs={1}>
            {explained &&
                <Button variant="text" size="small" onClick={onExplainSPARQL}>
                    Explain SPARQL
                </Button>
            }
        </Grid>
        <Grid item xs={12}>
            <Divider/>
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
