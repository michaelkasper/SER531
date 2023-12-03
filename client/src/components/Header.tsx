import React from 'react';
import {makeStyles} from 'tss-react/mui';
import {AppBar, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'left',
            flexDirection: 'column',
            padding: '0',
            margin: '0',
        },
        bar: {
            backgroundColor: 'white'
        },
        logo: {
            cursor: 'pointer',
            padding: '3px 5px',
            fontSize: '36px !important',
            width: 200
        },
        title: {
            padding: '3px 5px',
            textAlign: 'left',
            maxWidth: 300,
            color: '#008CFF'
        }
    })
);

export const Header: React.FC = () => {
    const {classes} = useStyles();
    const navigate = useNavigate();

    return (
        <AppBar position="static" color={'inherit'}>
            <div className={classes.root}>
                <div>
                    <Typography className={classes.logo} onClick={() => navigate('/')}>
                        PR<strong>ONTO</strong>
                    </Typography>
                </div>

                <Typography className={classes.title}>
                    Ontology driven art/museum database
                </Typography>
            </div>
        </AppBar>
    );
};
