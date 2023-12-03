import {useStardog} from "./useStardog";
import {ArtworkSearchRespons} from "../types/stardog/ArtworkSearchRespons";

export function useStardogSearch(searchString: string) {
    return useStardog<ArtworkSearchRespons>(`
        SELECT ?Artwork ?artworkTitle ?artworkImageURL ?mediaType ?dimension ?artworkCreationLocation
        WHERE {
            ?Artwork a :Artwork .
            ?Artwork :artworkTitle ?artworkTitle .
            ?Artwork :artworkImageURL ?artworkImageURL .
            FILTER(REGEX(STR(?artworkTitle), "${searchString}", "i"))
        }
    `);
}
