import React from "react";
import {makeStyles} from "tss-react/mui";
import {decode as base64Decode} from 'base-64';
import {useUrlQuery} from "../hooks/useUrlQuery";
import {useEffect, useState} from "react";
import {Button, Divider, Grid} from "@mui/material";
import {ArtworkDetails} from "../components/artworkPage/ArtworkDetails";
import {ArtworkImage} from "../components/artworkPage/ArtworkImage";
import {useNavigate} from "react-router-dom";
import {useStardog} from "../hooks/useStardog";
import {stardogArtworkQuery} from "../api/stardogArtworkQuery";
import {StardogArtwork} from "../types/StardogArtwork";
import {RelatedArtworkArtist} from "../components/relatedArtwork/RelatedArtworkArtist";
import {RelatedArtworkLocation} from "../components/relatedArtwork/RelatedArtworkLocation";

const useStyles = makeStyles()({
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
    backButton: {
        marginLeft: 10
    },
    searchButton: {
        marginRight: 10
    },
});


export const ArtworkPage = () => {
    const {classes} = useStyles();
    const navigate = useNavigate();
    const query = useUrlQuery();
    const urlId = base64Decode(query.get('id') || '');
    const [artworkURI, setArtworkURI] = useState<string>(urlId);
    const {results, explained} = useStardog<StardogArtwork>(artworkURI ? stardogArtworkQuery(artworkURI) : null);

    const artwork = results?.[0];

    const handelBackButton = () => {
        window.history.back();
    }

    const handelNewSearchButton = () => {
        navigate('/');
    }

    useEffect(() => {
        setArtworkURI(urlId)
    }, [urlId]);

    return (
        <div className={classes.root}>
            <Grid container spacing={2} justifyContent="flex-start">
                <Grid item xs={12}>
                    <Button className={classes.searchButton} variant="outlined" onClick={handelNewSearchButton}>New
                        Search</Button>
                    <Button className={classes.backButton} variant="outlined" onClick={handelBackButton}>BACK</Button>

                </Grid>
                {artwork && <>
                    <Grid item xs={4}>
                        <ArtworkImage artwork={artwork}/>
                    </Grid>
                    <Grid item xs={8}>
                        <ArtworkDetails artwork={artwork} explained={explained}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider light/>
                        {
                            artwork?.Artist?.value &&
                            <RelatedArtworkArtist artist={artwork?.Artist?.value}/>
                        }

                        {
                            artwork?.Location?.value &&
                            <RelatedArtworkLocation location={artwork?.Location?.value}/>
                        }
                    </Grid>
                </>
                }
            </Grid>

        </div>
    );
}

