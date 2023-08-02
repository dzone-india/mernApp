import {Box, Container} from '@material-ui/core';
import React, {useState, useEffect} from 'react';
import BannerImage from '../../images/clientbg.jpeg';
import PageBanner from '../page-banner';
import BlogDetailsLeft from './blog-details-left';
import BlogDetailsRight from './blog-details-right';
import {Grid} from '@material-ui/core';
import './blog-detalis.css';
import {useLocation} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: {  // medium: 960px or larger
      width: 920,
    },
    [theme.breakpoints.up('lg')]: {  // large: 1280px or larger
      width: 1170,
    },
    [theme.breakpoints.up('xl')]: {  // extra-large: 1920px or larger
      width: 1366,
    },
  },
});

function BlogDetails(props) {

  const location = useLocation();

  let query = useQuery();
  let token = query.get('token');
  const [blogId, setBlogId] = useState('');
  const [viewDetails, setViewDetails] = useState(false);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  useEffect(() => {
    setBlogId(location?.state);
    setViewDetails(true);
  }, [location?.state]);

  return (
    viewDetails ? <Box className="Blog-details-main">
      <PageBanner
        bgImage={BannerImage}
        title="Blog Details"
        currentPage="Blog Details"
      />
      <Box className="blogdetailsData">
        <Container className={styles.container} style={{display: 'flex'}}>
          <Grid md={8}>
            <Box className="BlogDetailsLeft">
              <BlogDetailsLeft blogId={blogId} />
            </Box>
          </Grid>
          <Grid md={4}>
            <BlogDetailsRight blogId={blogId} />
          </Grid>
        </Container>

      </Box>

    </Box> : null
  );
}

export default withStyles(styles)(BlogDetails);
