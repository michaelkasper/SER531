import * as React from "react";
import {makeStyles} from "tss-react/mui";
import {SearchBar} from "../components/SearchBar";
import {useStardog} from "../hooks/useStardog";
import {ArtworkSearchRespons} from "../types/stardog/ArtworkSearchRespons";
import {useUrlQuery} from "../hooks/useUrlQuery";
import {useNavigate} from "react-router-dom";
import {encode as base64Encode} from 'base-64';
import {useStardogSearch} from "../hooks/useStardogSearch";
import {useEffect} from "react";


const useStyles = makeStyles()((theme) => ({
        root: {},
        body: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '0 200px'
        }
    })
);

export const SearchPage = () => {
    const {classes} = useStyles();
    const navigate = useNavigate();
    const query = useUrlQuery();
    const urlQuerySting = (query.get('q') || '').replace('"', '\"');

    const {
        results,
        getNextPage,
        currentPage,
        lastPage
    } = useStardogSearch(urlQuerySting);
    const islastPage = currentPage === lastPage;

    const onArtworkClick = (artworkURI: string) => {
        navigate('/artwork?id=' + base64Encode(artworkURI));
    }

    return (
        <div className={classes.root}>

            <div className={classes.body}>
                <SearchBar width={'100%'}/>

                {results.map((result) => {
                    return (
                        <div onClick={() => onArtworkClick(result.Artwork.value)} key={result.Artwork.value}>
                            <div>
                                <img width={100} src={result.artworkImageURL.value}/>
                            </div>
                            <div>{result?.artworkTitle.value}</div>
                        </div>
                    )
                })}

                {!islastPage && <button onClick={() => {
                    if (!islastPage) {
                        getNextPage();
                    }
                }}>Get next page
                </button>}


            </div>
        </div>
    );
}
