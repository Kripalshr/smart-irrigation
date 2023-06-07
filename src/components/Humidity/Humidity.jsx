import React, { Component } from 'react';
import './Humidity.css';
import humidity from '../../assets/Humidity.svg';
import axios from 'axios';

class Humidity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      humidityValue:  0,
    };
  }

  componentDidMount(){
    this.fetchHumidityValue();
    this.startHumidityValue();
  }

  fetchHumidityValue = () => {
    axios.get('http://localhost:3333/api/humidity')
      .then(response => {
        const humidity = response.data.humidity;
        this.setState({ humidityValue: humidity });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  startHumidityValue = () => {
    this.timer = setInterval(() => {
      this.fetchHumidityValue();
    }, 6000); // Fetch the meter value every 5 seconds (adjust the interval as needed)
  };

  render() {
    const { humidityValue } = this.state;

    return (
      <div className="humidity-container">
        <h2>Humidity</h2>
        <div className="humidity" style={{ width: 200, height: 200 }}>
          <img src={humidity} alt="Humidity" />
        </div>
        <div className='humidity-reading'><h2>{humidityValue}%</h2></div>
      </div>
    );
  }
}

export default Humidity;
