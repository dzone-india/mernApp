import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./blog.css";
import PageBanner from "../../components/page-banner";
import bannerImage from "../../images/clientbg.jpeg";
import BlogImage from "../../images/blogImage.jpg";
import { Box, Container } from "@material-ui/core";
import ApiClient from "../../api-client";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Blog() {
  const classes = useStyles();
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    populateBlogList();
  }, []);

  const populateBlogList = () => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/blog/getAllActiveBlog",
        {},
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      debugger;
      const data = response.data.filter((d) => d.active);
      setBlogList(data);
      console.log("blog details", response.data);
    };
    getData();
  };

  // const {blogImage, title, _id, sortDescription, description} = blogData;
  // const img = blogImage && blogImage[0]?.path ? ApiClient.SERVER_ADDRESS + "/" + blogImage[0]?.path : 'no-image-available-icon-6.png';
  return (
    <Box className="BlogPage">
      <PageBanner
        bgImage={bannerImage}
        title="Latest News"
        currentPage="LATEST NEWS"
      />
      <Container className="CardSection">
        {(blogList || []).map((blog, i) => {
          // console.log("blog", blog);
          const { blogImage, title, _id, sortDescription, description } = blog;

          const img =
            blogImage && blogImage[0]?.path
              ? ApiClient.SERVER_ADDRESS + "/" + blogImage[0]?.path
              : "no-image-available-icon-6.png";
          return (
            <Card key={i} className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={img}
                  title="Contemplative Reptile"
                />
                <CardContent className="BlogCrad">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className="Heading"
                  >
                    {title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {sortDescription}
                  </Typography>
                  <Box className="ParentButton">
                    <Button
                      component={RouterLink}
                      to={{
                        pathname: "/blog-details",
                        state: _id,
                      }}
                    >
                      View Details{" "}
                    </Button>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Container>
    </Box>
  );
}
