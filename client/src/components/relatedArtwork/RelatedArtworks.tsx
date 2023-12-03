import {RelatedArtworkArtist} from "./RelatedArtworkArtist";
import {ArtworkSearchRespons} from "../../types/stardog/ArtworkSearchRespons";
import {RelatedArtworkLocation} from "./RelatedArtworkLocation";

type Props = {
    artwork: ArtworkSearchRespons;
}

export const RelatedArtworks = ({artwork}: Props) => {

    return (
        <div>
            <RelatedArtworkArtist artwork={artwork}/>
            <RelatedArtworkLocation artwork={artwork}/>
        </div>
    );
}
