import React from 'react';
import {
    Container,

    Paper,
} from '@material-ui/core';

export const NoDataAvailable = (text) => {
    return <Container style={{padding: 20, margin: 20}}>
        <Paper elevation={2} style={{padding: 20, textAlign: 'center'}}>
            {text}
        </Paper>
    </Container>;
};