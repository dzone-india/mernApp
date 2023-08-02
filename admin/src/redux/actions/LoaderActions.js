export const showLoader = (message) => {
  return (dispatch) => {
    dispatch({ type: "LOADER_SHOW" });
  };
};

export const hideLoader = (message) => {
  return (dispatch) => {
    dispatch({ type: "LOADER_HIDE" });
  };
};
