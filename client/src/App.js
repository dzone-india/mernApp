import React,{useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Container} from "@material-ui/core";
import routes from "../src/routes";
import {useSelector} from "react-redux";
import Header from "../src/components/header";
import Footer from "../src/components/footer";
import EmiCalculater from "./components/emiCalculater/emiCalculater";
import EnquryForm from "./components/enquryForm/enquryForm";
import Snackbar from "./components/snackbar/Snackbar";

const App = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  const isAuth = useSelector((state) => state.Login.isAuth);

  return (
    <Router>
      <Header />
      {/* <EmiCalculater /> */}
      <Snackbar />
      <EnquryForm />
      <Switch>
        {routes.map((route, i) => (
          <Route
            exact={route.exact}
            path={route.path}
            render={() => route.render({isAuth})}
            key={i}
          />
        ))}
      </Switch>
      <div className="footer-section">
        <Container style={{paddingTop: 10, paddingBottom: 40}}>
          <Footer />
        </Container>
      </div>
    </Router>
  );
};

export default App;
