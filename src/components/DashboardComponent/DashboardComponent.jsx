import React, { Component } from "react";
import "./DashboardComponent.css";
import Meter from "../meter/Meter";
import Temperature from "../Temperature/Temperature";
import Humidity from "../Humidity/Humidity";
import Toggle from "react-toggle";
import "react-toggle/style.css";
// import axios from "axios";
import axiosInstance from "../../network";

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatureValue: 0,
      humidityValue: 0,
      loggedInName: "",
      smartIrrigation: false,
      manualIrrigation: false,
      recordData: false,
      isToken: "",
      userInfo: {},
    };
    this.timer = null;
  }

  fetchUserData = async () => {
    try {
      const { data } = await axiosInstance.get("/dashboard");
      console.log("---", data?.data);
      this.setState({ loggedInName: data?.data });
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle the error scenario
    }
  };

  componentDidMount() {
    // Simulating authentication and fetching data
    this.fetchUserData();
    // console.log(localStorage.getItem('token'));
    // this.setState({ loggedInName: "KRIPAL" }); // Replace with your authentication logic to get the logged-in user's name
    // this.fetchMeterValue(); // Fetch the meter value from the backend or set it to a default value
    // Fetch temperature and humidity values in a similar way
    // Start generating random values for demonstration purposes
    // this.startGeneratingValues();
    this.isToken = window.localStorage.getItem("accessToken");

    if (this.isToken === "" || this.isToken === null) {
      window.location.href = "/";
    }
  }

  handleToggleChange = () => {
    this.setState((prevState) => ({
      smartIrrigation: !prevState.smartIrrigation,
    }));
  };

  handleManualIrrigationToggle = () => {
    this.setState((prevState) => ({
      manualIrrigation: !prevState.manualIrrigation,
      recordData: false,
    }));
  };

  handleRecordDataToggle = () => {
    this.setState((prevState) => ({
      recordData: !prevState.recordData,
    }));
  };

  render() {
    const { loggedInName, smartIrrigation, manualIrrigation, recordData } =
      this.state;
    return (
      <div className="dashboard-container">
        <div className="contents">
          <h2> Welcome, {loggedInName}!!</h2>
          <div className="auto-irrigation-container">
            <div className="text-container">
              <h1>Start Smart Irrigation</h1>
              <p>
                This button will activate the smart irrigation system,
                optimizing water usage and promoting efficient plant hydration.
              </p>
            </div>
            <Toggle
              id="smart-irrigation-toggle"
              checked={smartIrrigation}
              disabled={manualIrrigation}
              onChange={this.handleToggleChange}
            />
          </div>
          <div className="dashboard-components">
            <Meter />
            <Temperature />
            <Humidity />
          </div>
          <div className="status-bar">
            <div className="status">Irrigation status :</div>
            <div className="on-off">
              <div className="text">{`${
                smartIrrigation || manualIrrigation ? "ON" : "OFF"
              }`}</div>
              <div
                className={`status-circle ${
                  smartIrrigation || manualIrrigation ? "green" : "red"
                }`}
              ></div>
            </div>
          </div>
          <div className="manual-controller">
            <div className="manual-irrigation-container">
              <div className="manual-irrigation">
                <h2>Start Irrigation </h2>
                <Toggle
                  id="manual-irrigation-toggle"
                  checked={manualIrrigation}
                  disabled={smartIrrigation}
                  onChange={this.handleManualIrrigationToggle}
                />
              </div>
            </div>
            <div className="manual-irrigation-container">
              <div className="manual-irrigation">
                <h2>Record Data </h2>
                <Toggle
                  id="record-data-toggle"
                  checked={recordData}
                  disabled={smartIrrigation || !manualIrrigation}
                  onChange={this.handleRecordDataToggle}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardComponent;
