import * as React from "react";
import {makeStyles} from "tss-react/mui";
import {SearchBar} from "../components/SearchBar";
import {useStardog} from "../hooks/useStardog";
import {ResponseExample} from "../types/ResponsExample";
import {useUrlQuery} from "../hooks/useUrlQuery";


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
    const query = useUrlQuery();
    const searchString = (query.get('q') || '').replace('"', '\"');

    const stardogQuery = `
        SELECT ?Artwork ?artworkTitle ?artworkImageURL ?mediaType ?dimension ?artworkCreationLocation
        WHERE {
            ?Artwork a :Artwork .
            ?Artwork :artworkTitle ?artworkTitle .
            ?Artwork :artworkImageURL ?artworkImageURL .
            OPTIONAL { ?Artwork :dimension ?dimension } .
            OPTIONAL { ?Artwork :mediaType ?mediaType } .
            OPTIONAL { ?Artwork :artworkCreationLocation ?artworkCreationLocation } .
            OPTIONAL { ?Artwork :artworkCurrentLocation ?artworkCurrentLocation } .
            FILTER(REGEX(STR(?artworkTitle), "${searchString}", "i"))
        }
    `;

    const {
        results,
        getNextPage,
        currentPage,
        lastPage
    } = useStardog<ResponseExample>(stardogQuery);

    const islastPage = currentPage === lastPage;

    return (
        <div className={classes.root}>

            <div className={classes.body}>
                <SearchBar width={'100%'}/>

                <pre>{JSON.stringify(results, null, 2)}</pre>

                <button onClick={() => {
                    if (!islastPage) {
                        getNextPage();
                    }
                }}>Get next page
                </button>

            </div>
        </div>
    );
}
