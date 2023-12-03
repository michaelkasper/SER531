import {RelatedArtworkArtist} from "./RelatedArtworkArtist";
import {StardogArtwork} from "../../types/StardogArtwork";
import {RelatedArtworkLocation} from "./RelatedArtworkLocation";

type Props = {
    artwork: StardogArtwork;
}

export const RelatedArtworks = ({artwork}: Props) => {
    return (
        <>
            <RelatedArtworkArtist artwork={artwork}/>
            <RelatedArtworkLocation artwork={artwork}/>
        </>
    );
}
