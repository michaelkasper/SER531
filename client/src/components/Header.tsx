import React from 'react';
import {makeStyles} from 'tss-react/mui';
import {AppBar, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const useStyles = makeStyles()((theme) => ({
        root: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        bar: {
            backgroundColor: 'white'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'left',
        },
        logo: {
            padding: '0px 10px',
            fontSize: '3rem !important',
            backgroundColor: '#008CFF',
            color: 'white'
        },
        title: {
            padding: '12px 5px',
            textAlign: 'left',
            maxWidth: 300,
            color: '#008CFF'
        },
        buttonWrapper: {
            marginRight: 20
        },
        button: {
            marginLeft: theme.spacing(1),
        },
    })
);

export const Header: React.FC = () => {
    const {classes} = useStyles();
    const navigate = useNavigate();

    return (
        <AppBar position="static" color={'inherit'}>
            <div className={classes.root}>

                <div className={classes.header}>
                    <Typography className={classes.logo}>
                        GROUP 14
                    </Typography>

                    <Typography className={classes.title}>
                        Enriching online museum experiences utilizing ontology frameworks
                    </Typography>
                </div>

                <div className={classes.buttonWrapper}>
                    <Button variant="outlined" color="primary" className={classes.button} onClick={() => navigate('/')}>
                        Dashboard
                    </Button>
                </div>
            </div>
        </AppBar>
    );
};
