import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import "../about-us.css";
import PageBanner from "../../../components/page-banner";
import ApiClient from "../../../api-client";
import HtmlParser from "react-html-parser";
import "./invest-with-us.css";
const useStyles = makeStyles((theme) => ({
  detailImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "50%",
    width: 100,
    padding: "10px",
    objectFit: "fill",
    border: "2px solid orange",
    backgroundColor: "lightcyan",
    color: "orange",
    textShadow: "1px 1px 1px #ccc",
    fontSize: "3em",
    margin: "auto",
    textAlign: "center",
    width: "150px",
    height: "150px",
  },
}));

// const ps = document.querySelectorAll(".box-text >p");
// const observer = new ResizeObserver((entries) => {
//   for (let entry of entries) {
//     debugger;
//     entry.target.classList[
//       entry.target.scrollHeight > entry.contentRect.height ? "add" : "remove"
//     ]("truncated");
//   }
// });

// ps.forEach((p) => {
//   observer.observe(p);
// });
const InvestWithUs = (props) => {
  const classes = useStyles();
  const [readMore, setReadMore] = useState();
  const [data, setData] = useState(null);
  const [checkedState, setCheckedState] = useState([false, false, false]);
  useEffect(() => {
    populateInvestWithUsDetails();
  }, []);
  const onReadClickHandler = (index, entry) => {
    debugger;
    const readMoreTemp = [...readMore];
    let readMode = readMoreTemp[index];
    readMode = !readMode;
    if (readMode) {
      entry.target.classList["add"]("truncated");
    } else {
      entry.target.classList["remove"]("truncated");
    }
    readMoreTemp[index] = readMode;
    setReadMore(readMoreTemp);

    // if (!entry.contentRect) {
    //   entry.target.classList["add"]("truncated");
    // } else {
    //   entry.target.classList[
    //     entry.target.scrollHeight > entry.contentRect.height ? "add" : "remove"
    //   ]("truncated");
    // }
  };
  debugger;
  const populateInvestWithUsDetails = () => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/investWithUs/getActiveInvestWithUs",
        {},
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );

      setData(response.data);
      setReadMore(Array(data?.whatWeDo.length).fill(false));
      // console.log('About us details', aboutUsInfo, aboutSection);
    };
    getData();
  };
  let img = "no-image-available-icon-6.png";
  let banner = "no-image-available-icon-6.png";
  console.log("data", data);
  if (data) {
    img = data?.media[0]?.image[0]?.path
      ? ApiClient.SERVER_ADDRESS + "/" + data?.media[0]?.image[0]?.path
      : "no-image-available-icon-6.png";
    banner = data?.media[0]?.bannerImage[0]?.path
      ? ApiClient.SERVER_ADDRESS + "/" + data?.media[0]?.bannerImage[0]?.path
      : "no-image-available-icon-6.png";
  }
  return (
    <div style={{ background: "#fff" }}>
      <PageBanner
        bgImage={banner}
        title="Invest With Us"
        currentPage="Invest With Us"
      />

      <Container>
        <Box className="content-wrapper">
          <Box className="about-page-item">
            <Box className="about-page-content" align="center">
              <Typography variant="h3">
                {data?.whatWeDoHeader || "What We Do"}
              </Typography>
              <Typography>{HtmlParser(data?.whatWeDoDescription)}</Typography>
            </Box>
          </Box>
          <Box
            className="about-page-item"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Box style={{ flexBasis: "60%" }}>
              {data?.whatWeDo.map((whatWeDo, index) => {
                return (
                  <Grid
                    key={whatWeDo.title}
                    container
                    spacing={3}
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      // flexWrap: "wrap",
                      flexBasis: "100%",
                      justifyContent: "center",
                    }}
                  >
                    <Grid
                      className="about-page-summery"
                      item
                      xs={12}
                      md={12}
                      // style={{ flexBasis: "60%" }}
                    >
                      <Grid
                        container
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Grid item xs={3} md={3} style={{ margin: "auto" }}>
                          <div
                            className={classes.detailImage}
                            style={{
                              color: "coral",
                              backgroundColor: "cornsilk",
                            }}
                          >
                            {/* <i class="fas fa-user-tie"></i> */}
                            <img
                              src={
                                ApiClient.SERVER_ADDRESS +
                                "/" +
                                data?.media[0]?.whatWeDoImages[index]?.path
                              }
                              className={`${classes.detailImage} box-img`}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={9} md={9} className="">
                          <Box className="about-page-content">
                            <Typography variant="h5">
                              {" "}
                              {HtmlParser(whatWeDo.title)}
                            </Typography>
                            <div className="box-text">
                              <input
                                type="checkbox"
                                id={`expanded${index}`}
                                defaultChecked={checkedState[0]}
                                onChange={() =>
                                  setCheckedState((prevChState) => {
                                    // const newState = [...prevChState];
                                    prevChState[0] = !prevChState[0];
                                    return [...prevChState];
                                  })
                                }
                                // checked={checkedState[0]}
                              />
                              {HtmlParser(whatWeDo.description)}

                              <label
                                htmlFor={`expanded${index}`}
                                role="button"
                                style={{ cursor: "pointer" }}
                                onClick={onReadClickHandler.bind(null, index)}
                              >
                                read{" "}
                                {readMore
                                  ? readMore[index]
                                    ? "less"
                                    : "more"
                                  : "more"}
                              </label>
                            </div>
                            {/* <Typography>{HtmlParser(data?.description)}</Typography> */}
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
            </Box>
            <Grid
              className="about-page-images"
              item
              xs={12}
              md={6}
              className={classes.style2}
              style={{
                flexBasis: "40%",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Box
                className="about-page-image"
                style={{
                  margin: "auto",
                  // flexDirection:"row",
                  // justifyContent: "center",
                  // alignItems: "center",
                  display: "block",
                  flexBasis: "100%",
                  height: "50%",
                  width: "100%",
                  background: `url('${
                    ApiClient.SERVER_ADDRESS +
                    "/" +
                    data?.media[0]?.image[0]?.path
                  }'),rgba(0,0,0,.6)`,
                  position: "relative",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                {/* <img src="https://images.unsplash.com/photo-1593642633279-1796119d5482?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60" alt="" /> */}
              </Box>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Box className="invest-items-wrapper">
        <Container>
          <Box className="page-section-header" align="center">
            <Box component="h2" className="page-section-title">
              {data?.howToInvestTitle || "How We Invest"}
            </Box>
          </Box>
          <Box className="invest-items">
            <Grid container spacing={3}>
              {(data?.howToInvest || []).map((details, i) => {
                debugger;
                return (
                  <Grid className="invest-item" item xs={12} md={4}>
                    <Box className="client-block-icon">
                      <img
                        src={
                          ApiClient.SERVER_ADDRESS +
                          "/" +
                          data?.media[0]?.howToInvestImages[i]?.path
                        }
                        className={`${classes.detailImage} box-img`}
                      />
                      {/* 
                      <i
                        className={`fas ${details.icon}`}
                        style={{
                          color: "#FF7601",
                          fontSize: 40,
                          padding: 0,
                          margin: 20,
                        }}
                        aria-hidden="true"
                      ></i> */}
                    </Box>
                    <Typography variant="h4">{details.title}</Typography>
                    <Typography> {details.detail}</Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default InvestWithUs;
