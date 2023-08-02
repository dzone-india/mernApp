import React, { useState, useEffect } from "react";
import { makeStyles, Box, Grid } from "@material-ui/core";
// import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import "./search-box.css";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Icon } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ApiClient from "../../api-client";

const Type = {
  RENT: "Rent",
  SELL: "Sell",
  CONSTRUCTION: "Construction",
  INTERIOR: "Interior",
};
Object.freeze(Type);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "100%",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

const SearchBox = (props) => {
  const classes = useStyles();
  // create state variables for each input
  const [type, setType] = useState(Type.SELL);
  const [pType, setPType] = useState("");
  const [minAmount, setMinBudget] = useState("");
  const [maxAmount, setMaxBudget] = useState("");
  const [keyword, setkeyword] = useState("");
  const [cityOptions, setCityOptions] = useState("");
  const [budgetList, setBudgetList] = useState([]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    // handleClose();
    console.log("k", keyword);
  };

  useEffect(() => {
    populateCity();
    populateBudgetList();
  }, []);

  const populateBudgetList = () => {
    const getData = async () => {
      const minmaxvalues = [
        "",
        "10000",
        "50000",
        "100000",
        "500000",
        "1000000",
        "1500000",
        "2000000",
        "2500000",
        "3000000",
        "3500000",
        "4000000",
        "4500000",
        "5000000",
        "1 Crore",
        "2 Crores",
        "more than 2 Crores",
      ];
      const budgetArr = [];
      minmaxvalues.forEach((value) =>
        budgetArr.push({
          value: value,
          label: value,
        })
      );
      // const minBudget = response?.data?.minAmount || 0;
      // const maxBudget = response?.data?.maxAmount || 0;

      // const budgetArr = [];

      // for (let value = minBudget; value <= maxBudget; value += 100000) {
      //     budgetArr.push({
      //         value: value,
      //         label: value,
      //     });
      // }

      setBudgetList(budgetArr);
      //   console.log("populateSocialMediaLinks details", response.data);
      console.log("budgetArr", budgetArr);
    };
    getData();
  };

  useEffect(() => {
    if (props.searchPayload) {
      const searchDetails = props.searchPayload;

      setType(searchDetails?.type || Type.RENT);
      setPType(searchDetails?.pType || "");
      setkeyword(searchDetails?.keyword || "");
      setMaxBudget(searchDetails?.maxAmount || "");
      setMinBudget(searchDetails?.minAmount || "");
    }
  }, [props]);

  const populateCity = () => {
    const getData = async () => {
      const response = await ApiClient.call(
        ApiClient.REQUEST_METHOD.POST,
        "/property/getSearchTerms",
        {},
        {},
        { Cookie: ApiClient.cookie, Authorization: ApiClient.authorization },
        false
      );
      const data = processData(response.data || []);
      debugger;
      setCityOptions(data);
      console.log("setkeyword", response);
    };
    getData();
  };

  const processData = (data) => {
    return data.map((city) => {
      return { label: city };
    });
  };

  const propertyType = [
    {
      value: "RESIDENTIAL",
      label: "Residental",
    },
    {
      value: "COMMERCIAL",
      label: "Commercial",
    },
  ];

  const minBudget = [
    {
      value: "500000",
      label: "5 Lac",
    },
    {
      value: "1000000",
      label: "10 Lac",
    },
    {
      value: "2000000",
      label: "20 Lac",
    },
    {
      value: "3000000",
      label: "30 Lac",
    },
    {
      value: "4000000",
      label: "40 Lac",
    },
    {
      value: "5000000",
      label: "50 Lac",
    },
  ];

  const maxBudget = [
    {
      value: "500000",
      label: "5 Lac",
    },
    {
      value: "1000000",
      label: "10 Lac",
    },
    {
      value: "2000000",
      label: "20 Lac",
    },
    {
      value: "3000000",
      label: "30 Lac",
    },
    {
      value: "4000000",
      label: "40 Lac",
    },
    {
      value: "5000000",
      label: "50 Lac",
    },
  ];
  console.log("keyword", keyword);

  return (
    <Box id="search-box" className="search-container">
      <Box
        className="search-wrapper"
        style={{ height: "fit-content", margin: "auto" }}
      >
        <Grid id="type">
          <Box
            className={type === Type.SELL ? "selected" : ""}
            onClick={() => setType(Type.SELL)}
          >
            {" "}
            SELL
          </Box>
          <Box
            className={type === Type.RENT ? "selected" : ""}
            onClick={() => setType(Type.RENT)}
          >
            RENT
          </Box>
          {/* <Box className={type === Type.CONSTRUCTION ? 'selected' : ''} onClick={() => setType(Type.CONSTRUCTION)} > CONSTRUCTION </Box>
                    <Box className={type === Type.INTERIOR ? 'selected' : ''} onClick={() => setType(Type.INTERIOR)}> INTERIOR</Box> */}
        </Grid>
        <Box id="search-continer" className="search-form">
          <Box className="search-form-area">
            <Grid container spacing={2}>
              <Grid className="search-form-item" item xs={6} md={3}>
                <Box className="search-form-wrap">
                  <Box className="form-icon-wrap">
                    <i class="fas fa-map-marker-alt"></i>
                  </Box>
                  <Autocomplete
                    disablePortal
                    className="search-form-group"
                    id="city-locality"
                    variant="filled"
                    freeSolo
                    options={cityOptions}
                    // value={keyword}
                    onInputChange={(e) => {
                      debugger;
                      setkeyword(e.target.value);
                    }}
                    // sx={{width: 300}}
                    renderInput={(params) => (
                      <TextField
                        id="city-locality"
                        variant="filled"
                        label="City, Locality"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <i class="fas fa-map-marker-alt"></i>
                            </InputAdornment>
                          ),
                        }}
                        {...params}
                      />
                    )}
                  />

                  {/* <TextField
                                    id="city-locality"
                                    label="city, locality"
                                    variant="filled"
                                    required
                                    value={keyword}
                                    onChange={e => setkeyword(e.target.value)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start" style={{color: "red", marginLeft: -5}}><Icon fontSize="small" style={{color: "#ff7600"}}>room</Icon></InputAdornment>,
                                    }}
                                /> */}
                  <Divider
                    className="search-form-divider"
                    orientation="vertical"
                  />
                </Box>
              </Grid>
              <Grid className="search-form-item" item xs={6} md={3}>
                <Box className="search-form-wrap">
                  <Box className="form-icon-wrap">
                    <i class="fas fa-home"></i>
                  </Box>
                  <TextField
                    className="search-form-group"
                    id="property-type"
                    select
                    label="Property type"
                    value={pType}
                    variant="filled"
                    onChange={(e) => setPType(e.target.value)}
                    InputProps={
                      {
                        //startAdornment: <InputAdornment position="start"><i class="fas fa-home"></i></InputAdornment>,
                      }
                    }
                  >
                    {propertyType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Divider
                    className="search-form-divider"
                    orientation="vertical"
                  />
                </Box>
              </Grid>
              <Grid className="search-form-item" item xs={6} md={3}>
                <Box className="search-form-wrap">
                  <Box className="form-icon-wrap">
                    <i class="fas fa-rupee-sign"></i>
                  </Box>
                  <TextField
                    className="search-form-group"
                    id="budget"
                    select
                    label="Budget(Min Price)"
                    value={minAmount}
                    variant="filled"
                    onChange={(e) => setMinBudget(e.target.value)}
                    InputProps={
                      {
                        //startAdornment: <InputAdornment position="start" ><i class="fas fa-rupee-sign"></i></InputAdornment>,
                      }
                    }
                  >
                    {budgetList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Divider
                    className="search-form-divider"
                    orientation="vertical"
                  />
                </Box>
              </Grid>
              <Grid className="search-form-item" item xs={6} md={3}>
                <Box className="search-form-wrap">
                  <Box className="form-icon-wrap">
                    <i class="fas fa-rupee-sign"></i>
                  </Box>
                  <TextField
                    className="search-form-group"
                    id="budget"
                    select
                    label="Budget(Max Price)"
                    value={maxAmount}
                    variant="filled"
                    onChange={(e) => {
                      setMaxBudget(e.target.value);
                      console.log("Max budget", e.target.value);
                    }}
                    InputProps={
                      {
                        //startAdornment: <InputAdornment position="start" ><i class="fas fa-rupee-sign"></i></InputAdornment>,
                      }
                    }
                  >
                    {budgetList.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Grid>
            </Grid>
            <Grid className="search-form-button">
              {/* {keyword && pType && maxAmount && minAmount && type ? */}
              <Button
                class="mb-search__btn"
                type="submit"
                onClick={() => handleSubmit}
                component={RouterLink}
                to={{
                  pathname: "/search-property-details",
                  state: {
                    keyword,
                    pType,
                    maxAmount: maxAmount === "" ? 0 : +maxAmount,
                    minAmount: minAmount === "" ? 0 : +minAmount,
                    type,
                  },
                }}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
              {/* : null */}
              {/* } */}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchBox;
