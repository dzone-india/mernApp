

import '../bread-crumbs/index.css'
import React from 'react';
import { Box, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
    );
  }

function BreadCrumbs(props){
    return(
        <Box className={'breadcurmb'}>
            <Typography className={'typo'} variant={"body1"}>
            <HomeIcon className={'icon'} fontSize="small" />
            <span>Dashboard   </span><span> > </span><span>{props.heading1}</span><span>  > </span><span>{props.heading2}</span>
            </Typography>
        </Box>
    )
}

export default BreadCrumbs;

{/* <span>></span> */}