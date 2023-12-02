export type ArtworkSearchRespons = {
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
    }
}
