import React, { Component } from "react";
import "./Meter.css";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import soilmoisture from "../../assets/soil-moisture.png";
import axios from "axios";

class Meter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meterValue: 10,
    };
  }

  componentDidMount() {
    // Simulating authentication and fetching data
    this.fetchMeterValue();
    this.startFetchingMeterValue();
    // console.log(localStorage.getItem('token'));
    // this.setState({ loggedInName: "KRIPAL" }); // Replace with your authentication logic to get the logged-in user's name
    // this.fetchMeterValue(); // Fetch the meter value from the backend or set it to a default value
    // Fetch temperature and humidity values in a similar way
    // Start generating random values for demonstration purposes
    // this.startGeneratingValues();
  }

  fetchMeterValue = () => {
    axios
      .get("http://localhost:3333/api/moisture")
      .then((response) => {
        const moisture = response.data.moisture;
        this.setState({ meterValue: moisture });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  startFetchingMeterValue = () => {
    this.timer = setInterval(() => {
      this.fetchMeterValue();
    }, 6000); // Fetch the meter value every 5 seconds (adjust the interval as needed)
  };

  render() {
    const { meterValue } = this.state;

    let pathColor;
    if (meterValue < 20) {
      pathColor = "red";
    } else if (meterValue >= 20 && meterValue <= 60) {
      pathColor = "orange";
    } else {
      pathColor = "green";
    }

    return (
      <div className="meter-container">
        <h2>Soil Moisture</h2>
        <div className="meter" style={{ width: 200, height: 200 }}>
          <CircularProgressbarWithChildren
            value={meterValue}
            // text={`${meterValue}%`}
            strokeWidth={10}
            styles={buildStyles({
              // Rotation of path and trail, in number of turns (0-1)
              rotation: 0.5,

              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "butt",

              // Text size
              textSize: "16px",

              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,

              // Can specify path transition in more detail, or remove it entirely
              // pathTransition: 'none',

              // Color
              pathColor: pathColor,
              textColor: "#f88",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          >
            <img className="soil-image" src={soilmoisture} alt="doge" />
          </CircularProgressbarWithChildren>
        </div>
        <div className="meter-reading">
          <h2>{meterValue}%</h2>
        </div>
      </div>
    );
  }
}

export default Meter;
