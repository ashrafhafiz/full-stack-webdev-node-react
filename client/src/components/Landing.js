import React from "react";
import landingImg from "./undraw_investing_7u74.svg";

const Landing = () => {
  return (
    <div>
      <div className="site-blocks-cover" style={{ overflow: "hidden" }}>
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12" style={{ position: "relative" }}>
              <img
                src={landingImg}
                alt="landing shape"
                className="img-absolute bcimage"
              />
              <div className="row mb-4">
                <div className="col-lg-6 mr-auto">
                  <h1>Make Your Business More Profitable</h1>
                  <p className="mb-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laboriosam assumenda ea quo cupiditate facere deleniti fuga
                    officia.
                  </p>
                  <div>
                    <a href="/" className="btn btn-primary mr-2 mb-2">
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
