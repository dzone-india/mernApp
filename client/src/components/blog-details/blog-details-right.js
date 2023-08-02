import {Box, Button, Container, Grid, Paper, Typography} from '@material-ui/core';
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
import {TextField} from '@material-ui/core';
import './blog-detalis.css';

const btnStyle = {
    color: "#FFFFFF",
    background: "#FF7601",
    fontFamily: "Open Sans,sans-serif",
    borderRadius: "15px",
    textTransform: "none",
    margin: 10

};

function BlogDetailsRight(props) {

    const [blogDetails, setBlogDetails] = useState({});
    const [search, setSearch] = useState('');

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

        <Paper elevation={0} style={{padding: 20, margin: 20, marginTop: 40}} className="Rightgrid">
            <Typography className="heading">Search Here</Typography>
            <form>
                <TextField
                    className="form-group"
                    label="Search"
                    variant="filled"
                    required
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </form>
            <Typography className="heading">
                Recent Blogs
            </Typography>
            <Box className="recent-blogs">
                <Box className="blog-card" style={{display: 'flex'}}>
                    <img src={'property_img3.jpeg'} alt="" height={100} />
                    <Box className="blog-content">
                        <Typography className="blog-title">
                            Jack Ma & future of E-commerce
                        </Typography>
                        <Typography className="blog-date">
                            16 Dec, 2018
                        </Typography>
                    </Box>

                </Box>
            </Box>

            <Typography className="heading">
                Tags
            </Typography>

            <Box>
                <Button style={btnStyle}>Business</Button>
                <Button style={btnStyle}>Marketing</Button>
                <Button style={btnStyle}>Business</Button>
                <Button style={btnStyle}>Marketing</Button>
                <Button style={btnStyle}>Business</Button>
                <Button style={btnStyle}>Marketing</Button>
            </Box>
            <Typography className="heading">
                Stay Updated
            </Typography>

            <form>
                <TextField
                    className="form-group"
                    label="Name"
                    variant="filled"
                    required
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <TextField
                    className="form-group"
                    label="Email"
                    variant="filled"
                    required
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <Button style={btnStyle}>Subscribe</Button>
            </form>
        </Paper>

    );
}

export default BlogDetailsRight;
