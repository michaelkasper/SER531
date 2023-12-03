import {useStardog} from "./useStardog";
import {StardogArtwork} from "../types/StardogArtwork";

export function useStardogSearch(searchString: string) {
    return useStardog<StardogArtwork>(`
        SELECT ?Artwork ?artworkTitle ?artworkImageURL ?mediaType ?dimension ?artworkCreationLocation
        WHERE {
            ?Artwork a :Artwork .
            ?Artwork :artworkTitle ?artworkTitle .
            ?Artwork :artworkImageURL ?artworkImageURL .
            FILTER(REGEX(STR(?artworkTitle), "${searchString}", "i"))
        }
    `);
}
