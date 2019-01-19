import React, { Component } from "react";

import "./styles/pptShow.css";

import $ from "jquery";

export default class pptShow extends Component {
  componentDidMount = () => {
    $(".myPpt").attr("height", $(window).height() - 98);
  };

  render() {
    return (
      <div>
        <iframe
          title={"ppt"}
          src={this.props.ppt}
          width={"100%"}
          className="myPpt"
          allowFullScreen={true}
        />
      </div>
    );
  }
}
