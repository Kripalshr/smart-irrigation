import React, { Component } from "react";
import axios from "axios";
import LineChart from "../LineChart/LineChart";
import "./DataCharts.css";

class DataChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [
        // {
        //   time: new Date("2023-05-26T08:00:00"),
        //   soilMoisture: 80,
        //   temperature: 25,
        //   humidity: 50,
        // },
        // {
        //   time: new Date("2023-05-26T09:00:00"),
        //   soilMoisture: 75,
        //   temperature: 26,
        //   humidity: 55,
        // },
        // {
        //   time: new Date("2023-05-26T10:00:00"),
        //   soilMoisture: 85,
        //   temperature: 27,
        //   humidity: 60,
        // },
        // Add more data points...
      ],
    };
  }

  componentDidMount() {
    this.fetchSensorData();
    this.interval = setInterval(this.fetchSensorData, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchSensorData = async () => {
    const { chartData } = this.state;

    const newChartData = [...chartData];

    const currentTime = new Date().toISOString(); // Get the current local time

    const soilMoisture = await this.fetchMeterValue();
    const temperature = await this.fetchTemperatureValue();
    const humidity = await this.fetchHumidityValue();

    newChartData.push({
      time: currentTime,
      soilMoisture: soilMoisture,
      temperature: temperature,
      humidity: humidity,
    });

    this.setState({
      chartData: newChartData,
    });
  };

  fetchMeterValue = async () => {
    try {
      const response = await axios.get("http://localhost:3333/api/moisture");
      const moisture = response.data.moisture;
      return moisture;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchTemperatureValue = async () => {
    try {
      const response = await axios.get("http://localhost:3333/api/temperature");
      const temperature = response.data.temperature;
      return temperature;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  fetchHumidityValue = async () => {
    try {
      const response = await axios.get("http://localhost:3333/api/humidity");
      const humidity = response.data.humidity;
      return humidity;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  render() {
    const { chartData } = this.state;
    return (
      <div className="datachart-container">
        <div className="contents">
          <LineChart data={chartData} />
          <div>
            <h2>Index</h2>
            <div className="index-container">
              <div className="index">
                <div className="line-red" />
                <p>Humidity</p>
              </div>
              <div className="index">
                <div className="line-blue" />
                <p>soil Moisture</p>
              </div>
              <div className="index">
                <div className="line-green" />
                <p>temperature</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataChart;
