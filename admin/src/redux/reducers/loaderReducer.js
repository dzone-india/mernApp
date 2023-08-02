const LoaderReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOADER_SHOW":
      return {
        ...state,
        setLoaderOpenClose: true,
      };

    case "LOADER_HIDE":
      return {
        ...state,
        setLoaderOpenClose: false,
      };

    default:
      return state;
  }
};

export default LoaderReducer;
