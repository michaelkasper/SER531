import {useStardog} from "./useStardog";
import {StardogArtwork} from "../types/StardogArtwork";

export function useStardogArtwork(artworkURI: string | null = null) {
    const {results} = useStardog<StardogArtwork>(artworkURI ? `
        SELECT 
            ?artworkTitle 
            ?artworkImageURL 
            ?mediaType 
            ?dimension 
            ?artworkCreationLocation 
            ?Artist 
            ?artistName
            ?Location
            ?country
        WHERE {
            <${artworkURI}> a :Artwork .
            <${artworkURI}> :artworkTitle ?artworkTitle .
            <${artworkURI}> :artworkImageURL ?artworkImageURL .
            OPTIONAL { <${artworkURI}> :dimension ?dimension } .
            OPTIONAL { <${artworkURI}> :mediaType ?mediaType } .
            OPTIONAL { <${artworkURI}> :artworkCreationLocation ?artworkCreationLocation } .
            OPTIONAL { 
                <${artworkURI}> :isArtworkOf ?Artist .
                ?Artist a :Artist .
                ?Artist :name ?artistName .
            } .
            OPTIONAL {
                <${artworkURI}> :hasLocation ?Location .
                ?Location a :Location .
                ?Location :country ?country .
            } .
        }
    ` : null);

    return results?.[0];
}
