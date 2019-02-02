import React, { Component } from "react";

import "./styles/infoShow.css";

import $ from "jquery";

export default class infoShow extends Component {
  componentDidMount = () => {
    $(".infoRow").css("height", $(window).height() - 90);
  };

  render() {
    return (
      <div className="infoRow" id="infoRow">
        <div className="info-space-1" />
        <div className="info-img">
          <img src={this.props.pic} alt="" />
        </div>
        <div className="info-space-2" />
        <div className="info-text">
          <h2 className="title">{this.props.title}</h2>
          <p className="description">{this.props.description}</p>
        </div>
      </div>
    );
  }
}
