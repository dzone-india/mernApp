import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Box,
  Link,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import * as SupplierAction from "../../redux/actions/SupplierAction";
import { useDispatch } from "react-redux";
import FormHeader from "../../common/form-header";
import BreadCrumbs from "../../common/bread-crumbs";
import "./blogManagement.css";
import SubHeading from "../../common/SubHeadingBox";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { connect } from "react-redux";
// import Link from "next/link";

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import API_ENDPOINTS from "../../constants/api-endpoints";

const SupplierCreateUpdate = (props) => {
  let query = useQuery();
  let id = query.get("id");
  let supplierData = props?.supplier?.supplierData;
  const [, setRefresh] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      _id: id,
    };
    if (id != null) {
      dispatch(SupplierAction.SupplierDataRequestAsync(data));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (props.supplier.success) {
      setRefresh(true);
      setState(initialState);
    }
  }, [props.supplier.success]);

  const initialState = {
    name: supplierData?.name || "",
    companyName: supplierData?.companyName || "",
    email: supplierData?.email || "",
    mobile: supplierData?.mobile || "",
    role: supplierData?.role || "",
    location: supplierData?.location || "",
    city: supplierData?.city || "",
    supplierOf: supplierData?.supplierOf || "",
    message: supplierData?.message || "",
    marble: supplierData?.marble || "",
    image: [],
    id: id,
  };

  const [state, setState] = useState(initialState);
  const [description, setDescription] = useState(supplierData?.description);

  const inputChange = (e) => {
    let { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    const {
      name,
      companyName,
      id,
      email,
      mobile,
      role,
      location,
      city,
      supplierOf,
      message,
    } = state;

    var data = new FormData();
    state?.image?.forEach((item) => {
      data.append("file", item);
    });

    if (id === null || id === undefined) {
      data.append("name", name);
      data.append("companyName", companyName);
      data.append("email", email);
      data.append("role", role);
      data.append("mobile", mobile);
      data.append("location", location);
      data.append("city", city);
      data.append("supplierOf", supplierOf);
      data.append("message", message);

      dispatch(SupplierAction.SupplierAddRequestAsync(data));
    } else {
      data.append("name", name);
      data.append("companyName", companyName);
      data.append("email", email);
      data.append("role", role);
      data.append("mobile", mobile);
      data.append("location", location);
      data.append("city", city);
      data.append("supplierOf", supplierOf);
      data.append("message", message);
      data.append("_id", id);

      dispatch(SupplierAction.SupplierUpdateRequestAsync(data));
    }
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const handleBannerUpload = (file, status) => {
    let list = state;
    let data = [];
    if (status === "done") {
      if (list.image && list.image.length) {
        data = list.image;
        data[list.image.length] = file.file;
      } else {
        data["0"] = file.file;
      }
      setState({ ...state, ["image"]: data });
    }
  };

  return (
    <Box className="MenuManagement_Data">
      <FormHeader
        heading1={"Supplier Module Management"}
        heading2={"Create and Update Supplier Here"}
      />
      {state.id ? (
        <>
          <BreadCrumbs
            heading1={"SupplierManagement"}
            heading2={"Edit Supplier Module"}
          />
          <SubHeading heading={"Edit Supplier Module"} />
        </>
      ) : (
        <>
          <BreadCrumbs
            heading1={"SupplierManagement"}
            heading2={"Add Supplier Module"}
          />
          <SubHeading heading={"Add Supplier Module"} />
        </>
      )}
      <Grid item xs={12} className="m-5 addUserFormanage">
        <div className="card w-100">
          <div className="card-header d-flex justify-content-between align-items-center">
            <Typography component="h3" variant="h3">
              {state.id ? "Edit" : "Add"} Supplier
            </Typography>
          </div>
          <div class="card-body">
            <ValidatorForm onSubmit={handleSubmit}>
              <Grid container spacing={3} className="FormFildes">
                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Your Name*"
                    fullWidth
                    value={state.name}
                    onChange={inputChange}
                    name="name"
                    id="name"
                    validators={["required"]}
                    errorMessages={["name field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Company Name*"
                    fullWidth
                    value={state.companyName}
                    onChange={inputChange}
                    name="companyName"
                    id="companyName"
                    validators={["required"]}
                    errorMessages={["companyName field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel
                      id="demo-simple-select-outlined-label"
                      htmlFor="age-native-simple"
                    >
                      Position/job Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined-label"
                      label="Role"
                      native
                      name="role"
                      value={state.role}
                      onChange={inputChange}
                      inputProps={{
                        name: "role",
                        id: "age-native-simple",
                      }}
                    >
                      <option value="owner">Owner</option>
                      <option value="manager">Manager</option>
                      <option value="staff">Staff</option>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Mobiile *"
                    fullWidth
                    value={state.mobile}
                    onChange={inputChange}
                    name="mobile"
                    id="mobile"
                    type="number"
                    validators={["required"]}
                    errorMessages={["mobile field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Email Id"
                    fullWidth
                    value={state.email}
                    onChange={inputChange}
                    name="email"
                    id="email"
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="City*"
                    fullWidth
                    value={state.city}
                    onChange={inputChange}
                    name="city"
                    id="city"
                    validators={["required"]}
                    errorMessages={["city field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Location*"
                    fullWidth
                    value={state.location}
                    onChange={inputChange}
                    name="location"
                    id="location"
                    validators={["required"]}
                    errorMessages={["location field is required"]}
                  />
                </Grid>

                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <FormControl variant="outlined" style={{ width: "100%" }}>
                    <InputLabel
                      id="demo-simple-select-outlined-label"
                      htmlFor="age-native-simple"
                    >
                      Supplier of
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined-label"
                      label="Role"
                      native
                      name="supplierOf"
                      value={state.supplierOf}
                      onChange={inputChange}
                      inputProps={{
                        name: "supplierOf",
                        id: "age-native-simple",
                      }}
                    >
                      <option value="Marble">Marble</option>
                      <option value="Tiles">Tiles</option>
                      <option value="Bricks">Bricks</option>
                      <option value="Decorative Items">Decorative Items</option>
                      <option value="Sand">Sand</option>
                      <option value="Cement">Cement</option>
                      <option value="Electrical Items">Electrical Items</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Furniture Hardware">
                        Furniture Hardware
                      </option>
                      <option value="Paint">Paint</option>
                      <option value="Security Services">
                        Security Services
                      </option>
                      <option value="Still Equipments">Still Equipments</option>
                      <option value="Sanitary Hardware">
                        Sanitary Hardware
                      </option>
                      <option value="Ro Services">Ro Services</option>
                      <option value="Electronic Item">Electronic Item</option>
                      <option value="Electrical services">
                        Electrical services
                      </option>
                      <option value="Safety Guards">Safety Guards</option>
                      <option value="Building Material">
                        Building Material
                      </option>
                      <option value="Glass House">Glass House</option>
                      <option value="Fabrication">Fabrication</option>
                      <option value="JVNL services">JVNL services</option>
                      <option value="JDA Work ">JDA Work </option>
                      <option value="Solar Equipments">Solar Equipments</option>
                      <option value="Manpower Supplier">
                        Manpower Supplier
                      </option>
                      <option value="Construction Hardware">
                        Construction Hardware
                      </option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid className="form-group-item" item xs={12} sm={6} md={4}>
                  <TextValidator
                    className="form-control-item"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={state.message}
                    onChange={inputChange}
                    name="message"
                    id="message"
                    validators={["required"]}
                    errorMessages={["message field is required"]}
                  />
                </Grid>
                <Grid className="form-group-item" item xs={12} sm={6} md={5}>
                  <Typography>Banner </Typography>
                  {supplierData?.file?.map((item, index) => {
                    return (
                      <embed
                        src={API_ENDPOINTS.BASE_URL + item.path}
                        type={item.mimetype}
                        width="80px"
                        height="80px"
                      />
                    );
                  })}
                  <Dropzone onChangeStatus={handleBannerUpload} />
                </Grid>
              </Grid>
              <br />
              <Box className="footer">
                <Button
                  // fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  className={"SaveData"}
                >
                  Save
                </Button>

                <Link component={RouterLink} to="/supplier">
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
  const { supplier } = state;
  return {
    supplier,
  };
}
export default connect(mapStateToProps)(SupplierCreateUpdate);
