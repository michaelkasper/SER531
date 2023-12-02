import * as React from "react";
import {makeStyles} from "tss-react/mui";
import {decode as base64Decode} from 'base-64';
import {useUrlQuery} from "../hooks/useUrlQuery";
import {useState} from "react";
import {useStardog} from "../hooks/useStardog";
import {ArtworkSearchRespons} from "../types/stardog/ArtworkSearchRespons";

const useStyles = makeStyles()((theme) => ({
        root: {
            position: "relative",
            display: 'flex',
            flexDirection: "column",
            justifyContent: 'center',
            alignItems: 'center'
        }
    })
);


export const ArtworkPage = () => {
    const {classes} = useStyles();
    const query = useUrlQuery();
    const [artworkURI] = useState<string>(base64Decode(query.get('id') || ''));

    const {results} = useStardog<ArtworkSearchRespons>(`
        SELECT ?artworkTitle ?artworkImageURL ?mediaType ?dimension ?artworkCreationLocation
        WHERE {
            <${artworkURI}> a :Artwork .
            <${artworkURI}> :artworkTitle ?artworkTitle .
            <${artworkURI}> :artworkImageURL ?artworkImageURL .
            OPTIONAL { <${artworkURI}> :dimension ?dimension } .
            OPTIONAL { <${artworkURI}> :mediaType ?mediaType } .
            OPTIONAL { <${artworkURI}> :artworkCreationLocation ?artworkCreationLocation } .
            OPTIONAL { <${artworkURI}> :artworkCurrentLocation ?artworkCurrentLocation } .
        }
    `);
    const result = results?.[0];

    return (
        <div className={classes.root}>
            {JSON.stringify(result)}

            {result && <div>
                <div>
                    <img width={100} src={result.artworkImageURL.value}/>
                </div>
                <div>
                    <div>{result?.artworkTitle.value}</div>
                    <div>{result?.mediaType?.value}</div>
                    <div>{result?.dimension?.value}</div>
                    <div>{result?.artworkCreationLocation?.value}</div>
                </div>
            </div>}

        </div>
    );
}

