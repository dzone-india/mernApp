import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Select,
  Box,
  Link,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
} from "@material-ui/core";
import ApiClient from "../../api-client";
import _ from "lodash";
import classes from "./makeStyles";
import FieldsContainer from "./components/fields-container";
import Detail from "./components/details";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import * as PropertyAction from "../../redux/actions/PropertyAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./propertyManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { connect } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import propertyTypeOptions from "../../utils/property-type-options.json";
import PropertyOptionManager from "./utils/PropertyOptionManager";
import APP_CONSTANTS from "../../utils/constant";
import Option from "./components/option";
import Transaction from "./components/transaction";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import API_ENDPOINTS from "../../constants/api-endpoints";

const personal_details_options = ["Owner", "Agent", "Builder"];
const property_details_options = ["Sell", "Rent"];

const PropertyCreateUpdate = (props) => {
  // store data
  const dispatch = useDispatch();
  //   state
  const [refresh, setRefresh] = useState(false);
  const [, setIsOwner] = React.useState(false);
  const [propertyOptions, setPropertyOptions] = React.useState([]);
  const [formFields, setFormFields] = React.useState(null);
  const [currentAreaField, setCurrentAreaField] = React.useState({});
  const [areaUnit] = React.useState("");

  let propertyData = props?.property?.propertyData;
  let query = useQuery();
  let id = query.get("id");
  if (!id) propertyData = null;
  const initialState = {
    iAm: propertyData?.iAm || "",
    for: propertyData?.for || "",
    pType: propertyData?.pType || "",
    postingAs: propertyData?.postingAs || "",
    nameOfProject: propertyData?.nameOfProject || "",
    Bedrooms: propertyData?.bedrooms || null,
    Balconies: propertyData?.balconies || "",
    Floor_No_: propertyData?.floorNo || "",
    Total_Floors: propertyData?.totalFloors || "",
    Furnished_Status: propertyData?.furnishedStatus || "",
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
    Super_Area: {
      size: propertyData?.superArea || null,
    },
    Carpet_Area: {
      size: propertyData?.carpetArea || "",
    },
    Built_up_Area: {
      size: propertyData?.builtUpArea || "",
    },
    available_from_month: propertyData?.availableFromMonth || "1",
    available_from_year: propertyData?.availableFromYear || "2021",
    gaurdRoom: propertyData?.gaurdRoom || "true",
    id: id || " ",
    status: true || "",
    Transaction_Type: propertyData?.transactionType || "",
    Property_Tag: propertyData?.propertyTag || "",

    expected_price: propertyData?.price?.expectedPrice || "",
    expected_price_per_sq_ft: propertyData?.price?.pricePerSqft || "",
    other_charges: propertyData?.price?.otherCharges || "0",
    stamp_duty_registration_charges_excluded:
      propertyData?.price?.isStumpDutyRCExcluded || false,
    booking_token_amount: propertyData?.price?.bookingAmount || "",
    maintenance_charges: propertyData?.price?.maintenanceCharge || "0",
    maintenance_charges_per: propertyData?.price?.maintenanceFor || "",
    brokerage: propertyData?.price?.brokerage || "",
    build_year: propertyData?.buildYear || "2005",

    Visitor_Room: propertyData?.vistorRoom || "0",
    Conference_Room: propertyData?.conferenceRoom || "0",
    // Floors_Allowed_For_Construction:
    //   propertyData?.floorsAllowedForConstruction || "",
    // No_Of_Open_Sides: propertyData?.noOfOpenSides || null,
    // Width_Of_Road_Facing_The_Plot:
    //   propertyData?.widthOfRoadFacingThePlot || null,
    // Plot_Length: propertyData?.plotLength || null,
    // Plot_Breadth: propertyData?.plotBreadth || null,
    // This_residential_house_is_built_on_a_corner_plot:
    //   propertyData?.thisResidentialHouseIsBuiltOnACornerPlot || null,
    // response_from_brokers: propertyData?.responseFromBrokers || null,

    Personal_Washroom: propertyData?.personalWashroom || false,
    No_Of_Seats: propertyData?.noOfSeats || "0",
    Meeting_Rooms: propertyData?.meetingRooms || "0",
    Pantry: propertyData?.Pantry || false,
  };

  const imageState = {
    exteriorView: propertyData?.images?.exteriorView || [],
    livingRoom: propertyData?.images?.livingRoom || [],
    badrooms: propertyData?.images?.badrooms || [],
    bathrooms: propertyData?.images?.bathrooms || [],
    kitchen: propertyData?.images?.kitchen || [],
    floorPlan: propertyData?.images?.floorPlan || [],
    masterPlan: propertyData?.images?.masterPlan || [],
    locationMap: propertyData?.images?.locationMap || [],
    other: propertyData?.images?.other || [],
    roomImage: propertyData?.images?.roomImage || [],
    conference: propertyData?.images?.conference || [],
    visitor: propertyData?.images?.visitor || [],
  };
  const [description, setDescription] = useState(
    propertyData?.projectDescription
  );
  const [state, setState] = useState(initialState);
  const [amenities, setAmenities] = useState([""]);
  const [propertyDetail, setPropertyDetail] = useState([
    { key: "", Value: "" },
  ]);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");

  const [image, setImageState] = useState(imageState);
  useEffect(() => {
    setState(initialState);
    setImageState(imageState);
    setPropertyOptions([[]]);
    setFormFields(null);
    setPropertyDetail([{ key: "", Value: "" }]);
    setAmenities([{ 0: "" }]);
    setFile("");
    setDescription("");
    setCurrentAreaField({});
    // if (!id) propertyData = null;
  }, [id]);
  // Life cycle hooks
  useEffect(() => {
    let data = {
      propertyId: id,
    };
    if (id != null) {
      dispatch(PropertyAction.PropertyDataRequestAsync(data));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (props.property.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.property.success]);

  useEffect(() => {
    if (props.property.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [refresh]);

  useEffect(() => {
    // console.log("-Form-Data-State-", state);
    let option = state.for;
    const clonePropertyTypeOptions = _.cloneDeep(propertyTypeOptions);
    if (option === "Sell") {
      clonePropertyTypeOptions.splice(1, 1);
    } else if (option === "Rent") {
      clonePropertyTypeOptions.splice(0, 1);
    }
    setPropertyOptions(clonePropertyTypeOptions[0]);

    if (propertyData && propertyData?.amenities !== "") {
      const result = propertyData?.amenities;
      setAmenities(result);
    }
    if (propertyData && propertyData?.propertyDetails !== "") {
      const result = propertyData?.propertyDetails;
      setPropertyDetail(result);
    }

    if (state["pType"]) {
      const formData =
        PropertyOptionManager.getFormFieldsBySelectedPropertyType(
          state["pType"]
        );
      setFormFields(formData);
    }

    if (propertyData && propertyData?.images?.mainImage[0]?.path !== "") {
      setFile(
        API_ENDPOINTS.BASE_URL + propertyData?.images?.mainImage[0]?.path
      );
      setFilename(propertyData?.images?.mainImage[0]?.filename);
    }

    // amenities
  }, [state, propertyData]);

  // Extra methods
  const handleChange = (event) => {
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
  useEffect(() => {
    setState({
      ...state,
      ["iAm"]: personal_details_options[0],
    });
  }, [id]);

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
    let name = feature?.fieldName?.replace(/[^a-zA-Z]/gi, "_");
    // console.log("-FEATURE--", feature);
    setState({
      ...state,
      [name]: feature.item,
    });
  };
  const mainFileClickHandler = async () => {
    if (!id) return;
    setFile("");
    setFilename("");
    const cookie =
      "connect.sid=s%3AOTR7JRcRLkCbykuoWLRX4yOvqEZu20Is.4utrypcpaXicNe3A0foHiWeVNP8fQDryd6%2FdCibio%2BI";
    const authorization =
      "Bearer eyJhbGciOiJIUzI1NiJ9.VmlrcmFtSmVldFNpbmdoSkk.MaACpq-fK6F02rVz3vEAUgAYvTqDAEVKpq9zNbmWCPs";

    const response = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      "/property/deletePropertyImage",
      { propertyId: id, imageKey: "mainImage", fileName: filename },
      {},
      { Cookie: cookie, Authorization: authorization },
      true
    );
  };
  const imageClickHandler = async (key, fileNamePassed) => {
    if (!id) return;
    setFile("");
    setFilename("");
    const cookie =
      "connect.sid=s%3AOTR7JRcRLkCbykuoWLRX4yOvqEZu20Is.4utrypcpaXicNe3A0foHiWeVNP8fQDryd6%2FdCibio%2BI";
    const authorization =
      "Bearer eyJhbGciOiJIUzI1NiJ9.VmlrcmFtSmVldFNpbmdoSkk.MaACpq-fK6F02rVz3vEAUgAYvTqDAEVKpq9zNbmWCPs";

    const response = await ApiClient.call(
      ApiClient.REQUEST_METHOD.POST,
      "/property/deletePropertyImage",
      { propertyId: id, imageKey: key, fileName: fileNamePassed },
      {},
      { Cookie: cookie, Authorization: authorization },
      true
    );
    let data = {
      propertyId: id,
    };
    if (id != null) {
      dispatch(PropertyAction.PropertyDataRequestAsync(data));
    }
  };
  const onAreaFieldSelect = (e) => {
    e.preventDefault();
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setCurrentAreaField({ fieldName, fieldValue });
    let name = fieldName.replace(/[^a-zA-Z]/gi, "_");
    setState({
      ...state,
      [name]: {
        size: fieldValue,
        unit: "",
      },
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

    if (state.id == " ") {
      let reqData = {
        iAm: state.iAm,
        for: state.for,
        pType: state.pType,
        postingAs: state.postingAs,
        nameOfProject: state.nameOfProject,
        balconies: state.Balconies,
        floorNo: state.Floor_No_,
        totalFloors: state.Total_Floors,
        furnishedStatus: state.Furnished_Status,
        bathrooms: state.Bathrooms,
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
        brokerageCharge: state.brokerage,
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
        description: description || propertyData?.description,
        gaurdRoom: state.gaurdRoom,
        buildYear: state.build_year,
        bedrooms: state.Bedrooms,
        superArea: state.Super_Area?.size,
        userId: user?._id,
        vistorRoom: state.Visitor_Room,
        conferenceRoom: state.Conference_Room,
        // floorsAllowedForConstruction: state.Floors_Allowed_For_Construction,
        // noOfOpenSides: state.No_Of_Open_Sides,
        // Widthofroad: state.Width_Of_Road_Facing_The_Plot,
        // plotLength: state.Plot_Length,
        // plotBreadth: state.Plot_Breadth,
        // IsCornerPlot: state.This_residential_house_is_built_on_a_corner_plot,
        responseFromBrokers: state.response_from_brokers,
        personalWashroom: state.Personal_Washroom,
        noOfSeats: state.No_Of_Seats,
        meetingRooms: state.Meeting_Rooms,
        Pantry: state.Pantry,
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
      dispatch(PropertyAction.PropertyAddRequestAsync(reqData, data));
    } else {
      let reqData = {
        iAm: state.iAm,
        for: state.for,
        pType: state.pType,
        postingAs: state.postingAs,
        nameOfProject: state.nameOfProject,
        balconies: state.Balconies,
        floorNo: state.Floor_No_,
        totalFloors: state.Total_Floors,
        furnishedStatus: state.Furnished_Status,
        bathrooms: state.Bathrooms,
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
        brokerageCharge: state.brokerage,
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
        description: description || propertyData.description,
        gaurdRoom: state.gaurdRoom,
        buildYear: state.build_year,
        bedrooms: state.Bedrooms,
        superArea: state.Super_Area?.size,
        userId: user?._id,
        vistorRoom: state.Visitor_Room,
        conferenceRoom: state.Conference_Room,
        // floorsAllowedForConstruction: state.Floors_Allowed_For_Construction,
        // noOfOpenSides: state.No_Of_Open_Sides,
        // Widthofroad: state.Width_Of_Road_Facing_The_Plot,
        // plotLength: state.Plot_Length,
        // plotBreadth: state.Plot_Breadth,
        // IsCornerPlot: state.This_residential_house_is_built_on_a_corner_plot,
        responseFromBrokers: state.response_from_brokers,
        personalWashroom: state.Personal_Washroom,
        noOfSeats: state.No_Of_Seats,
        meetingRooms: state.Meeting_Rooms,
        Pantry: state.Pantry,
        propertyId: state.id,
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
      dispatch(PropertyAction.PropertyUpdateRequestAsync(reqData, data));
    }
  };

  // Render methods

  /**
   *
   * @param {*} section - OwnerBlock
   */
  // const _renderOwnerBlock = () => {
  //   return (
  //     <Grid container>
  //       <Grid item xs={12} md={12} className={classes.style1}>
  //         <TextField
  //           label="Name"
  //           variant="outlined"
  //           style={{ width: "100%" }}
  //           name="owner_name"
  //           onChange={handleChange}
  //         ></TextField>
  //         <Box mt={2} />
  //         <Grid container>
  //           <Grid item xs={4} md={4} className={classes.style2}>
  //             <Select
  //               native
  //               variant="outlined"
  //               value={state["country_code"]}
  //               onChange={handleChange}
  //               inputProps={{ name: "country_code" }}
  //               style={{ height: 55, marginRight: 5 }}
  //             >
  //               <option value={10}>IND +91</option>
  //               <option value={20}>PAK +92</option>
  //             </Select>
  //           </Grid>
  //           <Grid item xs={8} md={8} className={classes.style2}>
  //             <TextField
  //               label="Mobile"
  //               variant="outlined"
  //               // style={{ width: "17.5%" }}
  //               name="mobile_number"
  //               onChange={handleChange}
  //             ></TextField>
  //           </Grid>
  //         </Grid>
  //         <Box mt={2} />
  //         <TextField
  //           label="Email"
  //           variant="outlined"
  //           style={{ width: "100%" }}
  //           onChange={handleChange}
  //           name="owner_email"
  //         ></TextField>
  //       </Grid>
  //     </Grid>
  //   );
  // };

  /**
   *
   * @param {*} section - FeaturesSection
   */
  const _renderFeaturesSection = (section, sectionIndex) => {
    const { fields, section: sectionName } = section || {};
    return (
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
    );
  };

  /**
   *
   * @param {*} section - AreaSection
   */
  const _renderAreaSection = (section) => {
    const { fields, section: sectionName } = section || {};
    return (
      <FieldsContainer label={sectionName}>
        <Grid container>
          {fields?.length > 0 &&
            fields?.map((field, index) => {
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
                      style={{ width: 400, marginRight: 15, marginBottom: 15 }}
                      name={label}
                      variant="outlined"
                      onChange={onAreaFieldSelect}
                      value={state[field?.fieldName]["size"]}
                    />
                    {units && (
                      <Select
                        native
                        variant="outlined"
                        value={areaUnit["area-unit"]}
                        onChange={handleAreaUnitChange}
                        inputProps={{
                          name: "area-unit",
                        }}
                        style={{ height: 55, marginTop: -15, maxHeight: 200 }}
                      >
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
    );
  };

  /**
   *
   * @param {*} section - TransactionSection
   */
  const _renderTransactionSection = (section) => {
    const { fields, section: sectionName } = section || {};
    return (
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
                      <Typography className={classes.text3}>{label}</Typography>
                    </Grid>
                    {data?.map((d) => {
                      return (
                        <Grid item xs={12} md={3}>
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
                            {d.values.map((item, index) => {
                              return d.fieldName === "available_from_month" ? (
                                <option key={index} value={index + 1}>
                                  {item}
                                </option>
                              ) : (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                          </Select>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              );
            } else if (type === "textfield") {
              return (
                <Grid item xs={12} md={12}>
                  <Box mt={2} />
                  <TextField
                    label={label}
                    variant="outlined"
                    placeholder={placeholder}
                    onChange={handleChange}
                    style={{ width: 300, marginBottom: 15 }}
                    name={fieldName}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      </FieldsContainer>
    );
  };

  /**
   *
   * @param {*} section - PriceSection
   */
  const _renderPriceSection = (section) => {
    const { fields, section: sectionName } = section || {};
    return (
      <FieldsContainer label={sectionName}>
        <Grid container>
          {fields?.map((field) => {
            const { label, type, values, placeholder, data, fieldName } =
              field || {};
            let brokerageValue = "";
            if (type === "textfield" && data) {
              return data.map((e, index) => {
                return (
                  <Grid item xs={12} md={3} key={index}>
                    <TextField
                      label={e.label}
                      variant="outlined"
                      placeholder={e.placeholder}
                      onChange={handleChange}
                      name={e.fieldName}
                      style={{ marginBottom: 15 }}
                      value={state[e.fieldName]}
                    />
                  </Grid>
                );
              });
            } else if (type === "textfield") {
              return (
                <Grid item xs={12} md={12}>
                  <TextField
                    label={label}
                    variant="outlined"
                    placeholder={placeholder}
                    onChange={handleChange}
                    style={{ width: 300, marginBottom: 15 }}
                    name={fieldName}
                    value={state[fieldName]}
                  />
                </Grid>
              );
            } else if (type === "text-dropdown" && field.data) {
              return field?.data?.map((e, i) => {
                if (e.type === "textfield") {
                  return (
                    <Grid item xs={12} md={4} key={i}>
                      <TextField
                        label={e.label}
                        variant="outlined"
                        name={e.fieldName}
                        onChange={handleChange}
                        placeholder={e.placeholder}
                        style={{ width: 300, marginBottom: 15 }}
                        value={state[e.fieldName]}
                      />
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
                      </Select>
                    </Grid>
                  );
                }
              });
            } else if (type === "dropdown") {
              if (fieldName === "brokerage") {
                brokerageValue = state[fieldName];
                if (brokerageValue === "") {
                  setState((prevState) => {
                    return { ...prevState, brokerage: "0" };
                  });
                  brokerageValue = "0";
                }
              }
              return (
                <Grid item xs={12} md={12}>
                  <Typography className={classes.text3}>{label}</Typography>
                  <Select
                    native
                    value={
                      fieldName === "brokerage"
                        ? brokerageValue
                        : state[fieldName]
                    }
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
                  </Select>
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
    );
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

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
    // if(name == 'key'){
    //   const arr = e.target.value.split(" ");
    //   for (var i = 0; i < arr.length; i++) {
    //       arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    //   }
    //   keydata = arr.join("");
    // }

    const list = [...propertyDetail];
    list[index][name] = value;
    setPropertyDetail(list);
    // setState((prevState) => {
    //   return { ...prevState, propertyDetails: list };
    // });
  };

  // handle click event of the Remove button
  const handleDetailRemoveClick = (index) => {
    const list = [...propertyDetail];
    list.splice(index, 1);
    setPropertyDetail(list);
    // setState((prevState) => {
    //   return { ...prevState, propertyDetails: list };
    // });
  };

  // handle click event of the Add button
  const handleDetailAddClick = () => {
    debugger;
    const list = [...propertyDetail];
    // list.push({ key: "", Value: "" });
    setPropertyDetail([...propertyDetail, { key: "", Value: "" }]);
    // setState((prevState) => {
    //   return { ...prevState, propertyDetails: [...list, { key: "", Value: "" }] };
    // });
  };

  const handleMainImageChange = (event) => {
    // this.setState({
    setState({ ...state, ["mainImage"]: event.target.files[0] });
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.addEventListener("load", (e) => {
      const data = e.target.result;
      console.log("data", data);
      setFile(data);
    });

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
    debugger;
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

  // const handleImageLocationMap = (file, status) => {
  //   let list = image;
  //   let data = [];
  //   if (status === "done") {
  //     if (list.locationMap && list.locationMap.length) {
  //       data = list.locationMap;
  //       data[list.locationMap.length] = file.file;
  //     } else {
  //       data["0"] = file.file;
  //     }
  //     setImageState({ ...image, ["locationMap"]: data });
  //   }
  // };

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

  return (
    <Box className="PropertyManagement_Data">
      <FormHeader
        heading1={"Property Module Management"}
        heading2={"Create and Update Property Here"}
      />
      {state.id != " " ? (
        <>
          <BreadCrumbs
            heading1={"PropertyManagement"}
            heading2={"Edit Property Module"}
          />
          <SubHeading heading={"Edit Property Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"PropertyManagement"}
            heading2={"Add Property Module"}
          />
          <SubHeading heading={"Add Property Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id != " " ? "Edit" : "Add"} Property
            </Typography>
          </div>
          <div className="card-body">
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={3} className="FormFildes">
                <Grid item xs={12} sm={6} md={4}>
                  <FieldsContainer label="Personal Details">
                    <Grid container>
                      {/* <Grid item xs={12} md={12}>
                        <Detail
                          title="I am"
                          options={personal_details_options}
                          onOptionSelectListener={onOptionSelectListener}
                          values={state.iAm}
                        />
                      </Grid> */}

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
                            width: "100%",
                          }}
                        >
                          {personal_details_options?.length > 0 &&
                            personal_details_options?.map((item, index) => {
                              return (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                        </Select>
                      </Grid>

                      {/* {isOwner && (
                        <Grid item xs={12} md={12}>
                          {_renderOwnerBlock()}
                        </Grid>
                      )} */}

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
                            width: "100%",
                          }}
                        >
                          {property_details_options?.length > 0 &&
                            property_details_options?.map((item, index) => {
                              return (
                                <option key={index} value={item}>
                                  {item}
                                </option>
                              );
                            })}
                        </Select>
                      </Grid>
                      {/* <Grid item xs={12} md={12}>
                        <Detail
                          title="For"
                          options={property_details_options}
                          values={state.for}
                          onOptionSelectListener={
                            onOptionPropertyForSelectListener
                          }
                        />
                      </Grid> */}
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
                            width: "100%",
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
                      </Grid>
                    </Grid>
                  </FieldsContainer>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <FieldsContainer label="Property Details">
                    <Box mt={2} />
                    {propertyDetail.map((x, i) => {
                      debugger;
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
                              ></TextField>
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
                            <div className="RemoveBtn">
                              {propertyDetail.length !== 1 && (
                                <Button
                                  variant="contained"
                                  type="button"
                                  color="primary"
                                  className={"CanceForm"}
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
                        <TextValidator
                          label="Longitude"
                          variant="outlined"
                          placeholder="Enter Longitude"
                          style={{ width: "100%" }}
                          onChange={handleChange}
                          name="longitude"
                          value={state.longitude}
                          validators={["required"]}
                          errorMessages={["longitude field is required"]}
                        />
                        <Box mt={2} />
                        <TextValidator
                          label="Latitude"
                          variant="outlined"
                          placeholder="Enter Latitude"
                          style={{ width: "100%" }}
                          onChange={handleChange}
                          name="latitude"
                          value={state.latitude}
                          validators={["required"]}
                          errorMessages={["latitude field is required"]}
                        />
                        <Box mt={2} />
                        <TextValidator
                          label="Address"
                          variant="outlined"
                          placeholder="Enter Address"
                          style={{ width: "100%" }}
                          onChange={handleChange}
                          name="address"
                          value={state.address}
                          validators={["required"]}
                          errorMessages={["address field is required"]}
                        />
                        <Box mt={2} />
                        <TextValidator
                          label="City"
                          variant="outlined"
                          placeholder="Enter City"
                          style={{ width: "100%" }}
                          onChange={handleChange}
                          name="city"
                          value={state.city}
                          validators={["required"]}
                          errorMessages={["city field is required"]}
                        />
                        <Box mt={2} />
                        <TextValidator
                          label="State"
                          variant="outlined"
                          placeholder="Enter State"
                          style={{ width: "100%" }}
                          onChange={handleChange}
                          name="State"
                          value={state.State}
                          validators={["required"]}
                          errorMessages={["State field is required"]}
                        />
                        <Box mt={2} />
                        <TextValidator
                          label="PinCode"
                          variant="outlined"
                          placeholder="Enter PinCode"
                          style={{ width: "100%" }}
                          onChange={handleChange}
                          name="pinCode"
                          value={state.pinCode}
                          validators={["required"]}
                          errorMessages={["pinCode field is required"]}
                        />
                      </Grid>
                    </Grid>
                  </FieldsContainer>
                </Grid>

                <Grid item xs={12} md={12}>
                  <FieldsContainer label="Project Name">
                    <Grid>
                      <Grid item xs={12} md={4}>
                        <TextValidator
                          label="Project Name"
                          variant="outlined"
                          placeholder="Enter Project Name"
                          style={{ width: "100%" }}
                          onChange={handleChange}
                          name="nameOfProject"
                          value={state.nameOfProject}
                          validators={["required"]}
                          errorMessages={["nameOfProject field is required"]}
                        />
                        <Box mt={2} />
                      </Grid>
                    </Grid>

                    <Grid>
                      <Grid item xs={12} md={4}>
                        <TextValidator
                          label="Posting As"
                          variant="outlined"
                          placeholder="Enter Posting As"
                          style={{ width: "100%" }}
                          onChange={handleChange}
                          name="postingAs"
                          value={state.postingAs}
                          validators={["required"]}
                          errorMessages={["postingAs field is required"]}
                        />
                        <Box mt={2} />
                      </Grid>
                    </Grid>

                    <FieldsContainer label="Property Amenities">
                      {amenities.map((x, i) => {
                        if (state.id == " ") {
                          return (
                            <Grid item xs={12} md={4}>
                              <TextField
                                label="Amenities"
                                variant="outlined"
                                placeholder="Enter Amenities"
                                style={{ width: "100%" }}
                                onChange={(e) =>
                                  handleAminitiesInputChange(e, i)
                                }
                                name="amenities"
                                defaultValue={x[i]}
                              ></TextField>

                              <div className="RemoveBtn">
                                {amenities.length !== 1 && (
                                  <Button
                                    variant="contained"
                                    type="button"
                                    color="primary"
                                    className={"CanceForm"}
                                    onClick={() =>
                                      handleRemoveAmenitiesClick(i)
                                    }
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
                                onChange={(e) =>
                                  handleAminitiesInputChange(e, i)
                                }
                                name="amenities"
                                defaultValue={x[i]}
                              ></TextField>

                              <div className="RemoveBtn">
                                {amenities.length !== 1 && (
                                  <Button
                                    variant="contained"
                                    type="button"
                                    color="primary"
                                    className={"CanceForm"}
                                    onClick={() =>
                                      handleRemoveAmenitiesClick(i)
                                    }
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
                            </Grid>
                          );
                        }
                      })}
                    </FieldsContainer>
                  </FieldsContainer>
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={12} md={12}>
                  {propertyData?.projectDescription != null ? (
                    <>
                      <ReactQuill
                        onChange={handleChangeTextEditor}
                        value={
                          description
                            ? description
                            : propertyData?.projectDescription
                        }
                        placeholder="Enter description"
                        theme="snow"
                      />
                    </>
                  ) : (
                    <>
                      <ReactQuill
                        value={description}
                        onChange={handleChangeTextEditor}
                        placeholder="Enter description"
                        theme="snow"
                      />
                    </>
                  )}
                </Grid>

                <Box mt={2} />
                <Grid item xs={12} md={12}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Gaurd Room</FormLabel>
                    <RadioGroup
                      row
                      aria-label="gender"
                      name="gaurdRoom"
                      onChange={handleChange}
                      value={
                        state.gaurdRoom
                          ? state.gaurdRoom
                          : propertyData?.gaurdRoom
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
                <Grid item xs={12} sm={12}>
                  <Grid item xs={12} md={12}>
                    <Grid container>
                      {_.size(formFields) > 0 &&
                        formFields?.sections?.map((section, sectionIndex) => {
                          switch (section?.section_id) {
                            case APP_CONSTANTS.section_features:
                              return _renderFeaturesSection(
                                section,
                                sectionIndex
                              );
                            case APP_CONSTANTS.section_area:
                              return _renderAreaSection(section, sectionIndex);
                            case APP_CONSTANTS.section_transaction:
                              return _renderTransactionSection(
                                section,
                                sectionIndex
                              );
                            case APP_CONSTANTS.section_price:
                              return _renderPriceSection(section, sectionIndex);
                          }
                        })}
                    </Grid>
                  </Grid>

                  <FieldsContainer label="Property Image">
                    <Grid container>
                      <Grid item xs={12} sm={6} md={4}>
                        <Box style={{ position: "relative" }}>
                          {filename && id && (
                            <div
                              style={{
                                borderRadius: "50%",
                                border: "1px solid black",
                                color: "black",
                                position: "absolute",
                                left: 200,
                                top: -20,
                                width: 25,
                                height: 25,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                              onClick={mainFileClickHandler}
                            >
                              X
                            </div>
                          )}
                          <img src={file} height="200px" width="200px" />
                        </Box>

                        <Box>
                          <br />
                          <label className="uploadbutton" htmlFor="mainImage">
                            <Button
                              color="default"
                              variant="contained"
                              component="span"
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
                        {propertyData?.images?.exteriorView?.map(
                          (item, index) => {
                            console.log("item", item);
                            return (
                              <div style={{ position: "relative" }}>
                                {item?.filename && (
                                  <div
                                    style={{
                                      borderRadius: "50%",
                                      border: "1px solid black",
                                      color: "black",
                                      position: "absolute",
                                      left: 80,
                                      top: -10,
                                      width: 20,
                                      height: 20,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      imageClickHandler(
                                        "exteriorView",
                                        item?.filename
                                      );
                                    }}
                                  >
                                    X
                                  </div>
                                )}
                                <img
                                  src={API_ENDPOINTS.BASE_URL + item.path}
                                  height="80px"
                                  width="80px"
                                />
                              </div>
                            );
                          }
                        )}
                        <Dropzone
                          onChangeStatus={handleImageExteriorView}
                          accept="image/*,audio/*,video/*"
                        />
                      </Grid>
                    </Grid>
                  </FieldsContainer>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Grid container>
                    {state.pType == "RESIDENTIAL" ? (
                      <>
                        <Grid item xs={12} sm={6} md={6}>
                          <Typography variant="subtitle1" gutterBottom>
                            Living Room
                          </Typography>
                          {propertyData?.images?.livingRoom?.map(
                            (item, index) => {
                              return (
                                <div style={{ position: "relative" }}>
                                  {item?.filename && id && (
                                    <div
                                      style={{
                                        borderRadius: "50%",
                                        border: "1px solid black",
                                        color: "black",
                                        position: "absolute",
                                        left: 80,
                                        top: -10,
                                        width: 20,
                                        height: 20,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        imageClickHandler(
                                          "livingRoom",
                                          item?.filename
                                        );
                                      }}
                                    >
                                      X
                                    </div>
                                  )}
                                  <img
                                    src={API_ENDPOINTS.BASE_URL + item.path}
                                    height="80px"
                                    width="80px"
                                  />
                                </div>
                              );
                            }
                          )}
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
                          {propertyData?.images?.badrooms?.map(
                            (item, index) => {
                              return (
                                <div style={{ position: "relative" }}>
                                  {item?.filename && id && (
                                    <div
                                      style={{
                                        borderRadius: "50%",
                                        border: "1px solid black",
                                        color: "black",
                                        position: "absolute",
                                        left: 80,
                                        top: -10,
                                        width: 20,
                                        height: 20,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        imageClickHandler(
                                          "badrooms",
                                          item?.filename
                                        );
                                      }}
                                    >
                                      X
                                    </div>
                                  )}
                                  <img
                                    src={API_ENDPOINTS.BASE_URL + item.path}
                                    height="80px"
                                    width="80px"
                                  />
                                </div>
                              );
                            }
                          )}
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
                              <div style={{ position: "relative" }}>
                                {item?.filename && id && (
                                  <div
                                    style={{
                                      borderRadius: "50%",
                                      border: "1px solid black",
                                      color: "black",
                                      position: "absolute",
                                      left: 80,
                                      top: -10,
                                      width: 20,
                                      height: 20,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => {
                                      imageClickHandler(
                                        "kitchen",
                                        item?.filename
                                      );
                                    }}
                                  >
                                    X
                                  </div>
                                )}
                                <img
                                  src={API_ENDPOINTS.BASE_URL + item.path}
                                  height="80px"
                                  width="80px"
                                />
                              </div>
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
                          {propertyData?.images?.livingRoom?.map(
                            (item, index) => {
                              return (
                                <div style={{ position: "relative" }}>
                                  {item?.filename && id && (
                                    <div
                                      style={{
                                        borderRadius: "50%",
                                        border: "1px solid black",
                                        color: "black",
                                        position: "absolute",
                                        left: 80,
                                        top: -10,
                                        width: 20,
                                        height: 20,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        imageClickHandler(
                                          "livingRoom",
                                          item?.filename
                                        );
                                      }}
                                    >
                                      X
                                    </div>
                                  )}
                                  <img
                                    src={API_ENDPOINTS.BASE_URL + item.path}
                                    height="80px"
                                    width="80px"
                                  />
                                </div>
                              );
                            }
                          )}
                          <Dropzone
                            onChangeStatus={handleImageRooms}
                            accept="image/*,audio/*,video/*"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6} md={6}>
                          <Typography variant="subtitle1" gutterBottom>
                            Visitor Room
                          </Typography>
                          {propertyData?.images?.badrooms?.map(
                            (item, index) => {
                              return (
                                <div style={{ position: "relative" }}>
                                  {item?.filename && id && (
                                    <div
                                      style={{
                                        borderRadius: "50%",
                                        border: "1px solid black",
                                        color: "black",
                                        position: "absolute",
                                        left: 80,
                                        top: -10,
                                        width: 20,
                                        height: 20,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        imageClickHandler(
                                          "badrooms",
                                          item?.filename
                                        );
                                      }}
                                    >
                                      X
                                    </div>
                                  )}
                                  <img
                                    src={API_ENDPOINTS.BASE_URL + item.path}
                                    height="80px"
                                    width="80px"
                                  />
                                </div>
                              );
                            }
                          )}
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
                          {propertyData?.images?.badrooms?.map(
                            (item, index) => {
                              return (
                                <div style={{ position: "relative" }}>
                                  {item?.filename && id && (
                                    <div
                                      style={{
                                        borderRadius: "50%",
                                        border: "1px solid black",
                                        color: "black",
                                        position: "absolute",
                                        left: 80,
                                        top: -10,
                                        width: 20,
                                        height: 20,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => {
                                        imageClickHandler(
                                          "badrooms",
                                          item?.filename
                                        );
                                      }}
                                    >
                                      X
                                    </div>
                                  )}
                                  <img
                                    src={API_ENDPOINTS.BASE_URL + item.path}
                                    height="80px"
                                    width="80px"
                                  />
                                </div>
                              );
                            }
                          )}
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
                          <div style={{ position: "relative" }}>
                            {item?.filename && id && (
                              <div
                                style={{
                                  borderRadius: "50%",
                                  border: "1px solid black",
                                  color: "black",
                                  position: "absolute",
                                  left: 80,
                                  top: -10,
                                  width: 20,
                                  height: 20,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  imageClickHandler(
                                    "bathrooms",
                                    item?.filename
                                  );
                                }}
                              >
                                X
                              </div>
                            )}
                            <img
                              src={API_ENDPOINTS.BASE_URL + item.path}
                              height="80px"
                              width="80px"
                            />
                          </div>
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
                          <div style={{ position: "relative" }}>
                            {item?.filename && id && (
                              <div
                                style={{
                                  borderRadius: "50%",
                                  border: "1px solid black",
                                  color: "black",
                                  position: "absolute",
                                  left: 80,
                                  top: -10,
                                  width: 20,
                                  height: 20,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  imageClickHandler(
                                    "floorPlan",
                                    item?.filename
                                  );
                                }}
                              >
                                X
                              </div>
                            )}
                            <img
                              src={API_ENDPOINTS.BASE_URL + item.path}
                              height="80px"
                              width="80px"
                            />
                          </div>
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
                          <div style={{ position: "relative" }}>
                            {item?.filename && id && (
                              <div
                                style={{
                                  borderRadius: "50%",
                                  border: "1px solid black",
                                  color: "black",
                                  position: "absolute",
                                  left: 80,
                                  top: -10,
                                  width: 20,
                                  height: 20,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  imageClickHandler(
                                    "masterPlan",
                                    item?.filename
                                  );
                                }}
                              >
                                X
                              </div>
                            )}
                            <img
                              src={API_ENDPOINTS.BASE_URL + item.path}
                              height="80px"
                              width="80px"
                            />
                          </div>
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
                          <div style={{ position: "relative" }}>
                            {item?.filename && id && (
                              <div
                                style={{
                                  borderRadius: "50%",
                                  border: "1px solid black",
                                  color: "black",
                                  position: "absolute",
                                  left: 80,
                                  top: -10,
                                  width: 20,
                                  height: 20,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  imageClickHandler("other", item?.filename);
                                }}
                              >
                                X
                              </div>
                            )}
                            <img
                              src={API_ENDPOINTS.BASE_URL + item.path}
                              height="80px"
                              width="80px"
                            />
                          </div>
                        );
                      })}
                      <Dropzone
                        onChangeStatus={handleImageOther}
                        accept="image/*,audio/*,video/*"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <br />
              <Box className="footer">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={"SaveData"}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
                <Link component={RouterLink} to="/property">
                  <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    className={"CanceForm"}
                  >
                    Cancel
                  </Button>
                </Link>
              </Box>
            </ValidatorForm>
          </div>
        </div>
      </Grid>
    </Box>
  );
};

function mapStateToProps(state) {
  const { property } = state;
  return {
    property,
  };
}
export default connect(mapStateToProps)(PropertyCreateUpdate);
