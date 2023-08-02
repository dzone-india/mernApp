import React, { useEffect } from "react";
import { Button, Typography, Box, Link } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as TeamAction from "../../redux/actions/TeamAction";
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
import { Link as RouterLink } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
  text: {
    display: "block",
    overflow: "hidden",
    maxHeight: "50px",
  },
});

const TeamList = (props) => {
  const dispatch = useDispatch();
  let { team, classes } = props;

  useEffect(() => {
    dispatch(TeamAction.TeamListRequestAsync());
  }, [dispatch]);

  let options = {
    selectableRows: false,
    print: false,
    download: true,
  };

  function onDisable(data, status) {
    let tempdata = {
      _id: data,
      isDisable: status,
    };
    dispatch(TeamAction.TeamStatusUpdateRequestAsync(tempdata));
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
          onClick: () => dispatch(TeamAction.TeamDeleteRequestAsync(tempdata)),
        },
        {
          label: "No",
        },
      ],
    });
  }

  function updatehandleOpenCreateModal(data) {
    history.push("/team/add?id=" + data);
    window.location.reload();
  }

  return (
    <>
      <Box className="MenuManagement_Data">
        <FormHeader
          heading1={"Team Module Management"}
          heading2={"List and Manage Team Here"}
        />
        <BreadCrumbs
          heading1={"TeamManagement"}
          heading2={"Team Module List"}
        />
        <Link component={RouterLink} to="/team/add">
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={"CanceForm"}
          >
            Add
          </Button>
        </Link>

        {team?.list?.list && team.list?.list.length > 0 ? (
          <>
            <MUIDataTable
              className="table-header"
              title="Team List"
              data={team?.list?.list.map((item, index) => {
                return [
                  index + 1,
                  item.name,
                  item.designation,
                  item.description,
                  item.facebook,
                  item.instagram,
                  item.linkedin,
                  item.twitter,
                  item.isDisable,
                  item._id,
                ];
              })}
              columns={[
                "SR No.",
                "Name",
                "Designation",
                {
                  name: "Description",
                  options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <>
                          <Typography className={classes.text}>
                            {ReactHtmlParser(tableMeta.rowData[3])}
                          </Typography>
                        </>
                      );
                    },
                  },
                },
                "Facebook",
                "Instagram",
                "Linkedin",
                "Twitter",
                {
                  name: "Status",
                  options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      if (value === true) return "Inactive";
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
                              updatehandleOpenCreateModal(tableMeta.rowData[9])
                            }
                          />

                          {tableMeta.rowData[8] ? (
                            <Tooltip title="Inactive">
                              <ClearIcon
                                onClick={() =>
                                  onDisable(tableMeta.rowData[9], false)
                                }
                                style={{ color: "#bd2130", cursor: "pointer" }}
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Active">
                              <Done
                                onClick={() =>
                                  onDisable(tableMeta.rowData[9], true)
                                }
                                style={{ color: "#1e7e34", cursor: "pointer" }}
                              />
                            </Tooltip>
                          )}

                          <DeleteIcon
                            style={{ color: "#bd2130", cursor: "pointer" }}
                            onClick={() => onDeleteClick(tableMeta.rowData[9])}
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
  const { team } = state;
  return {
    team,
  };
}
export default connect(mapStateToProps)(withStyles(styles)(TeamList));
