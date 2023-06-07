import React, { Component } from 'react';
import './Dashboard.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import DashboardComponent from '../../components/DashboardComponent/DashboardComponent';
import DataChart from '../../components/DataCharts/DataCharts';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
    activePage: 'dashboard',
  };
}

handlePageChange = (pageName) => {
  this.setState({ activePage: pageName });
};

renderContent() {
  const { activePage } = this.state;

  if (activePage === 'dashboard') {
    return <DashboardComponent />;
  } else if (activePage === 'data') {
    return <DataChart />;
  }

  // Add more conditions for other pages if needed

  return null;
}

render() {
  return (
    <div>
      <Sidebar onPageChange={this.handlePageChange} />
      {this.renderContent()}
    </div>
  );
}
}

export default Dashboard;
