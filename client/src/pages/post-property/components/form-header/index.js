

import './index.css'
import React from 'react';
import { Box } from '@material-ui/core';


function FormHeader(props){
    return(
        <Box className={'form-header'}>
            <h1 className="title-heading">{props.heading1} </h1><span>{props.heading2}</span>
        </Box>
    )
}

export default FormHeader;