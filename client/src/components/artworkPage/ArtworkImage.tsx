import {Box, Card} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {StardogArtwork} from "../../types/StardogArtwork";
import {Modal} from "../Modal";
import {makeStyles} from "tss-react/mui";


const useStyles = makeStyles()({
    card: {
        cursor: 'pointer'
    },
    img: {
        display: 'block',
        width: '65vw',
        height: '65vh',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    }
});

type Props = {
    itemId?: string;
    artwork: StardogArtwork;
}

export const ArtworkImage = ({artwork}: Props) => {
    const {classes} = useStyles();
    const [openModal, setOpenModal] = useState(false);

    return <>
        <Card
            sx={{maxWidth: 400, padding: 0, margin: 0}}
            onClick={() => setOpenModal(true)}
            className={classes.card}
        >
            <img
                width={400}
                height={'100%'}
                src={artwork.artworkImageURL.value}
            />
        </Card>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <div id={'modal-modal-description'}>
                <Card sx={{maxWidth: '100%', maxHeight: '100%', padding: 0, margin: 0}}>
                    <div
                        className={classes.img}
                        style={{
                            backgroundImage: `url(${artwork.artworkImageURL.value})`
                        }}
                    />
                </Card>
            </div>
        </Modal>
    </>;
}
