export type StardogArtwork = {
    Artwork: {
        type: "uri"
        value: string
    },
    artworkTitle: {
        type: "literal"
        value: string
    },
    artworkImageURL: {
        type: "literal"
        value: string
    },
    mediaType?: {
        type: "literal"
        value: string
    },
    dimension?: {
        type: "literal"
        value: string
    },
    artworkCreationLocation?: {
        type: "literal"
        value: string
    },
    Artist: {
        type: "uri"
        value: string
    },
    artistName: {
        type: "literal"
        value: string
    },
    Location: {
        type: "uri"
        value: string
    },
    country: {
        type: "literal"
        value: string
    }
}
