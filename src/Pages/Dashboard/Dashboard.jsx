import React, { Component } from 'react';
import './Dashboard.css';
import '../../components/Sidebar/Sidebar'
import Sidebar from '../../components/Sidebar/Sidebar';
import DashboardComponent from '../../components/DashboardComponent/DashboardComponent';

class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            
        }
    }
    render() { 
        return (
            <div>
                <Sidebar />
                <DashboardComponent />
            </div>
        );
    }
}
 
export default Dashboard;