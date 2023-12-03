import React from "react";
import {ArtworkSearchRespons} from "../../types/stardog/ArtworkSearchRespons";
import {useStardogArtist} from "../../hooks/useStardogArtist";
import {Typography} from "@mui/material";
import {makeStyles} from "tss-react/mui";
import "react-horizontal-scrolling-menu/dist/styles.css";
import {ArtworkThumbnail} from "../ArtworkThumbnail";
import {ScrollBox} from "../ScrollWindow/ScrollBox";
import {Spinner} from "../Spinner";
import {useStardogLocation} from "../../hooks/useStardogLocation";

const useStyles = makeStyles()((theme) => ({
        root: {
            paddingTop: 20
        },
        wrapper: {
            position: 'relative',
            height: 210
        }
    })
);

type Props = {
    artwork: ArtworkSearchRespons;
}

export const RelatedArtworkLocation = ({artwork}: Props) => {
    const {classes} = useStyles();
    const {results: locationArtwork, getNextPage, loading} = useStardogLocation(artwork?.Location?.value)

    if (locationArtwork.length === 0) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Typography variant="h6">Other Works from Geographical Area</Typography>

            <div className={classes.wrapper}>
                <ScrollBox onLoadMore={getNextPage} loadingMore={loading}>
                    {locationArtwork.map((artwork) => (
                        <ArtworkThumbnail
                            key={artwork?.Artwork?.value}
                            itemId={artwork?.Artwork?.value}
                            artwork={artwork}
                        />
                    ))}

                </ScrollBox>
            </div>

        </div>
    );
}
