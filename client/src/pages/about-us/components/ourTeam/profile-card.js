import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import {Instagram} from '@material-ui/icons';
import {
    Box,
} from '@material-ui/core';
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser';
import ApiClient from '../../../../api-client';

const useStyles = makeStyles((theme) => ({
    teamwrap: {
        backgroundColor: '#f4f4f4',
        boxShadow: 'none',
        padding: '20px',
        maxWidth: 345,
        width: '100%',
        marginBottom: '25px',
        transition: 'all 0.6s ease',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        "&:hover": {
            boxShadow: '5px 7px 9px -4px rgb(158, 158, 158)',
            transform: 'rotateY(0deg)',
        }
    },
    teamimage: {
        backgroundColor: '#fff',
        height: 120,
        width: 120,
        borderRadius: "50%",
        margin: '0 auto 15px',
    },
    teamsummery: {
        padding: '0',
        textAlign: 'center',
    },
    teamname: {
        color: '#007b5e',
        fontSize: '18px',
        marginBottom: '15px',
        fontFamily: '"Open Sans",sans-serif',
    },
    teamcontent: {
        color: '#777777',
        fontSize: '14px',
        fontFamily: '"Open Sans",sans-serif',
        marginBottom: '15px',
    },
    teamsocial: {
        padding: '0',
        textAlign: 'center',
        justifyContent: 'center',
    },
    teamsocialicon: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: '6px',
        margin: '0 3px',
        "& svg": {
            color: '#007b5e',
            height: 20,
            width: 20,
        }
    }
}));

export default function ProfileCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const profileImage = props?.member?.image[0].path ? ApiClient.SERVER_ADDRESS + "/" + props.member.image[0].path : "no-image-available-icon-6.png";

    return (
        <Card className={classes.teamwrap}>
            <Box className={classes.teamimage}>
                <img src={profileImage} className={classes.avatar} alt='' />
            </Box>
            <CardContent className={classes.teamsummery}>
                <Typography className={classes.teamname} variant="body2" component="p">
                    {props?.member?.name}
                </Typography>
                <Box className={classes.teamcontent}>
                    {ReactHtmlParser(props?.member?.description || '')}
                </Box>
            </CardContent>
            <CardActions className={classes.teamsocial} disableSpacing>
                <IconButton className={classes.teamsocialicon} aria-label="fb">
                    <FacebookIcon />
                </IconButton>
                <IconButton className={classes.teamsocialicon} aria-label="in">
                    <LinkedInIcon />
                </IconButton>
                <IconButton className={classes.teamsocialicon} aria-label="twitter">
                    < TwitterIcon />
                </IconButton>
                <IconButton className={classes.teamsocialicon} aria-label="insta">
                    <Instagram />
                </IconButton>
            </CardActions>
        </Card>
    );
}
