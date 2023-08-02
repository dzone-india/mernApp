import React from "react";
import { useSelector } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#1976d2",
  },
}));

export default function SimpleBackdrop() {
  const classes = useStyles();
  const { setLoaderOpenClose } = useSelector((state) => state.loader);
  console.log("setLoaderOpenClose", setLoaderOpenClose);
  return (
    <div>
      <Backdrop className={classes.backdrop} open={setLoaderOpenClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
