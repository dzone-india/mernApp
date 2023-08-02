import {Box, Container, Grid, Paper, Typography} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import blogDetailsImage from '../../images/Happy-Family.jpg';
import AuthorImage from '../../images/client_1.jpg';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import PostComments from './comments';
import ApiClient from '../../api-client';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'react-moment';

function BlogDetailsLeft(props) {

    const [blogDetails, setBlogDetails] = useState({});

    useEffect(() => {
        const blogId = props.blogId;
        console.log("blogId", blogId);
        populateBlogDetails(blogId);
    }, []);

    const populateBlogDetails = (blogId) => {
        const getData = async () => {
            const response = await ApiClient.call(ApiClient.REQUEST_METHOD.POST, '/blog/getBlogData', {_id: blogId}, {}, {Cookie: ApiClient.cookie, Authorization: ApiClient.authorization}, false);
            setBlogDetails(response.data);
            console.log('populateBlogDetails', response.data);
        };
        getData();
    };
    console.log('blogDetails', blogDetails);
    const img = blogDetails.blogImage && blogDetails?.blogImage[0]?.path ? ApiClient.SERVER_ADDRESS + "/" + blogDetails?.blogImage[0]?.path : 'no-image-available-icon-6.png';

    return (
        <Paper elevation={0} style={{padding: 20, margin: 20, marginTop: 40}} className="Leftgrid">

            <>
                <img src={img} alt="blogDetailsImage" />
                <Grid container className="detailsheadingData">
                    <Grid item xs={3} lg={3} md={3} sm={3} className="date">
                        <Typography className="dateText"><Moment format="DD">{blogDetails?.date}</Moment> <br /> <span className="month"><Moment format="MMM">{blogDetails?.date}</Moment></span></Typography>
                    </Grid>
                    <Grid item xs={9} lg={9} md={9} sm={9} className="DetailsHeading">
                        <Typography className="DetailsText">{blogDetails?.title}</Typography>
                        <Typography></Typography>
                        {/* <Typography className="providedBy"><span>By Admin</span> <span> Advice, Fitness</span></Typography> */}
                    </Grid>
                </Grid>
            </>
            <Typography className="blogDescription">{ReactHtmlParser(blogDetails?.description)}</Typography>
            {/* <Box className="PostAuthor">
                    <Box className="authorphoto">
                        <img src={AuthorImage} alt="author Image" />
                    </Box>
                    <Typography className="authorName">Rosalina William</Typography>
                    <Grid container >
                        <Grid item xs={12} md={12} className="SocailMedia">
                            <Box className="social_icon">
                                <FacebookIcon style={{color: '#777777', fontSize: 20, padding: 0, }} />
                            </Box>
                            <Box className={`social_icon`}>
                                <TwitterIcon style={{color: '#777777', fontSize: 20, padding: 0, }} />
                            </Box>
                            <Box className={`social_icon`}>
                                <InstagramIcon style={{color: '#777777', fontSize: 20, padding: 0, }} />
                            </Box>
                            <Box className={`social_icon`}>
                                <LinkedInIcon style={{color: '#777777', fontSize: 20, padding: 0, }} />
                            </Box>
                        </Grid>
                    </Grid>
                    <Typography className="blogDescription">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                </Box> */}
            {/* <PostComments /> */}
        </Paper>

    );
}

export default BlogDetailsLeft;
