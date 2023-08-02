
const SnackbarReducer = (state = {}, action) => {
  switch (action.type) {
    case "SNACKBAR_SUCCESS":
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
        snackbartype: "success",
      };

    case "SNACKBAR_FAIL":
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
        snackbartype: "error",

      };

    case "SNACKBAR_CLEAR":
      return {
        ...state,
        successSnackbarOpen: false,
        errorSnackbarOpen: false,
        infoSnackbarOpen: false
      };
    default:
      return state;
  }
};

export default SnackbarReducer;