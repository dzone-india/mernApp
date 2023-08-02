import { Box, Button, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import './emiCalculater.css'
// import CalculateIcon from '@material-ui/icons/Calculate';
import GradientIcon from '@material-ui/icons/Gradient';

function EmiCalculater(props){
    const [classAdd, setClassAdd] = useState(false)


    const buttonClick =()=>{
        setClassAdd(!classAdd)
        console.log("on click==")
    }

    return(
        <>
        <Box className={"Emaicalculater" + ' ' +  (classAdd ? "open" : null) }>
            <Button className="iconButton" onClick={buttonClick}>
                <GradientIcon style={{ color: "#FF7601", fontSize: 25, padding: 0, marginRight: 8, color: '#fff' }} />    
            </Button>
            <Box className="emiForm">
                <Typography className="CalculatorHeading">EMI Calculater</Typography>
                <TextField
                    className ="EmiInputs"
                    style={{marginTop: 15}}
                    variant="outlined" 
                    label="Loan Amount" 
                    fullWidth >
                </TextField>
                <TextField
                    className ="EmiInputs"
                    style={{marginTop: 15}}
                    variant="outlined" 
                    label="Interest Rate" 
                    fullWidth >
                </TextField>
                <TextField
                    className ="EmiInputs"
                    style={{marginTop: 15}}
                    variant="outlined" 
                    label="Loan Tenure" 
                    fullWidth >
                </TextField>
                <Box className="ParentButton">
                    <Button>Calculate</Button>
                </Box>
            </Box>
        </Box>
        </>
    )
    
}

export default EmiCalculater;