import React, {useEffect, useState} from "react";
import {Typography, Grid, Container, makeStyles, Button, Box, TextField, Label} from "@material-ui/core";
import GoogleMapReact from 'google-map-react';
import MapContainer from './MapContainer';
import MapForm from './form';
import ApiClient from "../../api-client";

const useStyles = makeStyles((theme) => ({
    text1: {
        fontFamily: '"Open Sans",sans-serif',
        color: '#06AEB8',
        fontSize: 15,
        fontWeight: 'bold'
    },
    text2: {
        fontFamily: '"Open Sans",sans-serif',
        color: '#333333',
        fontSize: 30,
        fontWeight: 400
    },
}));

const SectionMap = props => {
    const {title, subtitle} = props;
    const [markers, setMarkers] = useState([]);
    const classes = useStyles();

    const [searchPayload, setSearchPayload] = useState({
        city: "jaipur",
        state: "rajesthan"
    });

    const searchLocation = (searchPayload) => {

        if (!searchPayload.state || !searchPayload.city) return;

        try {

            const getData = async () => {
                const response = await ApiClient.call(ApiClient.REQUEST_METHOD.POST, '/property/getPropertyLatLong', searchPayload, {}, {Cookie: ApiClient.cookie, Authorization: ApiClient.authorization}, false);
                console.log("markers", response.data);
                const markersList = (response?.data?.data || []).map(({latitude, longitude}) => {
                    return {lat: latitude, lng: longitude};
                });

                setMarkers(markersList);
            };
            getData();
        } catch (e) {
            console.log("error::populateMarker", e);
        }

    };



    return (
        <Grid container>
            <Grid item className="map-container" xs={12} md={8}>
                <MapContainer markers={markers} key={2} />
            </Grid>
            <Grid className="form-enquiry" item xs={12} md={4}>
                <MapForm searchLocation={searchLocation} />
            </Grid>
        </Grid>
    );
};

export default SectionMap;