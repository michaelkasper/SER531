import * as React from "react";
import {makeStyles} from "tss-react/mui";
import {decode as base64Decode} from 'base-64';
import {useUrlQuery} from "../hooks/useUrlQuery";
import {useEffect, useState} from "react";
import {Button, Divider, Grid} from "@mui/material";
import {ArtworkDetails} from "../components/artworkPage/ArtworkDetails";
import {ArtworkImage} from "../components/artworkPage/ArtworkImage";
import {useStardogArtwork} from "../hooks/useStardogArtwork";
import {RelatedArtworks} from "../components/relatedArtwork/RelatedArtworks";

const useStyles = makeStyles()((theme) => ({
        root: {
            position: "relative",
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'left',
            alignItems: 'center',
            textAlign: 'left',
            padding: '0 100px',
            marginBottom: 100
        },
        backButton: {},
    })
);


export const ArtworkPage = () => {
    const {classes} = useStyles();
    const query = useUrlQuery();
    const urlId = base64Decode(query.get('id') || '');
    const [artworkURI, setArtworkURI] = useState<string>(urlId);
    const artwork = useStardogArtwork(artworkURI);

    const handelBackButton = () => {
        window.history.back();
    }

    useEffect(() => {
        setArtworkURI(urlId)
    }, [urlId]);

    return (
        <div className={classes.root}>
            <Grid container spacing={2} justifyContent="flex-start">
                <Grid item xs={12}>
                    <Button className={classes.backButton} variant="outlined" onClick={handelBackButton}>BACK</Button>
                </Grid>
                {artwork && <>
                    <Grid item xs={4}>
                        <ArtworkImage artwork={artwork}/>
                    </Grid>
                    <Grid item xs={8}>
                        <ArtworkDetails artwork={artwork}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider light/>
                        <RelatedArtworks artwork={artwork}/>
                    </Grid>
                </>
                }
            </Grid>

        </div>
    );
}

