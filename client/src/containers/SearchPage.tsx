import * as React from "react";
import {makeStyles} from "tss-react/mui";
import {SearchBar} from "../components/SearchBar";
import {useUrlQuery} from "../hooks/useUrlQuery";
import {useNavigate} from "react-router-dom";
import {encode as base64Encode} from 'base-64';
import {useStardog} from "../hooks/useStardog";
import {stardogArtworksSearchQuery} from "../api/stardogArtworksSearchQuery";
import {StardogArtwork} from "../types/StardogArtwork";
import {CircularProgress, ImageList, ImageListItem, ImageListItemBar} from "@mui/material";

const useStyles = makeStyles()({
    root: {},
    body: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '0 200px'
    },
    image: {
        objectFit: "cover",
        height: "200px !important",
        cursor: "pointer"
    },
    imageList: {
        width: "100%"
    }
});

export const SearchPage = () => {
    const {classes} = useStyles();
    const navigate = useNavigate();
    const query = useUrlQuery();
    const urlQuerySting = (query.get('q') || '').replace('"', '\"');

    const {
        loading,
        results,
        getNextPage,
        currentPage,
        lastPage
    } = useStardog<StardogArtwork>(stardogArtworksSearchQuery(urlQuerySting));

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
            return;
        }
        getNextPage();
    };

    React.useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    const islastPage = currentPage === lastPage;

    const onArtworkClick = (artworkURI: string) => {
        navigate('/artwork?id=' + base64Encode(artworkURI));
    }

    return (
        <div className={classes.root}>

            <div className={classes.body}>
                <SearchBar width={'100%'}/>

                <div className={classes.imageList}>
                    <ImageList cols={5} rowHeight={200} gap={10}>
                        {results.map((result) => {
                            return (
                                <div onClick={() => onArtworkClick(result.Artwork.value)} key={result.Artwork.value}>
                                    <ImageListItem key={result.artworkImageURL.value}>
                                        <img
                                            className={classes.image}
                                            srcSet={result.artworkImageURL.value}
                                            src={result.artworkImageURL.value}
                                            alt={result?.artworkTitle.value ?? "Title Unavailable"}
                                            loading="lazy"
                                        />
                                        <ImageListItemBar
                                            title={result?.artworkTitle.value}
                                        />
                                    </ImageListItem>
                                </div>
                            )
                        })}
                    </ImageList>
                </div>
                {!islastPage && (
                    <CircularProgress/>
                )}
            </div>
        </div>
    );
}
