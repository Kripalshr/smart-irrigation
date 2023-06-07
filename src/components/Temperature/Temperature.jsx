import React, { Component } from 'react';
import './Temperature.css';
import temperature from '../../assets/Temperature.svg';
import axios from 'axios';

class Temperature extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperatureValue: 0,
    };
  }

  componentDidMount(){
    this.fetchTemperatureValue();
    this.startFetchingTemperatureValue();

  }

  fetchTemperatureValue = () => {
    axios.get('http://localhost:3333/api/temperature')
      .then(response => {
        const temperature = response.data.temperature;
        this.setState({ temperatureValue: temperature });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  startFetchingTemperatureValue = () => {
    this.timer = setInterval(() => {
      this.fetchTemperatureValue();
    }, 6000); // Fetch the meter value every 5 seconds (adjust the interval as needed)
  };

  render() {
    const { temperatureValue } = this.state;

    return (
      <div className="temperature-container">
        <h2>Temperature</h2>
        <div className="temperature" style={{ width: 200, height: 200 }}>
          <img src={temperature} alt="temp" />
        </div>
        <div className='temperature-reading'><h2>{temperatureValue}%</h2></div>
      </div>
    );
  }
}

export default Temperature;
