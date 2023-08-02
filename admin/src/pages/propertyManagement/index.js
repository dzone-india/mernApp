import React, { useEffect } from "react";
import { Button, Typography, Box, Link, Select } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as PropertyAction from "../../redux/actions/PropertyAction";
import { useDispatch } from "react-redux";
import BreadCrumbs from "../../common/bread-crumbs";
import FormHeader from "../../common/form-header";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import Done from "@material-ui/icons/Done";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link as RouterLink } from "react-router-dom";
import history from "../../components/history";
const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
});

const PropertyList = (props) => {
  const dispatch = useDispatch();
  let { property } = props;

  useEffect(() => {
    dispatch(PropertyAction.PropertyListRequestAsync());
  }, [dispatch]);

  let options = {
    selectableRows: false,
    print: false,
    download: true,
  };

  function onDisable(data, status) {
    let tempdata = {
      id: data,
      status: status.target.value,
    };
    dispatch(PropertyAction.PropertyStatusUpdateRequestAsync(tempdata));
  }

  function onDeleteClick(data) {
    let tempdata = {
      propertyId: data,
    };

    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            dispatch(PropertyAction.PropertyDeleteRequestAsync(tempdata)),
        },
        {
          label: "No",
        },
      ],
    });
  }

  function updatehandleOpenCreateModal(data) {
    history.push("/property/add?id=" + data);
    window.location.reload();
  }

  return (
    <>
      <Box className="MenuManagement_Data">
        <FormHeader
          heading1={"Property Module Management"}
          heading2={"List and Manage Property Here"}
        />
        <BreadCrumbs
          heading1={"PropertyManagement"}
          heading2={"Property Module List"}
        />
        <Link component={RouterLink} to="/property/add">
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={"CanceForm"}
          >
            Add
          </Button>
        </Link>
        {property.list?.list && property.list?.list?.length > 0 ? (
          <>
            <MUIDataTable
              className="table-header"
              title="Property List"
              data={property?.list?.list?.map((item, index) => {
                return [
                  index + 1,
                  item.nameOfProject,
                  item.pType,
                  item.features[0]?.address?.city,
                  item.for,
                  item.postingAs,
                  item.status,
                  item._id,
                ];
              })}
              columns={[
                "SR No.",
                "Name",
                "Property Type",
                "City",
                "For",
                "PostingAs",
                {
                  name: "Status",
                  options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      if (value === 0) return "Inactive";
                      else if (value === 1) return "Active";
                      else if (value === 2) return "Pending";
                      else if (value === 3) return "Rejected";
                    },
                  },
                },
                {
                  name: "Actions",
                  options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <div style={{ display: "flex" }}>
                          <EditIcon
                            style={{ color: "#0069d9", cursor: "pointer" }}
                            onClick={() =>
                              updatehandleOpenCreateModal(tableMeta.rowData[7])
                            }
                          />

                          {/* {tableMeta.rowData[6] === 5 ? (
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="demo-simple-select-outlined-label"
                              style={{ minWidth: "30px" }}
                              label="Role"
                              native
                              name="rating"
                              inputProps={{
                                name: "rating",
                                id: "age-native-simple",
                              }}
                              onChange={(e) =>
                                onDisable(tableMeta.rowData[7], e)
                              }
                              value={tableMeta.rowData[6]}
                              disabled
                            >
                              <option value="0">Inactive </option>
                              <option value="1">Active </option>
                              <option value="2">Pending </option>
                              <option value="3">Rejected </option>
                            </Select>
                          ) : ( */}
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined-label"
                            label="Role"
                            native
                            name="rating"
                            inputProps={{
                              name: "rating",
                              id: "age-native-simple",
                            }}
                            onChange={(e) =>
                              onDisable(tableMeta.rowData[7], e)
                            }
                            value={tableMeta.rowData[6]}
                          >
                            <option value="0">Inactive </option>
                            <option value="1">Active </option>
                            <option value="2">Pending </option>
                            <option value="3">Rejected </option>
                          </Select>


                          <DeleteIcon
                            style={{ color: "#bd2130", cursor: "pointer" }}
                            onClick={() => onDeleteClick(tableMeta.rowData[7])}
                          />
                        </div>
                      );
                    },
                  },
                },
              ]}
              options={options}
            />
          </>
        ) : (
          <Typography>Data not found.</Typography>
        )}
      </Box>
    </>
  );
};

function mapStateToProps(state) {
  const { property } = state;

  return {
    property,
  };
}
export default connect(mapStateToProps)(withStyles(styles)(PropertyList));
