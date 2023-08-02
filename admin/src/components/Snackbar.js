import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { clearSnackbar } from "../redux/actions/snackbarActions";
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SuccessSnackbar() {
  const dispatch = useDispatch();
  const { successSnackbarMessage, successSnackbarOpen, snackbartype } = useSelector(
    state => state.snackbar
  );

  function handleClose() {
    dispatch(clearSnackbar());
  }

  return (
    <Snackbar open={successSnackbarOpen} autoHideDuration={6000} onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
    >
      <Alert onClose={handleClose} severity={snackbartype}>
        {successSnackbarMessage}
      </Alert>
    </Snackbar>
  );
}