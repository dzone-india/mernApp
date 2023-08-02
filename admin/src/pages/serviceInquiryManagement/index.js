import React, { useEffect } from "react";
import { Typography, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as ServiceInquiryAction from "../../redux/actions/ServiceInquiryAction";
import { useDispatch } from "react-redux";
import BreadCrumbs from "../../common/bread-crumbs";
import FormHeader from "../../common/form-header";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import Done from "@material-ui/icons/Done";
import Tooltip from "@material-ui/core/Tooltip";
import ClearIcon from "@material-ui/icons/Clear";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DeleteIcon from "@material-ui/icons/Delete";
import API_ENDPOINTS from "../../constants/api-endpoints";

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

const ServiceInquiryList = (props) => {
  const dispatch = useDispatch();

  let { serviceInquiry } = props;

  useEffect(() => {
    dispatch(ServiceInquiryAction.ServiceInquiryListRequestAsync());
  }, [dispatch]);

  let options = {
    selectableRows: false,
    print: false,
    download: true,
  };

  function onDisable(data, status) {
    let tempdata = {
      _id: data,
      active: status,
    };
    dispatch(
      ServiceInquiryAction.ServiceInquiryStatusUpdateRequestAsync(tempdata)
    );
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
            dispatch(
              ServiceInquiryAction.ServiceInquiryDeleteRequestAsync(tempdata)
            ),
        },
        {
          label: "No",
        },
      ],
    });
  }

  return (
    <>
      <Box className="MenuManagement_Data">
        <FormHeader
          heading1={"Service Inquiry Module Management"}
          heading2={"List and Manage Service Inquiry Here"}
        />
        <BreadCrumbs
          heading1={"ServiceInquiryManagement"}
          heading2={"Service Inquiry Module List"}
        />

        {serviceInquiry?.list?.list &&
        serviceInquiry?.list?.list?.length > 0 ? (
          <>
            <MUIDataTable
              className="table-header"
              title="Service Inquiry List"
              data={serviceInquiry?.list?.list?.map((item, index) => {
                return [
                  index + 1,
                  item.name,
                  item.email,
                  item.mobile,
                  item.budget,
                  item.message,
                  item?.image,
                  item.active,
                  item._id,
                ];
              })}
              columns={[
                "SR No.",
                "Name",
                "Email",
                "Phone",
                "Budget",
                "message",
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
                  name: "File",
                  options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <>
                          <a
                            href={
                              API_ENDPOINTS.BASE_URL +
                              tableMeta.rowData[6][0]?.path
                            }
                            target="_blank"
                          >
                            view
                          </a>
                        </>
                      );
                    },
                  },
                },
                {
                  name: "Actions",
                  options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <>
                          {/* <EditIcon style={{ color: "#0069d9", cursor: "pointer" }} onClick={() => updatehandleOpenCreateModal(tableMeta.rowData[4])} /> */}

                          {tableMeta.rowData[7] ? (
                            <Tooltip title="Active">
                              <Done
                                onClick={() =>
                                  onDisable(tableMeta.rowData[8], false)
                                }
                                style={{ color: "#1e7e34", cursor: "pointer" }}
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Inactive">
                              <ClearIcon
                                onClick={() =>
                                  onDisable(tableMeta.rowData[8], true)
                                }
                                style={{ color: "#bd2130", cursor: "pointer" }}
                              />
                            </Tooltip>
                          )}

                          <DeleteIcon
                            style={{ color: "#bd2130", cursor: "pointer" }}
                            onClick={() => onDeleteClick(tableMeta.rowData[8])}
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
  const { serviceInquiry } = state;
  return {
    serviceInquiry,
  };
}
export default connect(mapStateToProps)(withStyles(styles)(ServiceInquiryList));
