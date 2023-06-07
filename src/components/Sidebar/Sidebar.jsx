import React, { Component } from "react";
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import dashboard from "../../assets/dashboard.svg";
// import { local } from "d3";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: "dashboard",
    };
  }

  handleItemClick = (pageName) => {
    this.setState({ activePage: pageName });
    this.props.onPageChange(pageName);
  };

  render() {
    const { activePage } = this.state;
    const sidebarItems = [
      { page: "dashboard", label: "Dashboard", icon: dashboard },
      { page: "data", label: "Data", icon: dashboard },
    ];

    return (
      <div className="side-bar">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h1>Rain Rain</h1>
        </div>
        <div className="sidebar-contents">
          <div className="sidebaritems">
            {sidebarItems.map((item) => (
              <div
                key={item.page}
                className={`item-dashboard ${
                  activePage === item.page ? "active" : ""
                }`}
                onClick={() => this.handleItemClick(item.page)}
              >
                <img src={item.icon} alt="" />
                <p>{item.label}</p>
              </div>
            ))}
          </div>
          <div className="sidebar-button"></div>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          type="submit"
          className="btn btn-success btn-lg btn-block logoutbutton"
        >
          logout
        </button>
      </div>
    );
  }
}

export default Sidebar;
