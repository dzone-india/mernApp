import React, { useEffect } from "react";
import { Button, Typography, Box, Link } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import * as AboutUsAction from "../../redux/actions/AboutUsAction";
import { useDispatch } from "react-redux";

import BreadCrumbs from "../../common/bread-crumbs";
import FormHeader from "../../common/form-header";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Edit";

import history from "../../components/history";
import "react-confirm-alert/src/react-confirm-alert.css";
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
  text: {
    display: "block",
    overflow: "hidden",
    maxHeight: "50px",
  },
});

const AboutUsList = (props) => {
  const dispatch = useDispatch();
  let { classes, aboutus } = props;

  useEffect(() => {
    dispatch(AboutUsAction.AboutUsListRequestAsync());
  }, [dispatch]);

  let options = {
    selectableRows: false,
    print: false,
    download: true,
  };

  function updatehandleOpenCreateModal(data) {
    history.push("/aboutus/add?id=" + data);
    window.location.reload();
  }

  return (
    <>
      <Box className="MenuManagement_Data">
        <FormHeader
          heading1={"About Us Module Management"}
          heading2={"List and Manage About Us Here"}
        />
        <BreadCrumbs
          heading1={"AboutUsManagement"}
          heading2={"About Us Module List"}
        />
        <Link component={RouterLink} to="/aboutus/add">
          <Button
            variant="contained"
            color="primary"
            type="button"
            className={"CanceForm"}
          >
            Add
          </Button>
        </Link>

        {aboutus.list && aboutus.list.length > 0 ? (
          <>
            <MUIDataTable
              className="table-header"
              title="About Us List"
              data={aboutus.list.map((item, index) => {
                return [
                  index + 1,
                  item?.header,
                  item?.title,
                  item?.description,
                  item?._id,
                ];
              })}
              columns={[
                "SR No.",
                "Header",
                "Title",
                {
                  name: "Description",
                  options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                      return (
                        <>
                          <Typography className={classes.text}>
                            {tableMeta.rowData[3]}
                          </Typography>
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
                          <EditIcon
                            style={{ color: "#0069d9", cursor: "pointer" }}
                            onClick={() =>
                              updatehandleOpenCreateModal(tableMeta.rowData[4])
                            }
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
  const { aboutus } = state;
  return {
    aboutus,
  };
}
export default connect(mapStateToProps)(withStyles(styles)(AboutUsList));
