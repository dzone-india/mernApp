import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, Box } from "@mui/material";
import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as DashboardAction from "../../redux/actions/DashboardAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const colors = [
  "#FFCA03",
  "#630000",
  "#FF87CA",
  "#396EB0",
  "#009DAE",
  "#D06224",
  "#E6CCA9",
];
let counter = 0;
const getNextColor = () => {
  counter = counter % colors.length;
  const col = colors[counter];
  counter++;
  return col;
};
const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  text1: {
    fontFamily: '"Open Sans"',
    color: "#303030",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
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
    marginBottom: 10,
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
    lineHeight: 1.8,
  },
  text7: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#333333",
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 10,
  },
});

const HomePage = withStyles(styles)((props) => {
  const navigate = useNavigate();
  const { classes } = props;
  const dashboard = useSelector((state) => state.dashboard.list);
  console.log("dashboard", dashboard);
  const dispatch = useDispatch();
  // Declare an object
  // let ob = {
  // 	Company: "GeeksforGeeks",
  // 	Address: "Noida",
  // 	contact: +91-999999999,
  // 	mentor: {
  // 		HTML: "GFG",
  // 		CSS: "GFG",
  // 		JavaScript: "GFG"
  // 	}
  // };
  function handlelogout() {
    debugger;
    window.localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  }

  // Declare a flatten function that takes
  // object as parameter and returns the
  // flatten object
  const flattenObj = (ob) => {
    // The object which contains the
    // final result
    let result = {};

    // loop through the object "ob"
    for (const i in ob) {
      // We check the type of the i using
      // typeof() function and recursively
      // call the function again
      if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
        const temp = flattenObj(ob[i]);
        for (const j in temp) {
          // Store temp in result
          result[i + "." + j] = temp[j];
        }
      }

      // Else store ob[i] in result directly
      else {
        result[i] = ob[i];
      }
    }
    return result;
  };

  // console.log(flattenObj(ob));

  useEffect(() => {
    dispatch(DashboardAction.DashboardRequestAsync());
  }, [dispatch]);
  // return null
  const content = (title, key, value, index) => (
    <>
      <Card
        style={{
          flexBasis: "46%",
          backgroundColor: getNextColor(),
          cursor: "default",
          marginLeft: "2%",
          marginRight: "2%",
          marginBottom: "2%",
          marginTop: "2%",
        }}
        key={index}
      >
        <CardActionArea
          style={{ height: "100%", cursor: "default" }}
          key={index}
        >
          <CardContent style={{ padding: "10px" }}>
            {body(key, value)}
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
  const body = (key, value) => (
    <Link to={getUrl(key)}>
      <Grid
        item
        style={{
          display: "flex",
          flexDirection: "column",
          cursor: "default",
          justifyContent: "center",
        }}
      >
        <Grid style={{ cursor: "pointer" }}>
          <Typography
            variant="h6"
            style={{
              textTransform: "capitalize",
              textAlign: "center",
              color: "white",
            }}
          >
            {key}
          </Typography>
        </Grid>
        <Grid style={{ cursor: "pointer" }}>
          <Typography
            style={{ textAlign: "center", color: "white" }}
            variant="h6"
          >
            {value || ""}
          </Typography>
        </Grid>
      </Grid>
    </Link>
  );
  const getUrl = (key) => {
    // keys.forEach((key)=>{
    const indexOfDot = key.indexOf(".");
    const keySearch = key.substr(0, indexOfDot);
    switch (keySearch.toLowerCase()) {
      case "users":
        return "/user";
      case "properties":
        return "/property";
      case "booking":
        return "/booking";
      case "enquiry":
        return "/enquiry";
      case "sitevisit":
        return "/site-visit";
      case "callback":
        return "/callback";
      case "contactwithus":
        return "/contactus";
      case "jobapplications":
        return "/career";
      case "suppliers":
        return "/supplier";
      case "servicesEnquiry":
        return "/enquiry";
      case "properties":
        return "/property";
      default:
        return "/";
    }
    // });
  };
  const getDisplay = (
    dashObj = flattenObj(dashboard),
    prevKey = "Dashboard details",
    isEvenLevel = false,
    index = "0"
  ) => {
    debugger;
    const keys = Object.keys(dashObj);

    let container = (
      <>
        <Card
          style={{
            backgroundColor: isEvenLevel
              ? "rgb(230,230,230)"
              : "rgb(250,250,250)",
            cursor: "default",
            display: "flex",
            flexBasis: "50%",
            cursor: "default",
          }}
          key={index}
        >
          <CardActionArea>
            <CardContent
              style={{
                display: "flex",
                border: "1px solid black",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#D4B499",
              }}
            >
              {/* <Box style={{ display: "flex", justifyContent: "space-between" }}> */}
              <Typography
                gutterBottom
                variant="h2"
                component="div"
                style={{
                  textTransform: "capitalize",
                  cursor: "default",
                  color: "white",
                }}
              >
                {prevKey}
              </Typography>

              {/* </Box> */}
              <Grid
                style={{
                  display: "flex",
                  border: "1px solid black",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  backgroundColor: "#fcfcfc",
                }}
              >
                {keys.map((k, ind) =>
                  typeof dashObj[k] === "object" && dashObj[k] !== null
                    ? getDisplay(dashObj[k], k, !isEvenLevel, index + k + ind)
                    : content(prevKey, k, dashObj[k], index + k + ind)
                )}
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
    return container;
  };
  return dashboard ? getDisplay() : <Typography>Data not found.</Typography>;
});

export default HomePage;
