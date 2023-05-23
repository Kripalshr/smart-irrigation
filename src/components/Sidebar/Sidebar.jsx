import React, { Component } from 'react';
import './Sidebar.css';
import logo from '../../assets/logo.png';

class Sidebar extends Component {
    constructor(){
        super();
        this.state = {}
    }
    render() { 
        return (
            <div className="side-bar">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                    <h1>Rain Rain</h1>
                </div>
                <div className="sidebaritems">
                    <div className="item">
                        <img src="" alt="" />
                        <p>Dashboard</p>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Sidebar;