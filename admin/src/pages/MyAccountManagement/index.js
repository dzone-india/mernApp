import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    height: 250,
    paddingTop: "56.25%", // 16:9
  },
});

export default function Resume() {
  const classes = useStyles();
  let userData = JSON.parse(window.localStorage.getItem("user"));
  return (
    <div>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <Grid>
          <Box fontWeight="fontWeightLight" m={3}>
            <Typography variant="h2" component="p" color="primary">
              {userData.firstName} {userData.lastName}
            </Typography>
          </Box>
        </Grid>
        <Grid>
          <Box fontWeight="fontWeightLight" m={4}></Box>
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid container item xs={6} spacing={2}>
          <React.Fragment>
            <Grid item xs={12}>
              <Box fontWeight="fontWeightLight" m={2}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Email
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {userData.email}
                    </Typography>

                    <Typography variant="h5" component="h2">
                      Phone
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {userData.countryCode} {userData?.mobile}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </React.Fragment>
        </Grid>

        <Grid container item xs={6} spacing={2}>
          <React.Fragment>
            <Grid item xs={12}>
              <Box fontWeight="fontWeightLight" m={2}>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      Image
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      <CardMedia
                        className={classes.media}
                        image={userData?.image}
                        // image="https://material-ui.com/static/images/cards/paella.jpg"
                        title="Paella dish"
                      />
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </React.Fragment>
        </Grid>
      </Grid>
    </div>
  );
}
