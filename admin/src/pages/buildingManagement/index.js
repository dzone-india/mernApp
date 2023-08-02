import React, { useEffect } from "react";
import { Button, Typography, Box, Link } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as BuildingAction from "../../redux/actions/BuildingAction";
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
import history from "../../components/history";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./blogManagement.css";
import { Link as RouterLink } from "react-router-dom";
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

const BuildingList = (props) => {
  const dispatch = useDispatch();

  let { building } = props;

  useEffect(() => {
    dispatch(BuildingAction.BuildingListRequestAsync());
  }, [dispatch]);

  let options = {
    selectableRows: false,
    print: false,
    download: true,
  };

  function onDisable(data, status) {
    let tempdata = {
      id: data,
      isDisable: status,
    };
    dispatch(BuildingAction.BuildingStatusUpdateRequestAsync(tempdata));
  }

  function onDeleteClick(data) {
    let tempdata = {
      _id: data,
    };
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            dispatch(BuildingAction.BuildingDeleteRequestAsync(tempdata)),
        },
        {
          label: "No",
        },
      ],
    });
  }

  function updatehandleOpenCreateModal(data) {
    // window.location.href = "/Building/edit?id="+data;
    history.push("/building/add?id=" + data);
    window.location.reload();
  }

  return (
    <>
      <Box className="MenuManagement_Data">
        <FormHeader
          heading1={"Building Module Management"}
          heading2={"List and Manage Building Here"}
        />
        <BreadCrumbs
          heading1={"BuildingManagement"}
          heading2={"Building Module List"}
        />
        <Link component={RouterLink} to="/building/add">
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={"CanceForm"}
          >
            Add
          </Button>
        </Link>
        {building?.list?.list && building?.list?.list.length > 0 ? (
          <>
            <MUIDataTable
              className="table-header"
              title="Building List"
              data={building?.list?.list.map((item, index) => {
                return [index + 1, item.name, item.isDisable, item._id];
              })}
              columns={[
                "SR No.",
                "Title",
                {
                  name: "Status",
                  options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      if (value === true) return "Inactive ";
                      else return "Active";
                    },
                  },
                },
                {
                  name: "Actions",
                  options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <>
                          <EditIcon
                            style={{ color: "#0069d9", cursor: "pointer" }}
                            onClick={() =>
                              updatehandleOpenCreateModal(tableMeta.rowData[3])
                            }
                          />
                          {tableMeta.rowData[2] ? (
                            <Tooltip title="Inactive">
                              <ClearIcon
                                onClick={() =>
                                  onDisable(tableMeta.rowData[3], false)
                                }
                                style={{ color: "#bd2130", cursor: "pointer" }}
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Active">
                              <Done
                                onClick={() =>
                                  onDisable(tableMeta.rowData[3], true)
                                }
                                style={{ color: "#1e7e34", cursor: "pointer" }}
                              />
                            </Tooltip>
                          )}

                          <DeleteIcon
                            style={{ color: "#bd2130", cursor: "pointer" }}
                            onClick={() => onDeleteClick(tableMeta.rowData[3])}
                          />
                        </>
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
  const { building } = state;

  console.log("testingg", building);
  return {
    building,
  };
}
export default connect(mapStateToProps)(withStyles(styles)(BuildingList));
