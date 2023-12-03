import {useStardog} from "./useStardog";
import {ArtworkSearchRespons} from "../types/stardog/ArtworkSearchRespons";

export function useStardogLocation(locationURI: string) {
    return useStardog<ArtworkSearchRespons>(`
        SELECT 
            ?Artwork 
            ?artworkTitle 
            ?artworkImageURL 
            ?mediaType 
            ?dimension 
            ?artworkCreationLocation 
            ?Artist
            ?artistName
            ?country
        WHERE {
            <${locationURI}> a :Location .
            <${locationURI}> :country ?country .
            ?Artwork :hasLocation <${locationURI}> .
            ?Artwork a :Artwork .
            ?Artwork :artworkTitle ?artworkTitle .
            ?Artwork :artworkImageURL ?artworkImageURL .
            OPTIONAL { ?Artwork :dimension ?dimension } .
            OPTIONAL { ?Artwork :mediaType ?mediaType } .
            OPTIONAL { ?Artwork :artworkCreationLocation ?artworkCreationLocation } .
            OPTIONAL { 
                ?Artwork :isArtworkOf ?Artist .
                ?Artist a :Artist .
                ?Artist :name ?artistName .
            } .
        }
    `);
}
