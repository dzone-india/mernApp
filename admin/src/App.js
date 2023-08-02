import React from "react";
import {ThemeProvider} from "@material-ui/core";
import {useSelector, useDispatch} from "react-redux";
import theme from "../src/theme";
import Routes from "./routes";
import GlobalStyles from "./components/global-styles";
import Snackbar from "./components/Snackbar";
import Loader from "./components/Loader";
import * as SideMenuListAction from "../src/redux/actions/SideMenuListAction";

const App = () => {
  const isAuth = useSelector((state) => state.Login.isAuth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(SideMenuListAction.SideMenuListRequestAsync());
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Loader />
      <Snackbar />

      <Routes isAuth={isAuth} />
    </ThemeProvider>
  );
};

export default App;
