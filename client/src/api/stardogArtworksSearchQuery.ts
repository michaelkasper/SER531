export const stardogArtworksSearchQuery = (searchString: string) => {
    return `
        SELECT ?Artwork ?artworkTitle ?artworkImageURL ?mediaType ?dimension ?artworkCreationLocation
        WHERE {
            ?Artwork a :Artwork .
            ?Artwork :artworkTitle ?artworkTitle .
            ?Artwork :artworkImageURL ?artworkImageURL .
            FILTER(REGEX(STR(?artworkTitle), "${searchString}", "i"))
        }
        LIMIT 50
    `;
}
