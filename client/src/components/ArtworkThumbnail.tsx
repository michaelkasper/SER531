import {Card} from "@mui/material";
import * as React from "react";
import {makeStyles} from "tss-react/mui";
import {ArtworkSearchRespons} from "../types/stardog/ArtworkSearchRespons";
import {encode as base64Encode} from "base-64";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
        root: {
            position: "relative",
            cursor: "pointer",
            margin: '0px 10px'
        },
        card: {
            overflow: "hidden",
        },
        titleWrapper: {
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 80,
            padding: 10,
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            borderRadius: '0 0 4px 4px',
        },
    })
);

type Props = {
    itemId?: string;
    artwork: ArtworkSearchRespons;
}

export const ArtworkThumbnail = ({artwork}: Props) => {
    const {classes} = useStyles();
    const navigate = useNavigate();

    const onClick = () => {
        navigate('/artwork?id=' + base64Encode(artwork.Artwork.value));
    }

    return (
        <div onClick={onClick} className={classes.root}>
            <Card sx={{maxWidth: 200, padding: 0, margin: 0}}>
                <img
                    width={200}
                    height={200}
                    src={artwork.artworkImageURL.value}
                />
                <div className={classes.titleWrapper}>{artwork.artworkTitle.value}</div>
            </Card>
        </div>
    );
}
