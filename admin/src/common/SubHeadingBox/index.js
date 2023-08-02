import { Box, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import './index.css'


function SubHeading(props){
    return(
        <Box className="SubHeadingText">
            <Typography variant="body1" className="panel-heading">{props.heading}</Typography>
        </Box>
    )
}

export default SubHeading;