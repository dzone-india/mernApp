import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AuthorImage from '../../images/client_1.jpg'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: '36ch'
  },
  inline: {
    display: 'inline',
  },
}));

function PostComments(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start" className="commentsBox">
        <ListItemAvatar className="commentAvatrImage">
          <Avatar alt="Remy Sharp" src={AuthorImage} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography className="postedName">Rosalina Kelian</Typography>  
            }
          secondary={
            <React.Fragment>
                <Typography className="postedDate">19TH MAY 2018</Typography>
              {/* <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography> */}
              {"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim laborumab. perspiciatis unde omnis iste natus error."}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}


export default PostComments;