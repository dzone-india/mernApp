import React, { useEffect } from "react";
import { Typography, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as BookingAction from "../../redux/actions/BookingAction";
import { useDispatch } from "react-redux";

import BreadCrumbs from "../../common/bread-crumbs";
import FormHeader from "../../common/form-header";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";

import Done from "@material-ui/icons/Done";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

import ClearIcon from "@material-ui/icons/Clear";

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

const BookingList = (props) => {
  const dispatch = useDispatch();

  let { booking } = props;

  useEffect(() => {
    dispatch(BookingAction.BookingListRequestAsync());
  }, [dispatch]);

  let options = {
    selectableRows: false,
    print: false,
    download: true,
  };

  function onDisable(data, status) {
    let tempdata = {
      id: data,
      status: status,
    };
    dispatch(BookingAction.BookingStatusUpdateRequestAsync(tempdata));
  }

  function onDeleteClick(data) {}

  return (
    <>
      <Box className="MenuManagement_Data">
        <FormHeader
          heading1={"Booking Module Management"}
          heading2={"List and Manage Booking Here"}
        />
        <BreadCrumbs
          heading1={"BookingManagement"}
          heading2={"Booking Module List"}
        />

        {booking.list && booking.list.length > 0 ? (
          <>
            <MUIDataTable
              className="table-header"
              title="Booking List"
              data={booking.list.map((item, index) => {
                return [
                  index + 1,
                  item?.propertyId?.nameOfProject,
                  item.name,
                  item.email,
                  item.mobile,
                  item.status,
                  item._id,
                ];
              })}
              columns={[
                "SR No.",
                "Property Name",
                "Name",
                "Email",
                "Phone",
                {
                  name: "Status",
                  options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      if (value === true) return "Active";
                      else return "Inactive";
                    },
                  },
                },
                {
                  name: "Actions",
                  options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <>
                          {/* <EditIcon style={{ color: "#0069d9", cursor:"pointer" }} onClick={() => updatehandleOpenCreateModal(tableMeta.rowData[4])}/> */}

                          {tableMeta.rowData[5] ? (
                            <Tooltip title="Active">
                              <Done
                                onClick={() =>
                                  onDisable(tableMeta.rowData[6], false)
                                }
                                style={{ color: "#1e7e34", cursor: "pointer" }}
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Inactive">
                              <ClearIcon
                                onClick={() =>
                                  onDisable(tableMeta.rowData[6], true)
                                }
                                style={{ color: "#bd2130", cursor: "pointer" }}
                              />
                            </Tooltip>
                          )}

                          <DeleteIcon
                            style={{ color: "#bd2130", cursor: "pointer" }}
                            onClick={() => onDeleteClick(tableMeta.rowData[6])}
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
  const { booking } = state;
  return {
    booking,
  };
}
export default connect(mapStateToProps)(withStyles(styles)(BookingList));
