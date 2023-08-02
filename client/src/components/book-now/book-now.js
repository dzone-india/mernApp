import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import BookNowForm from "../book-now/book-now-form";
import { Grid } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function BookNowModal(props) {
  console.log("book now props", props);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(props.open);

  useEffect(() => {
    setOpen(props.open);
    console.log(open);
  }, [props]);

  const body = (
    <Grid
      item
      xs={12}
      md={6}
      style={{ display: "flex", justifyContent: "center", margin: "auto" }}
    >
      <BookNowForm detail={props?.detail} />
    </Grid>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={props.closeBookNow}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
