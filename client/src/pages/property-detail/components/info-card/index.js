import React from "react";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
  Paper,
} from "@material-ui/core";
import "./info-card.css";

const useStyles = makeStyles((theme) => ({
    text1: {
      fontFamily: '"Open Sans",sans-serif',
      color: "#FF7601",
      fontSize: 14,
      marginTop: 10,
    },
    text2: {
      fontFamily: '"Open Sans",sans-serif',
      color: "#333333",
      fontSize: 18,
      fontWeight: "bold",
    },
    text3: {
      fontFamily: '"Open Sans",sans-serif',
      color: "#666666",
      fontSize: 14,
    },
    text4: {
      fontFamily: '"Open Sans",sans-serif',
      color: "#333333",
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10
    },
    text5: {
      fontFamily: '"Open Sans",sans-serif',
      color: "#FF7601",
      fontSize: 20,
      fontWeight: "bold",
    },
    text6: {
      fontFamily: '"Open Sans",sans-serif',
      color: "#888888",
      fontSize: 15,
      fontWeight: 400,
      lineHeight: 1.8
    },
    features: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: 20,
    },
    icon: {
      color: "#FF7601",
      fontSize: 20,
      paddingRight: 10,
    },
    btn1: {
      borderRadius: 12,
      color: "#FFFFFF",
      textTransform: "none",
      fontFamily: '"Open Sans",sans-serif',
      backgroundColor: "#FF7601",
    },
    btn2: {
      borderRadius: 12,
      color: "#666666",
      textTransform: "none",
      fontFamily: '"Open Sans",sans-serif',
      backgroundColor: "#ECECEC",
    },
    style1: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    }
  }));

  const InfoCard = props => {
      const classes = useStyles();
      const {item, children, reviewCount = null} = props;

      const review_count = reviewCount ? ` (${reviewCount})` : null;

      return (
        <Grid container>
        <Grid item xs={12} md={12} style={{marginTop: 20}}>
          <Paper style={{padding: 20}}>
              <Grid container>
                  <Grid item xs={12} md={12}>
                      <Typography className={classes.text4}>{item?.title}{review_count}</Typography>
                      {children}
                  </Grid>
              </Grid>
          </Paper>
        </Grid>
    </Grid>
      );
  }

  export default InfoCard;