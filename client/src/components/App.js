import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Header";
import Landing from "./Landing";
import Pricing from "./Pricing";
import About from "./About";
import * as actions from "../actions";

const Dashboard = () => {
  return (
    <div>
      <h3>Dashboard</h3>
    </div>
  );
};

const SurveyNew = () => {
  return (
    <div>
      <h3>SurveyNew</h3>
    </div>
  );
};

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Header></Header>
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}

export default connect(null, actions)(App);
