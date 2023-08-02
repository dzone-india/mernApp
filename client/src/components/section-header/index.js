import React, {useEffect} from "react";
import { Typography, Grid, Container, makeStyles, Button, Box } from "@material-ui/core";
import GoogleMapReact from 'google-map-react';
import './section-header.css';

const useStyles = makeStyles((theme)=> ({
 
}));

const SectionHeader = props => {
    const {title, subtitle} = props;
    const classes = useStyles();
    return (
        <Grid class="section-header" container>    
            <Typography className="section-subtitle">{title}</Typography>
            <Typography variant="h2" className="section-title" style={props.style}>{subtitle}</Typography>
        </Grid>
    );
}

export default SectionHeader;