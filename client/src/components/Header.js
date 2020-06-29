import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
  renderContent = () => {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <>
            <li className="nav-item">
              <a className="nav-link" href="/auth/google">
                Login with Google <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/auth/twitter">
                Login with Twitter
              </a>
            </li>
          </>
        );

      default:
        return (
          <>
            <li className="nav-item mx-3 font-weight-bold text-white my-auto">
              Credits: {this.props.auth.credits}
            </li>
            <li className="nav-item mr-2">
              <Payments />
            </li>
            <li className="nav-item mr-2">
              <a className="nav-link" href="/pricing">
                Pricing
              </a>
            </li>
            <li className="nav-item mr-2">
              <a className="nav-link" href="/api/logout">
                Logout
              </a>
            </li>
          </>
        );
    }
  };
  render() {
    console.log(this.props.auth);

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="navbar-brand text-success"
          >
            Emaily
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarColor01"
          >
            <ul className="navbar-nav ml-auto">{this.renderContent()}</ul>
            {/* <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form> */}
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Header);
