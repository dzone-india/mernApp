import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Grid,
  Container,
  Typography,
  Select,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  makeStyles,
  FormHelperText,
} from "@material-ui/core";
import _ from "lodash";
// import classes from "./makeStyles";
import FieldsContainer from "./components/fields-container";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import * as PropertyAction from "../../redux/actions/PropertyAction";
import { useDispatch } from "react-redux";
import propertyTypeOptions from "./utils/property-type-options.json";
import PropertyOptionManager from "./utils/PropertyOptionManager";
import APP_CONSTANTS from "./utils/constant";
import Option from "./components/option";
import Transaction from "./components/transaction";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import API_ENDPOINTS from "../../constants/api-endpoints";
// import HorizontalLinearStepper from "./stepper";
// import APP_CONSTANTS from "../../utils/constants";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

import "./post-property.css";
const personal_details_options = ["Owner", "Agent", "Builder"];
const property_details_options = ["Sell", "Rent"];

const PropertyCreateUpdate = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = ["Basic Details", "Property Details", "Upload Files"];
  const postProperty = useSelector((state) => state.PostProperty);
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    text1: {
      fontFamily: '"Open Sans"',
      color: "#303030",
      fontSize: 28,
      marginTop: 10,
      marginBottom: 10,
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
    icon: {
      color: "#FF7601",
      fontSize: 20,
      paddingRight: 10,
    },
    style1: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    btn1: {
      borderRadius: 8,
      color: "#FFFFFF",
      textTransform: "none",
      fontFamily: '"Open Sans",sans-serif',
      backgroundColor: "#FF7601",
    },
    btn2: {
      borderRadius: 15,
      color: "#FFFFFF",
      textTransform: "none",
      marginRight: 10,
      fontFamily: '"Open Sans",sans-serif',
    },
    style2: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    style3: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    box1: {
      width: 10,
      paddingRight: 5,
      paddingLeft: 5,
      color: "#333333",
    },
  }));
  // store data
  const classes = useStyles();
  const property = useSelector((state) => state.property);
  const dispatch = useDispatch();
  const propertyUnitSelectRef = useRef();
  //   state
  const [refresh, setRefresh] = useState(false);
  // const [, setIsOwner] = React.useState(false);
  const [propertyOptions, setPropertyOptions] = React.useState([]);
  const [formFields, setFormFields] = React.useState(null);
  const [currentAreaField, setCurrentAreaField] = React.useState({});
  const [areaUnit] = React.useState("");

  let propertyData = property?.propertyData;
  const [description, setDescription] = useState(
    propertyData?.projectDescription
  );
  const [amenities, setAmenities] = useState([""]);
  const [propertyDetail, setPropertyDetail] = useState([
    { key: "", Value: "" },
  ]);
  const [file, setFile] = useState("https://api.vishalconstructioncompany.com/uploads/slider/image-1633167715119.jpeg");
  console.log("propertyData", propertyData);
  const initialState = {
    iAm: propertyData?.iAm || "",
    for: propertyData?.for || "",
    pType: propertyData?.pType || "",
    postingAs: propertyData?.postingAs || "",
    nameOfProject: propertyData?.nameOfProject || "",
    Bedrooms: propertyData?.bedrooms || "",
    Balconies: propertyData?.balconies || "",
    Floor_No_: propertyData?.floorNo || "",
    Total_Floors: propertyData?.totalFloors || "",
    Furnished_Status: propertyData?.furnishedStatus || false,
    Bathrooms: propertyData?.bathrooms || "",
    Possession_Status: propertyData?.possessionStatus || "",
    longitude: propertyData?.address?.longitude || "",
    latitude: propertyData?.address?.latitude || "",
    address: propertyData?.address?.address || "",
    propertyDescription:
      propertyData?.propertyDescription?.propertyDescription || "",
    city: propertyData?.address?.city || "",
    State: propertyData?.address?.State || "",
    pinCode: propertyData?.address?.pinCode || "",
    super_Area: {
      size: propertyData?.superArea || null,
    },
    carpet_Area: {
      size: propertyData?.carpetArea || "",
    },
    built_up_Area: {
      size: propertyData?.builtUpArea || "",
    },
    available_from_month: propertyData?.availableFromMonth || "1",
    available_from_year: propertyData?.availableFromYear || "2021",
    gaurdRoom: propertyData?.gaurdRoom || "true",
    id: " ",
    status: true || "",
    Transaction_Type: propertyData?.transactionType || "",
    Property_Tag: propertyData?.propertyTag || "",

    expected_price: propertyData?.price?.expectedPrice || "",
    expected_price_per_sq_ft: propertyData?.price?.pricePerSqft || "",
    other_charges: propertyData?.price?.otherCharges || "",
    stamp_duty_registration_charges_excluded:
      propertyData?.price?.isStumpDutyRCExcluded || false,
    booking_token_amount: propertyData?.price?.bookingAmount || "",
    maintenance_charges: propertyData?.price?.maintenanceCharge || "",
    maintenance_charges_per: propertyData?.price?.maintenanceFor || "",
    brokerage: propertyData?.price?.brokerage || "",
    build_year: propertyData?.buildYear || "2005",

    Visitor_Room: propertyData?.vistorRoom || "",
    Conference_Room: propertyData?.conferenceRoom || "",
    Personal_Washroom: propertyData?.personalWashroom || false,
    No_Of_Seats: propertyData?.noOfSeats || "",
    Meeting_Rooms: propertyData?.meetingRooms || "",
    Pantry: propertyData?.Pantry || false,
  };

  const imageState = {
    exteriorView: [],
    livingRoom: [],
    badrooms: [],
    bathrooms: [],
    kitchen: [],
    floorPlan: [],
    masterPlan: [],
    locationMap: [],
    other: [],
    roomImage: [],
    conference: [],
    visitor: [],
  };
  const [state, setState] = useState(initialState);

  const [image, setImageState] = useState(imageState);
  useEffect(() => {
    let isMounted = true;
    let option = state.for;
    const clonePropertyTypeOptions = _.cloneDeep(propertyTypeOptions);
    if (option === "Sell") {
      clonePropertyTypeOptions.splice(1, 1);
    } else if (option === "Rent") {
      clonePropertyTypeOptions.splice(0, 1);
    }
    if (isMounted) setPropertyOptions(clonePropertyTypeOptions[0]);

    if (propertyData && propertyData?.amenities !== "") {
      const result = propertyData?.amenities;
      setAmenities(result);
    }
    if (propertyData && propertyData?.propertyDetails !== "") {
      const result = propertyData?.propertyDetails;
      setPropertyDetail(result);
    }

    if (state["pType"]) {
      if (isMounted) {
        const formData =
          PropertyOptionManager.getFormFieldsBySelectedPropertyType(
            state["pType"]
          );
        setFormFields(formData);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [state, propertyData, propertyTypeOptions]);
  const handleChange = (event) => {
    // debugger;
    event.preventDefault();
    const name = event.target.name.replace(/[^a-zA-Z]/gi, "_");
    setState({
      ...state,
      [name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };

  const onOptionPropertyForSelectListener = (event) => {
    let option = event.target.value;
    const clonePropertyTypeOptions = _.cloneDeep(propertyTypeOptions);
    if (option === "Sell") {
      clonePropertyTypeOptions.splice(1, 1);
    } else if (option === "Rent") {
      clonePropertyTypeOptions.splice(0, 1);
    }
    setPropertyOptions(clonePropertyTypeOptions[0]);

    setState({ ...state, ["for"]: option });
  };

  const onFeatureSelect = (feature) => {
    debugger;
    let name = feature?.fieldName?.replace(/[^a-zA-Z]/gi, "_");
    // let name = (
    //   !feature?.fieldName ? feature?.label : feature?.fieldName
    // )?.replace(/[^a-zA-Z]/gi, "_");
    setState({
      ...state,
      [name]: feature.item,
    });
  };

  const onAreaFieldSelect = (e, unit) => {
    e.preventDefault();
    // debugger;
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setCurrentAreaField({ fieldName, fieldValue });
    let name = fieldName.replace(/[^a-zA-Z]/gi, "_");
    let newfieldValue = state[name.toLowerCase()];
    if (newfieldValue) newfieldValue.size = fieldValue;
    else
      newfieldValue = {
        size: fieldValue,
        unit: unit,
      };
    setState({
      ...state,
      [name.toLowerCase()]: newfieldValue,
    });
  };

  const handleAreaUnitChange = (event) => {
    event.preventDefault();
    const fieldUnit = event.target.value;
    const { fieldName, fieldValue } = currentAreaField;
    let name = fieldName.replace(/[^a-zA-Z]/gi, "_");
    setState({
      ...state,
      [name]: {
        size: fieldValue,
        unit: fieldUnit,
      },
    });
  };

  const onTransactionOptionSelectListener = (data) => {
    let name = data.title.replace(/[^a-zA-Z]/gi, "_");
    setState({
      ...state,
      [name]: data.value,
    });
  };
  const handleSubmit = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let reqData = {
      iAm: state.iAm,
      for: state.for,
      pType: state.pType,
      postingAs: state.postingAs,
      nameOfProject: state.nameOfProject,
      balconies: state.Balconies || "0",
      floorNo: state.Floor_No_ || "0",
      totalFloors: state.Total_Floors || "0",
      furnishedStatus: state.Furnished_Status ? state.Furnished_Status : false,
      bathrooms: state.Bathrooms || "0",
      builtUpArea: state.Built_up_Area?.size,
      carpetArea: state.Carpet_Area?.size,
      possessionStatus: state.Possession_Status,
      availableFromMonth: state.available_from_month,
      availableFromYear: state.available_from_year,
      expectedPrice: state.expected_price,
      pricePerSqFt: state.expected_price_per_sq_ft,
      otherCharges: state.other_charges,
      isStumpDutyRCExcluded:
        state.stamp_duty_registration_charges_excluded || false,
      bookingAmount: state.booking_token_amount,
      maintenanceCharge: state.maintenance_charges,
      maintenanceFor: state.maintenance_charges_per,
      brokerageCharge: state.brokerage||"0",
      amenities: amenities,
      longitude: state.longitude,
      latitude: state.latitude,
      address: state.address,
      city: state.city,
      State: state.State,
      pinCode: state.pinCode,
      propertyTag: state.Property_Tag,
      transactionType: state.Transaction_Type,
      propertyDetails: propertyDetail,
      description: description,
      gaurdRoom: state.gaurdRoom||"0",
      buildYear: state.build_year||"0",
      bedrooms: state.Bedrooms||"0",
      superArea: state.Super_Area?.size,
      userId: user?._id,
      vistorRoom: state.Visitor_Room||"0",
      conferenceRoom: state.Conference_Room||"0",
      responseFromBrokers: state.response_from_brokers,
      personalWashroom: state.Personal_Washroom||false,
      noOfSeats: state.No_Of_Seats||"0",
      meetingRooms: state.Meeting_Rooms||"0",
      Pantry: state.Pantry||false,
    };

    let data = {
      mainImage: state.mainImage,
      badrooms: image.badrooms,
      bathrooms: image.bathrooms,
      exteriorView: image.exteriorView,
      floorPlan: image.floorPlan,
      kitchen: image.kitchen,
      livingRoom: image.livingRoom,
      // locationMap: image.locationMap,
      masterPlan: image.masterPlan,
      other: image.other,
      roomImage: image.roomImage,
      conference: image.conference,
      visitor: image.visitor,
    };
    console.log("reqData", reqData);
    console.log("data", data);
    debugger;
    dispatch(PropertyAction.PropertyAddRequestAsync(reqData, data));
  };
  const _renderFeaturesSection = (section, sectionIndex) => {
    const { fields, section: sectionName } = section || {};
    return (
      <>
        <FieldsContainer label={sectionName} key={sectionIndex}>
          <Grid container>
            {fields?.length > 0 &&
              fields?.map((field, fieldIndex) => {
                const {
                  label,
                  initial_counts,
                  more_counts,
                  showMore,
                  type,
                  values,
                  fieldName,
                  unit,
                } = field || {};
                // debugger;
                if (type === "option") {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={12}
                      key={fieldIndex}
                      className="pillsContainer"
                    >
                      <Option
                        label={label}
                        items={initial_counts}
                        moreOptions={more_counts}
                        showMore={showMore}
                        onSelect={onFeatureSelect}
                        value={state}
                        fieldName={fieldName}
                      ></Option>
                    </Grid>
                  );
                } else if (type === "dropdown") {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={12}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexWrap: "wrap",
                        marginTop: 10,
                      }}
                    >
                      <Typography className={classes.text3}>{label}</Typography>
                      <Select
                        native
                        variant="outlined"
                        value={state[fieldName]}
                        onChange={handleChange}
                        inputProps={{ name: fieldName }}
                        style={{
                          height: 48,
                          marginRight: 5,
                          maxHeight: 200,
                          width: 200,
                        }}
                      >
                        <option value={null}>Select {fieldName}</option>
                        {values.map((item, index) => {
                          return (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          );
                        })}
                      </Select>
                    </Grid>
                  );
                } else if (type === "textfield") {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={4}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        flexWrap: "wrap",
                      }}
                    >
                      <TextField
                        label={field?.label}
                        variant="outlined"
                        placeholder={field.placeholder}
                        fullWidth
                        style={{ marginTop: 15 }}
                      />
                      <Typography className={classes.text3}>{unit}</Typography>
                    </Grid>
                  );
                }
              })}
            <Grid
              item
              xs={12}
              md={4}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            ></Grid>
          </Grid>
        </FieldsContainer>
      </>
    );
  };

  /**
   *
   * @param {*} section - AreaSection
   */
  const _renderAreaSection = (section) => {
    const { fields, section: sectionName } = section || {};
    return (
      <>
        <FieldsContainer label={sectionName}>
          <Grid container>
            {fields?.length > 0 &&
              fields?.map((field, index) => {
                // debugger;
                const { label, type, units, placeholder } = field || {};
                if (type === "textfield") {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={12}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                      key={index}
                    >
                      <TextField
                        label={label}
                        placeholder={placeholder}
                        key={label}
                        type="number"
                        style={{
                          width: 400,
                          marginRight: 15,
                          marginBottom: 15,
                        }}
                        name={label}
                        variant="outlined"
                        onChange={(e) => {
                          // debugger
                          onAreaFieldSelect(
                            e,
                            propertyUnitSelectRef.current.querySelector(
                              "select"
                            ).value
                          );
                        }}
                        value={
                          state[field?.fieldName.toLowerCase()]
                            ? state[field?.fieldName.toLowerCase()]["size"]
                            : ""
                        }
                      />
                      {units && (
                        <Select
                          native
                          variant="outlined"
                          value={areaUnit["area-unit"]}
                          ref={propertyUnitSelectRef}
                          onChange={handleAreaUnitChange}
                          inputProps={{
                            name: "area-unit",
                          }}
                          style={{ height: 55, marginTop: -15, maxHeight: 200 }}
                        >
                          {/* <option value={null}>Select area-unit</option> */}
                          {units?.map((item, index) => {
                            return (
                              <option key={index} value={item}>
                                {item}
                              </option>
                            );
                          })}
                        </Select>
                      )}
                    </Grid>
                  );
                } else if (type === "textfields") {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={12}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                      }}
                      key={index}
                    >
                      <TextField
                        label={label}
                        placeholder={placeholder}
                        style={{
                          width: 400,
                          marginRight: 15,
                          marginBottom: 15,
                        }}
                        name={label}
                        variant="outlined"
                        type="number"
                        onChange={handleChange}
                        value={state[field?.fieldName]}
                      />
                    </Grid>
                  );
                } else if (type === "checkbox") {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.checkedA}
                          onChange={handleChange}
                          name={label}
                        />
                      }
                      label={label}
                    />
                  );
                }
              })}
          </Grid>
        </FieldsContainer>
        <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
      </>
    );
  };

  /**
   *
   * @param {*} section - TransactionSection
   */
  const _renderTransactionSection = (section) => {
    const { fields, section: sectionName } = section || {};
    return (
      <>
        <FieldsContainer label={sectionName}>
          <Grid container>
            {fields?.map((field, index) => {
              const { label, type, values, fieldName, placeholder, data } =
                field || {};
              if (type === "radio") {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{ display: "flex", flexDirection: "column" }}
                    key={index}
                  >
                    <Transaction
                      title={label}
                      options={values}
                      values={state[fieldName]}
                      onOptionSelectListener={onTransactionOptionSelectListener}
                    />
                  </Grid>
                );
              } else if (type === "dropdown") {
                return (
                  <Grid item xs={12} md={12} key={index}>
                    <Grid container>
                      <Grid item xs={12} md={12}>
                        <Typography className={classes.text3}>
                          {label}
                        </Typography>
                      </Grid>
                      {data?.map((d) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            md={3}
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <Select
                              native
                              value={state[d.fieldName]}
                              variant="outlined"
                              onChange={handleChange}
                              inputProps={{
                                name: d.fieldName,
                              }}
                              style={{
                                height: 48,
                                marginRight: 5,
                                maxHeight: 200,
                                width: 200,
                              }}
                            >
                              {/* <option value={null}>Select {d.fieldName}</option> */}
                              {d.values.map((item, index) => {
                                return d.fieldName ===
                                  "available_from_month" ? (
                                  <option key={index} value={index + 1}>
                                    {item}
                                  </option>
                                ) : (
                                  <option key={index} value={item}>
                                    {item}
                                  </option>
                                );
                              })}
                            </Select>{" "}
                            <span style={{ color: "red", fontSize: "1.2rem" }}>
                              *
                            </span>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                );
              } else if (type === "textfield") {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Box mt={2} />
                    <TextField
                      label={label}
                      variant="outlined"                      
                      placeholder={placeholder}
                      onChange={handleChange}
                      style={{ width: 300, marginBottom: 15 }}
                      name={fieldName}
                    />{" "}
                    <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  </Grid>
                );
              }
            })}
          </Grid>
        </FieldsContainer>
        <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
      </>
    );
  };

  /**
   *
   * @param {*} section - PriceSection
   */
  const _renderPriceSection = (section) => {
    const { fields, section: sectionName } = section || {};
    return (
      <>
        <FieldsContainer label={sectionName}>
          <Grid container>
            {fields?.map((field) => {
              const { label, type, values, placeholder, data, fieldName } =
                field || {};
              if (type === "textfield" && data) {
                return data.map((e, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={3}
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        label={e.label}
                        variant="outlined"
                        type="number"
                        placeholder={e.placeholder}
                        onChange={handleChange}
                        name={e.fieldName}
                        style={{ marginBottom: 15 }}
                        value={state[e.fieldName]}
                      />{" "}
                      <span style={{ color: "red", fontSize: "1.2rem" }}>
                        *
                      </span>
                    </Grid>
                  );
                });
              } else if (type === "textfield") {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      label={label}
                      variant="outlined"
                      type="number"
                      placeholder={placeholder}
                      onChange={handleChange}
                      style={{ width: 300, marginBottom: 15 }}
                      name={fieldName}
                      value={state[fieldName]}
                    />{" "}
                    <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  </Grid>
                );
              } else if (type === "text-dropdown" && field.data) {
                return field?.data?.map((e, i) => {
                  if (e.type === "textfield") {
                    return (
                      <Grid
                        item
                        xs={12}
                        md={4}
                        key={i}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TextField
                          label={e.label}
                          type="number"
                          variant="outlined"
                          name={e.fieldName}
                          onChange={handleChange}
                          placeholder={e.placeholder}
                          style={{ width: 300, marginBottom: 15 }}
                          value={state[e.fieldName]}
                        />{" "}
                        <span style={{ color: "red", fontSize: "1.2rem" }}>
                          *
                        </span>
                      </Grid>
                    );
                  } else if (e.type === "dropdown") {
                    return (
                      <Grid item xs={12} md={4} key={i}>
                        <Typography className={classes.text3}>
                          {e.label}
                        </Typography>
                        <Select
                          native
                          variant="outlined"
                          value={state[e.fieldName]}
                          onChange={handleChange}
                          inputProps={{
                            name: e.fieldName,
                          }}
                          style={{
                            height: 55,
                            marginRight: 5,
                            maxHeight: 200,
                            width: 200,
                          }}
                        >
                          <option value={null}>Select Option</option>
                          {e?.values?.length > 0 &&
                            e?.values?.map((item, index) => {
                              return (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                        </Select>{" "}
                        <span style={{ color: "red", fontSize: "1.2rem" }}>
                          *
                        </span>
                      </Grid>
                    );
                  }
                });
              } else if (type === "dropdown") {
                return (
                  <Grid item xs={12} md={12}>
                    <Typography className={classes.text3}>{label}</Typography>
                    <Select
                      native
                      value={state[fieldName]}
                      onChange={handleChange}
                      name={fieldName}
                      variant="outlined"
                      inputProps={{
                        name: fieldName,
                      }}
                      style={{
                        height: 48,
                        marginRight: 5,
                        maxHeight: 200,
                        width: 200,
                      }}
                    >
                      <option value={null}>Select Option</option>
                      {values?.length > 0 &&
                        values?.map((item, index) => {
                          return (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          );
                        })}
                    </Select>{" "}
                    <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  </Grid>
                );
              } else if (type === "checkbox" && field?.fields) {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography style={{ marginRight: 10 }}>{label}</Typography>
                    <FormGroup row>
                      {field?.fields?.length > 0 &&
                        field?.fields?.map((e, index) => {
                          return (
                            <FormControlLabel
                              key={index}
                              control={
                                <Checkbox
                                  value={state[e.fieldName]}
                                  onChange={handleChange}
                                  name={e.fieldName}
                                />
                              }
                              label={e.label}
                            />
                          );
                        })}
                    </FormGroup>
                  </Grid>
                );
              } else if (type === "checkbox") {
                return (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state[fieldName]}
                          value={state[fieldName]}
                          onChange={handleChange}
                          name={fieldName}
                        />
                      }
                      label={label}
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
        </FieldsContainer>
      </>
    );
  };

  // function useQuery() {
  //   return new URLSearchParams(useLocation().search);
  // }

  const handleRemoveAmenitiesClick = (index) => {
    const list = [...amenities];
    list.splice(index, 1);
    setAmenities(list);
  };
  const handleAminitiesInputChange = (e, index) => {
    debugger;
    const { value } = e.target;
    const list = [...amenities];
    list[index] = value;
    setAmenities(list);
  };

  // handle click event of the Add button
  const handleAddAminitiesClick = () => {
    setAmenities([...amenities, ""]);
  };

  // handle input change
  const handleDetailChange = (e, index) => {
    const { name, value } = e.target;

    const list = [...propertyDetail];
    list[index][name] = value;
    setPropertyDetail(list);
  };

  // handle click event of the Remove button
  const handleDetailRemoveClick = (index) => {
    const list = [...propertyDetail];
    list.splice(index, 1);
    setPropertyDetail(list);
  };

  // handle click event of the Add button
  const handleDetailAddClick = () => {
    setPropertyDetail([...propertyDetail, { key: "", Value: "" }]);
  };

  const handleMainImageChange = (event) => {
    // this.setState({
    setState({ ...state, ["mainImage"]: event.target.files[0] });
    setFile(URL.createObjectURL(event.target.files[0]));

    // })
  };
  //dropzone states
  const handleImageExteriorView = (file, status) => {
    let list = image;
    let data = [];
    if (status === "done") {
      if (list.exteriorView && list.exteriorView.length) {
        data = list.exteriorView;
        data[list.exteriorView.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setImageState({ ...image, ["exteriorView"]: data });
    }
  };

  const handleImageLivingRoom = (file, status) => {
    let list = image;
    let data = [];
    if (status === "done") {
      if (list.livingRoom && list.livingRoom.length) {
        data = list.livingRoom;
        data[list.livingRoom.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setImageState({ ...image, ["livingRoom"]: data });
    }
  };

  const handleImageBadrooms = (file, status) => {
    let list = image;
    let data = [];
    if (status === "done") {
      if (list.badrooms && list.badrooms.length) {
        data = list.badrooms;
        data[list.badrooms.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setImageState({ ...image, ["badrooms"]: data });
    }
  };

  const handleImageBathrooms = (file, status) => {
    let list = image;
    let data = [];
    if (status === "done") {
      if (list.bathrooms && list.bathrooms.length) {
        data = list.bathrooms;
        data[list.bathrooms.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setImageState({ ...image, ["bathrooms"]: data });
    }
  };

  const handleImageRooms = (file, status) => {
    let list = image;
    let data = [];
    if (status === "done") {
      if (list.roomImage && list.roomImage.length) {
        data = list.roomImage;
        data[list.roomImage.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setImageState({ ...image, ["roomImage"]: data });
    }
  };

  const handleImageConference = (file, status) => {
    let list = image;
    let data = [];
    if (status === "done") {
      if (list.conference && list.conference.length) {
        data = list.conference;
        data[list.conference.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setImageState({ ...image, ["conference"]: data });
    }
  };

  const handleImageVisitor = (file, status) => {
    let list = image;
    let data = [];
    if (status === "done") {
      if (list.visitor && list.visitor.length) {
        data = list.visitor;
        data[list.visitor.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setImageState({ ...image, ["visitor"]: data });
    }
  };

  const handleImageKitchen = (file, status) => {
    let list = image;
    let data = [];
    if (status === "done") {
      if (list.kitchen && list.kitchen.length) {
        data = list.kitchen;
        data[list.kitchen.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setImageState({ ...image, ["kitchen"]: data });
    }
  };

  const handleImageFloorPlan = (file, status) => {
    let list = image;
    let data = [];
    if (status === "done") {
      if (list.floorPlan && list.floorPlan.length) {
        data = list.floorPlan;
        data[list.floorPlan.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setImageState({ ...image, ["floorPlan"]: data });
    }
  };

  const handleImageMasterPlan = (file, status) => {
    let list = image;
    let data = [];
    if (status === "done") {
      if (list.masterPlan && list.masterPlan.length) {
        data = list.masterPlan;
        data[list.masterPlan.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setImageState({ ...image, ["masterPlan"]: data });
    }
  };

  const handleImageOther = (file, status) => {
    let list = image;
    let data = [];
    if (status === "done") {
      if (list.other && list.other.length) {
        data = list.other;
        data[list.other.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setImageState({ ...image, ["other"]: data });
    }
  };

  const handleChangeTextEditor = (content, editor) => {
    setDescription(content);
  };
  const isStepOptional = (step) => {
    // return step === 1;
    return false;
  };
  console.log("postProperty", postProperty);
  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const validateStep0 = () => {
    
    if (
      !state.iAm ||
      !state.for ||
      !state.pType ||
      !state.postingAs ||
      !state.nameOfProject ||
      !state.longitude ||
      !state.latitude ||
      !state.address ||
      !state.city ||
      !state.State ||
      !state.pinCode
    )
      return false;
    else return true;
  };
  const validateStep1 = () => {
    debugger;
    
    // console.log("propertyFeatures", propertyFeatures);
    console.log("currentAreaField", currentAreaField);
    debugger;
    if (
      state.Bedrooms === "0" ||
      state.Balconies === "0" ||
      state.Floor_No_ === "0" ||
      state.Total_Floors === "0" ||
      state.Bathrooms === "0" ||
      state.expected_price === "0" ||
      state.expected_price_per_sq_ft === "0" ||
      state.maintenance_charges === "0" ||
      state.booking_token_amount === "0" ||
      state.other_charges === "0" ||
      !state.Furnished_Status ||
      !state.Possession_Status ||
      !description ||
      !state.maintenance_charges_per ||
      !state.Property_Tag
    )
      return false;
    else return true;
  };
  const handleNext = () => {
    debugger;
    if (activeStep === 0) {
      // Submit Form Detials
      if (!validateStep0()) return;
    }

    if (activeStep === 1) {
      if (!validateStep1()) return;
      // Submit Form Detials
      // submitData();
    }

    if (activeStep === 2) {
      // submitData();
      handleSubmit();
      // Submit Image
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const getStepOne = () => {
    return (
      <div>
        <Grid className="form-group-item" item xs={12} sm={12} md={12}>
          <FieldsContainer
            label="Property Amenities"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {amenities.map((x, i) => {
              // debugger;
              if (state.id == " ") {
                return (
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Amenities"
                      variant="outlined"
                      placeholder="Enter Amenities"
                      style={{ width: "100%" }}
                      onChange={(e) => handleAminitiesInputChange(e, i)}
                      name="amenities"
                      value={x}
                    ></TextField>
                    <Box mt={2} mb={2} />
                    <div className="RemoveBtn">
                      {amenities.length !== 1 && (
                        <Button
                          variant="contained"
                          type="button"
                          color="primary"
                          style={{ marginRight: "10px" }}
                          className={"CanceForm"}
                          onClick={() => handleRemoveAmenitiesClick(i)}
                        >
                          Remove
                        </Button>
                      )}
                      {amenities.length - 1 === i && (
                        <Button
                          variant="contained"
                          type="button"
                          color="primary"
                          className={"SaveData"}
                          onClick={handleAddAminitiesClick}
                        >
                          Add more
                        </Button>
                      )}
                    </div>
                    <Box mt={2} />
                  </Grid>
                );
              } else {
                return (
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Amenities"
                      variant="outlined"
                      placeholder="Enter Amenities"
                      style={{ width: "100%" }}
                      onChange={(e) => handleAminitiesInputChange(e, i)}
                      name="amenities"
                      value={x}
                    ></TextField>
                    <Box mt={2} />
                    <div className="RemoveBtn">
                      {amenities.length !== 1 && (
                        <Button
                          variant="contained"
                          type="button"
                          color="primary"
                          style={{ marginRight: "10px" }}
                          className={"CanceForm"}
                          onClick={() => handleRemoveAmenitiesClick(i)}
                        >
                          Remove
                        </Button>
                      )}
                      {amenities.length - 1 === i && (
                        <Button
                          variant="contained"
                          type="button"
                          color="primary"
                          className={"SaveData"}
                          onClick={handleAddAminitiesClick}
                        >
                          Add more
                        </Button>
                      )}
                    </div>
                    <Box mt={2} />
                  </Grid>
                );
              }
            })}
          </FieldsContainer>
        </Grid>

        <Grid
          className="form-group-item"
          item
          xs={12}
          sm={12}
          md={12}
          style={{ minHeight: "40vh" }}
        >
          <Typography>
            Description{" "}
            <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
          </Typography>
          {propertyData?.projectDescription != null ? (
            <>
              <ReactQuill
                onChange={handleChangeTextEditor}
                value={
                  (description
                    ? description
                    : propertyData?.projectDescription) || ""
                }
                placeholder="Enter description"
                theme="snow"
              />
            </>
          ) : (
            <>
              <ReactQuill
                value={description || ""}
                onChange={handleChangeTextEditor}
                placeholder="Enter description"
                theme="snow"
              />
            </>
          )}
        </Grid>

        <Box style={{ marginTop: "10px" }} />
        <Grid item xs={12} md={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gaurd Room</FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="gaurdRoom"
              onChange={handleChange}
              value={
                state.gaurdRoom ? state.gaurdRoom : propertyData?.gaurdRoom
              }
            >
              <FormControlLabel
                value="true"
                aria-label="gaurdRoom"
                name="gaurdRoom"
                control={<Radio />}
                label="Yes"
              />
              <FormControlLabel
                value="false"
                aria-label="gaurdRoom"
                name="gaurdRoom"
                control={<Radio />}
                label="No"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={12}>
          <Grid container>
            {_.size(formFields) > 0 &&
              formFields?.sections?.map((section, sectionIndex) => {
                switch (section?.section_id) {
                  case APP_CONSTANTS.section_features:
                    return _renderFeaturesSection(section, sectionIndex);
                  case APP_CONSTANTS.section_area:
                    return _renderAreaSection(section, sectionIndex);
                  case APP_CONSTANTS.section_transaction:
                    return _renderTransactionSection(section, sectionIndex);
                  case APP_CONSTANTS.section_price:
                    return _renderPriceSection(section, sectionIndex);
                }
              })}
          </Grid>
        </Grid>
      </div>
    );
  };

  const getStepZero = () => {
    debugger;
    return (
      <ValidatorForm>
        <Grid container spacing={3} className="FormFildes">
          <Grid item xs={12} sm={6} md={4}>
            <FieldsContainer label="Personal Details">
              <Grid container>
                <Grid item xs={12} md={12}>
                  <Typography>I am</Typography>
                  <Select
                    native
                    variant="outlined"
                    value={state["iAm"]}
                    onChange={handleChange}
                    inputProps={{
                      name: "iAm",
                      id: "iAm",
                    }}
                    style={{
                      height: 48,
                      marginRight: 5,
                      maxHeight: 200,
                      width: "95%",
                    }}
                  >
                    <option value={null}>Select iAm</option>
                    {personal_details_options?.length > 0 &&
                      personal_details_options?.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })}
                  </Select>
                  <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography>For</Typography>
                  <Select
                    native
                    variant="outlined"
                    value={state["for"]}
                    onChange={onOptionPropertyForSelectListener}
                    inputProps={{
                      name: "for",
                      id: "for",
                    }}
                    style={{
                      height: 48,
                      marginRight: 5,
                      maxHeight: 200,
                      width: "95%",
                    }}
                  >
                    <option value={null}>Select For</option>
                    {property_details_options?.length > 0 &&
                      property_details_options?.map((item, index) => {
                        return (
                          <option key={index} value={item}>
                            {item}
                          </option>
                        );
                      })}
                  </Select>
                  <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography>Property Type</Typography>
                  <Select
                    native
                    variant="outlined"
                    value={state["pType"]}
                    onChange={handleChange}
                    inputProps={{
                      name: "pType",
                      id: "pType",
                    }}
                    style={{
                      height: 48,
                      marginRight: 5,
                      maxHeight: 200,
                      width: "95%",
                    }}
                  >
                    <option value={null}>Select Property Type</option>

                    {propertyOptions?.items?.length > 0 &&
                      propertyOptions?.items?.map((item, index) => {
                        return (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                  </Select>
                  <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                </Grid>
              </Grid>
            </FieldsContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FieldsContainer label="Property Details">
              <Box mt={2} />
              {propertyDetail.map((x, i) => {
                return (
                  <>
                    <Grid container>
                      <Grid item xs={12} md={8}>
                        <TextField
                          label="Key"
                          variant="outlined"
                          placeholder="Enter Key"
                          style={{ width: "100%" }}
                          onChange={(e) => handleDetailChange(e, i)}
                          name="key"
                          value={x.key}
                        />
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <TextField
                          label="Value"
                          variant="outlined"
                          placeholder="Enter Value"
                          style={{ width: "100%" }}
                          onChange={(e) => handleDetailChange(e, i)}
                          name="Value"
                          value={x.Value}
                        ></TextField>
                      </Grid>
                      <Box mt={2} />
                      <div className="RemoveBtn">
                        {propertyDetail.length !== 1 && (
                          <Button
                            variant="contained"
                            type="button"
                            color="primary"
                            className={"CanceForm"}
                            style={{ marginRight: "10px" }}
                            onClick={() => handleDetailRemoveClick(i)}
                          >
                            Remove
                          </Button>
                        )}
                        {propertyDetail.length - 1 === i && (
                          <Button
                            variant="contained"
                            type="button"
                            color="primary"
                            className={"SaveData"}
                            onClick={handleDetailAddClick}
                          >
                            Add More
                          </Button>
                        )}
                      </div>
                      <Box mt={2} />
                    </Grid>
                  </>
                );
              })}
            </FieldsContainer>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FieldsContainer label="Property Location">
              <Grid container>
                <Grid item xs={12} md={12} className={classes.style1}>
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextValidator
                      label="Longitude"
                      variant="outlined"
                      placeholder="Enter Longitude"
                      onChange={handleChange}
                      name="longitude"
                      style={{ width: "95%" }}
                      value={state.longitude}
                      type="number"
                      validators={["required"]}
                      errorMessages={["longitude field is required"]}
                    />
                    <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  </Box>
                  <Box mt={2} />
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextValidator
                      label="Latitude"
                      variant="outlined"
                      placeholder="Enter Latitude"
                      type="number"
                      style={{ width: "100%" }}
                      onChange={handleChange}
                      style={{ width: "95%" }}
                      name="latitude"
                      value={state.latitude}
                      validators={["required"]}
                      errorMessages={["latitude field is required"]}
                    />
                    <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  </Box>
                  <Box mt={2} />
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextValidator
                      label="Address"
                      variant="outlined"
                      placeholder="Enter Address"
                      style={{ width: "100%" }}
                      onChange={handleChange}
                      name="address"
                      value={state.address}
                      style={{ width: "95%" }}
                      validators={["required"]}
                      errorMessages={["address field is required"]}
                    />
                    <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  </Box>
                  <Box mt={2} />
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextValidator
                      label="City"
                      variant="outlined"
                      placeholder="Enter City"
                      style={{ width: "100%" }}
                      onChange={handleChange}
                      name="city"
                      style={{ width: "95%" }}
                      value={state.city}
                      validators={["required"]}
                      errorMessages={["city field is required"]}
                    />
                    <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  </Box>
                  <Box mt={2} />
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextValidator
                      label="State"
                      variant="outlined"
                      placeholder="Enter State"
                      style={{ width: "100%" }}
                      onChange={handleChange}
                      name="State"
                      style={{ width: "95%" }}
                      value={state.State}
                      validators={["required"]}
                      errorMessages={["State field is required"]}
                    />
                    <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  </Box>
                  <Box mt={2} />
                  <Box
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextValidator
                      label="PinCode"
                      variant="outlined"
                      type="number"
                      placeholder="Enter PinCode"
                      style={{ width: "100%" }}
                      onChange={handleChange}
                      name="pinCode"
                      style={{ width: "95%" }}
                      value={state.pinCode}
                      validators={["required"]}
                      errorMessages={["pinCode field is required"]}
                    />
                    <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  </Box>
                </Grid>
              </Grid>
            </FieldsContainer>
          </Grid>

          <Grid item xs={12} md={12}>
            <FieldsContainer label="Project Name">
              <Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextValidator
                    label="Project Name"
                    variant="outlined"
                    placeholder="Enter Project Name"
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    name="nameOfProject"
                    style={{ width: "95%" }}
                    value={state.nameOfProject}
                    validators={["required"]}
                    errorMessages={["nameOfProject field is required"]}
                  />
                  <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  <Box mt={2} />
                </Grid>
              </Grid>
              <Box mt={2} />
              <Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextValidator
                    label="Posting As"
                    variant="outlined"
                    placeholder="Enter Posting As"
                    style={{ width: "100%" }}
                    onChange={handleChange}
                    name="postingAs"
                    style={{ width: "95%" }}
                    value={state.postingAs}
                    validators={["required"]}
                    errorMessages={["postingAs field is required"]}
                  />
                  <span style={{ color: "red", fontSize: "1.2rem" }}>*</span>
                  <Box mt={2} />
                </Grid>
              </Grid>
            </FieldsContainer>
          </Grid>
        </Grid>
      </ValidatorForm>
    );
  };

  const getStepTwo = () => {
    return (
      // <ValidatorForm onSubmit={handleSubmit}>
      <ValidatorForm>
        <>
          <FieldsContainer label="Property Image">
            <Grid container>
              <Grid item xs={12} sm={6} md={4}>
                <img src={file} height="200px" width="200px" />
                <Box>
                  <br />
                  <label className="uploadbutton" htmlFor="mainImage">
                    <Button
                      color="default"
                      variant="contained"
                      component="span"
                      color="primary"
                    >
                      Browse main Image
                    </Button>
                  </label>
                  <input
                    style={{ display: "none" }}
                    id="mainImage"
                    name="mainImage"
                    type="file"
                    onChange={handleMainImageChange}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <Typography variant="subtitle1" gutterBottom>
                  Exterior View
                </Typography>
                {propertyData?.images?.exteriorView?.map((item, index) => {
                  return (
                    <img
                      src={API_ENDPOINTS.BASE_URL + item.path}
                      height="80px"
                      width="80px"
                    />
                  );
                })}
                <Dropzone
                  onChangeStatus={handleImageExteriorView}
                  accept="image/*,audio/*,video/*"
                />
              </Grid>
            </Grid>
          </FieldsContainer>
          <Grid item xs={12} sm={12}>
            <Grid container>
              {state.pType == "RESIDENTIAL" ? (
                <>
                  <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Living Room
                    </Typography>
                    {propertyData?.images?.livingRoom?.map((item, index) => {
                      return (
                        <img
                          src={API_ENDPOINTS.BASE_URL + item.path}
                          height="80px"
                          width="80px"
                        />
                      );
                    })}
                    <Dropzone
                      xs={12}
                      sm={6}
                      md={6}
                      onChangeStatus={handleImageLivingRoom}
                      accept="image/*,audio/*,video/*"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Bedrooms
                    </Typography>
                    {propertyData?.images?.badrooms?.map((item, index) => {
                      return (
                        <img
                          src={API_ENDPOINTS.BASE_URL + item.path}
                          height="80px"
                          width="80px"
                        />
                      );
                    })}
                    <Dropzone
                      onChangeStatus={handleImageBadrooms}
                      accept="image/*,audio/*,video/*"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <br />
                    <Typography variant="subtitle1" gutterBottom>
                      Kitchen
                    </Typography>
                    {propertyData?.images?.kitchen?.map((item, index) => {
                      return (
                        <img
                          src={API_ENDPOINTS.BASE_URL + item.path}
                          height="80px"
                          width="80px"
                        />
                      );
                    })}
                    <Dropzone
                      onChangeStatus={handleImageKitchen}
                      accept="image/*,audio/*,video/*"
                    />
                  </Grid>
                </>
              ) : (
                ""
              )}
              {state.pType == "COMMERCIAL" ? (
                <>
                  <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Rooms
                    </Typography>
                    {propertyData?.images?.livingRoom?.map((item, index) => {
                      return (
                        <img
                          src={API_ENDPOINTS.BASE_URL + item.path}
                          height="80px"
                          width="80px"
                        />
                      );
                    })}
                    <Dropzone
                      onChangeStatus={handleImageRooms}
                      accept="image/*,audio/*,video/*"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <Typography variant="subtitle1" gutterBottom>
                      Visitor Room
                    </Typography>
                    {propertyData?.images?.badrooms?.map((item, index) => {
                      return (
                        <img
                          src={API_ENDPOINTS.BASE_URL + item.path}
                          height="80px"
                          width="80px"
                        />
                      );
                    })}
                    <Dropzone
                      onChangeStatus={handleImageVisitor}
                      accept="image/*,audio/*,video/*"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <br />
                    <Typography variant="subtitle1" gutterBottom>
                      Conference Room
                    </Typography>
                    {propertyData?.images?.badrooms?.map((item, index) => {
                      return (
                        <img
                          src={API_ENDPOINTS.BASE_URL + item.path}
                          height="80px"
                          width="80px"
                        />
                      );
                    })}
                    <Dropzone
                      onChangeStatus={handleImageConference}
                      accept="image/*,audio/*,video/*"
                    />
                  </Grid>
                </>
              ) : (
                ""
              )}

              <Grid item xs={12} sm={6} md={6}>
                <br />
                <Typography variant="subtitle1" gutterBottom>
                  Bathrooms
                </Typography>
                {propertyData?.images?.bathrooms?.map((item, index) => {
                  return (
                    <img
                      src={API_ENDPOINTS.BASE_URL + item.path}
                      height="80px"
                      width="80px"
                    />
                  );
                })}
                <Dropzone
                  onChangeStatus={handleImageBathrooms}
                  accept="image/*,audio/*,video/*"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <br />
                <Typography variant="subtitle1" gutterBottom>
                  Floor Plan
                </Typography>
                {propertyData?.images?.floorPlan?.map((item, index) => {
                  return (
                    <img
                      src={API_ENDPOINTS.BASE_URL + item.path}
                      height="80px"
                      width="80px"
                    />
                  );
                })}
                <Dropzone
                  onChangeStatus={handleImageFloorPlan}
                  accept="image/*,audio/*,video/*"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <br />
                <Typography variant="subtitle1" gutterBottom>
                  Master Plan
                </Typography>
                {propertyData?.images?.masterPlan?.map((item, index) => {
                  return (
                    <img
                      src={API_ENDPOINTS.BASE_URL + item.path}
                      height="80px"
                      width="80px"
                    />
                  );
                })}
                <Dropzone
                  onChangeStatus={handleImageMasterPlan}
                  accept="image/*,audio/*,video/*"
                />
              </Grid>

              {/* <Grid item xs={12} sm={6} md={6}>
                          <Typography variant="subtitle1" gutterBottom>
                            Location Map
                          </Typography>
                          <Dropzone
                            onChangeStatus={handleImageLocationMap}
                            accept="image/*,audio/*,video/*"
                          />
                        </Grid> */}

              <Grid item xs={12} sm={6} md={6}>
                <br />
                <Typography variant="subtitle1" gutterBottom>
                  Other
                </Typography>
                {propertyData?.images?.other?.map((item, index) => {
                  return (
                    <img
                      src={API_ENDPOINTS.BASE_URL + item.path}
                      height="80px"
                      width="80px"
                    />
                  );
                })}
                <Dropzone
                  onChangeStatus={handleImageOther}
                  accept="image/*,audio/*,video/*"
                />
              </Grid>
            </Grid>
          </Grid>
          {/* </ValidatorForm> */}
        </>
      </ValidatorForm>
    );
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return getStepZero();
      case 1:
        return getStepOne();
      case 2:
        return getStepTwo();
      default:
        console.log(step);
        return "Unknown step";
    }
  };

  const getStepButtonText = (activeStep) => {
    switch (activeStep) {
      case 0:
        return "Next";
      case 1:
        return "Save Details";
      case 2:
        return "Finish";
      default:
        console.log(activeStep);
        return "Unknown step";
    }
  };

  return (
    <Container style={{ marginTop: 60, marginBottom: 60 }}>
      <Grid item xs={12} md={12}>
        <Typography
          className={classes.text1}
          mt={3}
          style={{ textAlign: "center" }}
        >
          Sell or Rent your Property
        </Typography>
      </Grid>
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Grid contianer style={{ paddingLeft: 40 }}>
          {activeStep === steps.length ? (
            <>
              <div>
                <Typography className={classes.instructions}>
                  All steps completed
                </Typography>
                {/* <Button onClick={handleReset} className={classes.button}>
                              Reset
                          </Button> */}
              </div>
              <div>
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    style={{ marginTop: 20 }}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                  >
                    Back
                  </Button>
                )}
              </div>{" "}
            </>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    style={{ marginTop: 20 }}
                    className={classes.button}
                    variant="contained"
                    color="primary"
                  >
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  style={{ marginTop: 20 }}
                  className={classes.button}
                  // type="submit"
                >
                  {getStepButtonText(activeStep)}
                  {/* {activeStep === steps.length - 1 ? "Finish" : "Next"} */}
                </Button>
              </div>
            </div>
          )}
        </Grid>
      </div>
    </Container>
  );
};

export default PropertyCreateUpdate;
