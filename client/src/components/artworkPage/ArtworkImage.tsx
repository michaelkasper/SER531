import {Card} from "@mui/material";
import * as React from "react";
import {StardogArtwork} from "../../types/StardogArtwork";

type Props = {
    itemId?: string;
    artwork: StardogArtwork;
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
