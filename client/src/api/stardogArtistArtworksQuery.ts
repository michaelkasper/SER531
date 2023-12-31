export const stardogArtistArtworksQuery = (artistURI: string) => {
    return `
        SELECT 
            ?Artwork 
            ?artworkTitle 
            ?artworkImageURL 
            ?mediaType 
            ?dimension 
            ?artworkCreationLocation 
            ?artistName
            ?Location
            ?country
        WHERE {
            <${artistURI}> a :Artist .
            <${artistURI}> :isArtistOf ?Artwork .
            ?Artwork a :Artwork .
            ?Artwork :artworkTitle ?artworkTitle .
            ?Artwork :artworkImageURL ?artworkImageURL .
            OPTIONAL { ?Artwork :dimension ?dimension } .
            OPTIONAL { ?Artwork :mediaType ?mediaType } .
            OPTIONAL { ?Artwork :artworkCreationLocation ?artworkCreationLocation } .
            OPTIONAL {
                ?Artwork :hasLocation ?Location .
                ?Location a :Location .
                ?Location :country ?country .
            } .
        }  
        LIMIT 50
    `;
}
