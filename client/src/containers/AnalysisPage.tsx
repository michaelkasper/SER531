import React from "react";
import {makeStyles} from "tss-react/mui";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useStardog} from "../hooks/useStardog";
import {StardogArtwork} from "../types/StardogArtwork";
import {stardogArtworksSearchQuery} from "../api/stardogArtworksSearchQuery";
import {stardogArtworkQuery} from "../api/stardogArtworkQuery";
import {stardogArtistArtworksQuery} from "../api/stardogArtistArtworksQuery";
import {stardogLocationArtworksQuery} from "../api/stardogLocationArtworksQuery";

const useStyles = makeStyles()({
    root: {
        position: "relative",
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    header: {
        marginBottom: 20
    },
    logo: {
        padding: '3px 5px',
        fontSize: '36px !important',
        textAlign: 'center',
    },
    title: {
        padding: '3px 5px',
        textAlign: 'center',
        maxWidth: 300
    }
});


export const AnalysisPage = () => {
    const {classes} = useStyles();

    const results = [];

    const {explained: explained1} = useStardog<StardogArtwork>(stardogArtworksSearchQuery('Monet'));
    const {explained: explained2} = useStardog<StardogArtwork>(stardogArtworksSearchQuery('Monet'));
    const {explained: explained3} = useStardog<StardogArtwork>(stardogArtworksSearchQuery('Monet'));

    results.push({
        name: 'Artworks Search',
        requestLatency: (explained1.requestLatency + explained2.requestLatency + explained3.requestLatency) / 3
    })

    const {explained: explained4} = useStardog<StardogArtwork>(stardogArtworkQuery('http://example.org/artwork/1'));
    const {explained: explained5} = useStardog<StardogArtwork>(stardogArtworkQuery('http://example.org/artwork/1'));
    const {explained: explained6} = useStardog<StardogArtwork>(stardogArtworkQuery('http://example.org/artwork/1'));

    results.push({
        name: 'Artwork Query',
        requestLatency: (explained4.requestLatency + explained5.requestLatency + explained6.requestLatency) / 3
    });


    const {explained: explained7} = useStardog<StardogArtwork>(stardogArtistArtworksQuery('http://example.org/artist/1'));
    const {explained: explained8} = useStardog<StardogArtwork>(stardogArtistArtworksQuery('http://example.org/artist/1'));
    const {explained: explained9} = useStardog<StardogArtwork>(stardogArtistArtworksQuery('http://example.org/artist/1'));

    results.push({
        name: 'Artist Artworks Query',
        requestLatency: (explained7.requestLatency + explained8.requestLatency + explained9.requestLatency) / 3
    });

    const {explained: explained10} = useStardog<StardogArtwork>(stardogLocationArtworksQuery('http://example.org/location/1'));
    const {explained: explained11} = useStardog<StardogArtwork>(stardogLocationArtworksQuery('http://example.org/location/1'));
    const {explained: explained12} = useStardog<StardogArtwork>(stardogLocationArtworksQuery('http://example.org/location/1'));

    results.push({
        name: 'Location Artworks Query',
        requestLatency: (explained10.requestLatency + explained11.requestLatency + explained12.requestLatency) / 3
    });

    return (
        <div className={classes.root}>
            <Typography>Stardog Query Performance Results</Typography>

            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Query</strong></TableCell>
                            <TableCell align="right"><strong>Execution Time (ms)</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results.map((result) => (
                            <TableRow
                                key={result.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {result.name}
                                </TableCell>
                                <TableCell align="right">{Math.round(result.requestLatency*100)/100} ms</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}
