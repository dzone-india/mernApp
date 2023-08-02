import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  makeStyles,
  Box,
  TextField,
  Button,
} from "@material-ui/core";
import PageBanner from "../../../components/page-banner";
import "../my-account.css";
import ApiClient from "../../../api-client";
import * as Snackbar from "../../../redux/actions/SnackbarActions";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));

const MyBooking = (props) => {
  const [name, setName] = useState("");
  const [booking, setBookingList] = useState([]);

  const { classes } = props;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setName(user.firstName + " " + user.lastName);
    populateDirectorDetails();
  }, []);

  const populateDirectorDetails = () => {
    const getData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/users/getUserBookings",
        { userId: user._id },
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        true
      );

      setBookingList(response?.data || []);
      // console.log('About us details', aboutUsInfo, aboutSection);
    };
    try {
      getData();
    } catch (e) {
      Snackbar.showFailSnackbar(
        "We are facing some issue Please try again later."
      );
      console.log("populateDirectorDetails::e", e);
    }
  };
  return (
    <div>
      <PageBanner
        bgImage={"/about_us.jpeg"}
        title="My Booking"
        currentPage="My Booking"
      />

      <Container>
        <Box className="content-wrapper">
          <Grid container spacing={3}>
            <Grid item xs={12} md={3} className="sidebar-section">
              <Box className="box-item">
                <Box className="box-wrap box-border-bottom box-radius">
                  <Box className="user-intro box-body">
                    {/* <Box className="user-icon">
                      {" "}
                      <img src="images/profile-img.jpg" alt="" />{" "}
                    </Box> */}
                    <Box className="user-info">
                      <h4> {name}</h4>
                      {/* <p>Permium</p> */}
                    </Box>
                  </Box>
                  <Box className="box-body p-0">
                    <ul className="sidebar-account-menu">
                      <li>
                        <a href="/my-account">
                          {" "}
                          <i className="fas fa-house-user"></i>My Account{" "}
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        <a href="/my-profile">
                          {" "}
                          <i className="far fa-user"></i>My Profile{" "}
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        <a href="/my-property">
                          {" "}
                          <i className="fas fa-building"></i>My Property{" "}
                        </a>{" "}
                      </li>
                      <li className="active">
                        {" "}
                        <a href="/my-booking">
                          {" "}
                          <i className="far fa-list-alt"></i>My Booking{" "}
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        <a href="my-favorite">
                          {" "}
                          <i className="far fa-heart"></i>My Favorite{" "}
                        </a>{" "}
                      </li>
                      <li>
                        {" "}
                        <a className="logout" href="#">
                          <i className="fas fa-sign-out-alt"></i>Log out
                        </a>{" "}
                      </li>
                    </ul>
                  </Box>
                </Box>
              </Box>
            </Grid>
            {/* <!-- sidebar-section --> */}
            <Grid item xs={12} md={9} className="content-area">
              <Box className="content-section">
                <Box className="box-item">
                  <Box className="box-wrap box-border-bottom box-radius">
                    <Box className="box-header">
                      <h5 className="box-title">My Booking Lists</h5>
                    </Box>
                    <Box class="box-body">
                      {booking?.map((item, index) => {
                        debugger;
                        return (
                          <Box class="booking-table">
                            <Box class="tabel-row">
                              <Box class="table-cell">
                                Booking No.-{item?._id}
                              </Box>
                              <Box class="table-cell text-right">
                                {item?.created}
                              </Box>
                            </Box>
                            <Box class="tabel-row">
                              <Box class="table-cell booking-img">
                                <a href="#">
                                  <img
                                    src={
                                      item?.images[0]?.mainImage[0]?.path
                                        ? ApiClient.SERVER_ADDRESS +
                                          "/" +
                                          item?.images[0]?.mainImage[0]?.path
                                        : "/no-image-available-icon-6.png"
                                    }
                                    width="75"
                                    height="75"
                                  />
                                </a>
                              </Box>
                              <Box class="table-cell">
                                <p class="booking-title">
                                  {item?.propertyId?.nameOfProject}
                                </p>
                                <p class="booking-status booking-sucess">
                                  Booking Sucessfully!
                                </p>
                              </Box>
                              <Box class="table-cell text-right booking-total">
                                <p class="booking-price">
                                  <i class="fas fa-rupee-sign"></i>{" "}
                                  {item?.bookingAmount}
                                </p>
                                <p class="booking-view">
                                  <Button
                                    component={RouterLink}
                                    to={{
                                      pathname: "/home-detail",
                                      state: item?._id,
                                    }}
                                  >
                                    View
                                  </Button>
                                </p>
                              </Box>
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
            {/* <!--content-area--> */}
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default MyBooking;
