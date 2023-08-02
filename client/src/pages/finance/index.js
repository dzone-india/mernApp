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
import PageBanner from "../../components/page-banner";
import ApiClient from "../../api-client";
import HtmlParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({}));

const Finance = (props) => {
  const [financeSection, setFinanceSection] = useState([]);
  const [bankImage, setBankImage] = useState([]);

  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [emi, setEmi] = useState("");
  const [total, setTotal] = useState("");
  const [year, setyear] = useState(12);
  const [yearSelected, setYearselected] = useState(false);
  React.useEffect(() => {
    financeResponse();
  }, []);

  const financeResponse = () => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/finance/getFinanceData",
        {},
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      setFinanceSection(response.data[0] || []);
      setBankImage(response.data[0]?.media[0]?.bankImage || []);
    };
    getData();
  };

  const handleData = (e) => {
    let n = tenure * year;
    if (!yearSelected) {
      n = +tenure;
    }
    const P = +amount;
    const r = rate / (12 * 100);
    // (p*r*(1+r)*n)/ ((1+r)*(n-1))

    let emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(Math.ceil(emi));
    const interest = (P * r) / (1 - Math.pow(1 + r, -n));
    setTotal(Math.ceil(emi * n - P));
  };
  const resetData = () => {
    setEmi("");
    setTotal("");
    setAmount("");
    setTenure("");
    setRate("");
  };
  return (
    <div>
      <PageBanner
        bgImage={"/about_us.jpeg"}
        title="Finance"
        currentPage="Finance"
      />

      <Container>
        <Box className="content-wrapper">
          <Box className="about-block-item">
            <Grid container spacing={3} alignItems="center">
              <Grid
                className="about-block-images"
                item
                xs={12}
                md={5}
                className=""
              >
                <Box className="about-block-image">
                  <img src="../images/about-img.jpg" alt="" />

                  <div id="form1" class="finance-form-block">
                    <form className="form-enquiry finance-form">
                      <TextField
                        className="form-group"
                        label="Loan Amount"
                        variant="filled"
                        required
                        type="number"
                        name="amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <TextField
                        className="form-group"
                        label="Interest Rate"
                        variant="filled"
                        required
                        type="number"
                        name="rate"
                        onChange={(e) => setRate(e.target.value)}
                        value={rate}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                        <TextField
                          className="form-group"
                          label="Loan Tenure"
                          variant="filled"
                          required
                          type="number"
                          name="tenure"
                          style={{ width: "50%" }}
                          onChange={(e) => setTenure(e.target.value)}
                          value={tenure}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />

                        <div
                          class="input-group-append tenure-choice"
                          data-toggle="buttons"
                          
                        >
                          <div
                            class="btn-group btn-group-toggle"
                            data-toggle="buttons"
                            style={{display:"flex",flexDirection:"column", justifyContent:"center",alignItems:"flex-start"}}  
                          >
                            <label class="btn btn-secondary active">
                              <input
                                type="radio"
                                name="loantenure"
                                id="loanyears"
                                value="12"
                                tabindex="4"
                                checked={yearSelected}
                                autocomplete="off"
                                onChange={(e) => setYearselected(true)}
                              />
                              Years
                            </label>

                            <label class="btn btn-secondary ml-2">
                              <input
                                type="radio"
                                name="loantenure"
                                id="loanmonths"
                                value="1"
                                tabindex="5"
                                autocomplete="off"
                                checked={!yearSelected}
                                onChange={(e) => setYearselected(false)}
                              />
                              Months
                            </label>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="form-btn">
                        <Button
                          className="search-btn"
                          variant="contained"
                          onClick={(e) => handleData(e)}
                        >
                          <i
                            class="fas fa-calculator"
                            style={{ marginRight: "10px" }}
                          ></i>
                          Calculate
                        </Button>
                        <Button
                          className="search-btn"
                          variant="contained"
                          onClick={(e) => resetData(e)}
                        >
                          <i
                            class="fas fa-trash-restore"
                            style={{ marginRight: "10px" }}
                          ></i>
                          Reset
                        </Button>
                      </div>

                      <br></br>
                      {emi ? (
                        <div>
                          {/* <Typography>Principal Amount :{amount}</Typography>
                          <Typography>Interest Amount :{emi}</Typography>
                          <Typography>Total Value:{total}</Typography> */}
                          <div className="emi-container">
                            <span>EMI</span>
                            <span>&#8377; {emi}</span>
                          </div>
                          <div className="emi-details-container">
                            <span className="d-flex">
                              <span className="color1">Principal Amount</span>
                              <span className="color2">{amount}</span>
                            </span>
                            <span>+</span>
                            <span className="d-flex">
                              <span className="color1">Interest Payable</span>
                              <span className="color2">{total}</span>
                            </span>
                            <span mr={2}>=</span>
                            <span className="d-flex">
                              <span className="color1">Total Payable</span>
                              <span className="color2">{+total + +amount}</span>
                            </span>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </form>
                  </div>
                </Box>
              </Grid>
              <Grid className="about-block-summery" item xs={12} md={7}>
                <Box className="about-block-content">
                  <Typography variant="h3">{financeSection?.title} </Typography>
                  <Typography>
                    {HtmlParser(financeSection.description)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box className="page-section-header" align="center">
            <Box component="h2" className="page-section-title">
              OUR FINANCE BANK
            </Box>
          </Box>
          <Box className="finance-bank-section">
            <Box className="finance-bank-outer">
              {bankImage?.map((item, index) => {
                return (
                  <Box className="finance-bank-wrap">
                    <img src={ApiClient.SERVER_ADDRESS + "/" + item.path} />
                  </Box>
                );
              })}
              {/* <Box className="finance-bank-wrap">
                <img src="../images/bank1.jpg" alt="" />
              </Box> */}
              {/* <Box className="finance-bank-wrap">
                <img src="../images/bank2.jpg" alt="" />
              </Box>
              <Box className="finance-bank-wrap">
                <img src="../images/bank3.jpg" alt="" />
              </Box>
              <Box className="finance-bank-wrap">
                <img src="../images/bank4.jpg" alt="" />
              </Box>
              <Box className="finance-bank-wrap">
                <img src="../images/bank5.jpg" alt="" />
              </Box>
              <Box className="finance-bank-wrap">
                <img src="../images/bank6.jpg" alt="" />
              </Box>
              <Box className="finance-bank-wrap">
                <img src="../images/bank7.jpg" alt="" />
              </Box>
              <Box className="finance-bank-wrap">
                <img src="../images/bank8.jpg" alt="" />
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Finance;
