import React, { useEffect } from "react";
import { Typography, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as SitevisitAction from "../../redux/actions/SitevisitAction";
import { useDispatch } from "react-redux";
import BreadCrumbs from "../../common/bread-crumbs";
import FormHeader from "../../common/form-header";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import Done from "@material-ui/icons/Done";
import Tooltip from "@material-ui/core/Tooltip";
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

const VistList = (props) => {
  const dispatch = useDispatch();
  let { sitevisit } = props;

  useEffect(() => {
    dispatch(SitevisitAction.SitevisitListRequestAsync());
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
    dispatch(SitevisitAction.SitevisitStatusUpdateRequestAsync(tempdata));
  }

  return (
    <>
      <Box className="MenuManagement_Data">
        <FormHeader
          heading1={"Site Visit Module Management"}
          heading2={"List and Manage Site Visit Here"}
        />
        <BreadCrumbs
          heading1={"SitevisitManagement"}
          heading2={"Site Visit Module List"}
        />

        {sitevisit?.list && sitevisit?.list?.list?.length > 0 ? (
          <>
            <MUIDataTable
              className="table-header"
              title="Site Visit List"
              data={sitevisit?.list?.list?.map((item, index) => {
                return [
                  index + 1,
                  item.name,
                  item.email,
                  item.phone,
                  item.time,
                  item.status,
                  item._id,
                ];
              })}
              columns={[
                "SR No.",
                "Name",
                "Email",
                "Phone",
                "Time",
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

                          {/* <DeleteIcon style={{ color: "#bd2130", cursor: "pointer" }} onClick={() => onDeleteClick(tableMeta.rowData[4])} /> */}
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
  const { sitevisit } = state;
  return {
    sitevisit,
  };
}
export default connect(mapStateToProps)(withStyles(styles)(VistList));
