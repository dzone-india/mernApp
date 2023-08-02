import { Box, Container, Image } from '@material-ui/core';
import React from 'react';
import "./carrer-banner.css"


function CarrierBannerImg(){
    return(
        <Box className="onlineFormHeader">
            <img src={process.env.PUBLIC_URL + '/banner/carrer-banner.jpg'} />
            
        </Box>
    )
}

export default CarrierBannerImg;