import './App.css';
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Interventions from './Interventions';
import Dashboard from './Dashboard';
import ChartPage from './ChartPage';
import Home from './Home';
import Upload from './Upload';

function DashboardIcon(props) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M924.8 385.6a446.7 446.7 0 00-96-142.4 446.7 446.7 0 00-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 00-142.4 96 446.7 446.7 0 00-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4zM482 232c0-4.4 3.6-8 8-8h44c4.4 0 8 3.6 8 8v80c0 4.4-3.6 8-8 8h-44c-4.4 0-8-3.6-8-8v-80zM270 582c0 4.4-3.6 8-8 8h-80c-4.4 0-8-3.6-8-8v-44c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v44zm90.7-204.5l-31.1 31.1a8.03 8.03 0 01-11.3 0L261.7 352a8.03 8.03 0 010-11.3l31.1-31.1c3.1-3.1 8.2-3.1 11.3 0l56.6 56.6c3.1 3.1 3.1 8.2 0 11.3zm291.1 83.6l-84.5 84.5c5 18.7.2 39.4-14.5 54.1a55.95 55.95 0 01-79.2 0 55.95 55.95 0 010-79.2 55.87 55.87 0 0154.1-14.5l84.5-84.5c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3c3.1 3.1 3.1 8.1 0 11.3zm43-52.4l-31.1-31.1a8.03 8.03 0 010-11.3l56.6-56.6c3.1-3.1 8.2-3.1 11.3 0l31.1 31.1c3.1 3.1 3.1 8.2 0 11.3l-56.6 56.6a8.03 8.03 0 01-11.3 0zM846 582c0 4.4-3.6 8-8 8h-80c-4.4 0-8-3.6-8-8v-44c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v44z" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 00-44.4 0L77.5 505a63.9 63.9 0 00-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0018.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
    </svg>
  );
}

function LineChartIcon(props) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M888 792H200V168c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v688c0 4.4 3.6 8 8 8h752c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM305.8 637.7c3.1 3.1 8.1 3.1 11.3 0l138.3-137.6L583 628.5c3.1 3.1 8.2 3.1 11.3 0l275.4-275.3c3.1-3.1 3.1-8.2 0-11.3l-39.6-39.6a8.03 8.03 0 00-11.3 0l-230 229.9L461.4 404a8.03 8.03 0 00-11.3 0L266.3 586.7a8.03 8.03 0 000 11.3l39.5 39.7z" />
    </svg>
  );
}

function EducationIcon(props) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M3.33 8L10 12l10-6-10-6L0 6h10v2H3.33zM0 8v8l2-2.22V9.2L0 8zm10 12l-5-3-2-1.2v-6l7 4.2 7-4.2v6L10 20z" />
    </svg>
  );
}

function BxUploadIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M11 15h2V9h3l-4-5-4 5h3z" />
      <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z" />
    </svg>
  );
}


function App() {

  return (
    <Router>
      <div className="App">
        <header>
          <div className="px-3 py-2 bg-light">
            <div className="container">
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <Link to="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-decoration-none text-dark">
                  <img className="logo" width="50" src="/doh_logo_transparent.png"/>
                  <span className="fw-light px-3">Opioid Overdose Prediction Dashboard</span>
                </Link>

                <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                  <li>
                    <NavLink exact to="/" className="nav-link link-dark" activeClassName="text-info">
                      <HomeIcon className="d-block mx-auto mb-1" width="24" height="24"/>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard" className="nav-link link-dark" activeClassName="text-info">
                      <DashboardIcon className="d-block mx-auto mb-1" width="24" height="24"/>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/charts" className="nav-link link-dark" activeClassName="text-info">
                      <LineChartIcon className="d-block mx-auto mb-1" width="24" height="24"/>
                      Charts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/interventions" className="nav-link link-dark" activeClassName="text-info">
                      <EducationIcon className="d-block mx-auto mb-1" width="24" height="24"/>
                      Interventions
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/upload" className="nav-link link-dark" activeClassName="text-info">
                      <BxUploadIcon className="d-block mx-auto mb-1" width="24" height="24"/>
                      Upload
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <Switch>
          <Route path="/interventions">
            <Interventions />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/charts">
            <ChartPage />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
