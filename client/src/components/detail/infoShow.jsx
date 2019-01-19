import React, { Component } from "react";

import { Row, Col } from "antd";

import "./styles/infoShow.css";

import $ from "jquery";

export default class infoShow extends Component {
  componentDidMount = () => {
    $(".infoRow").css("height", $(window).height() - 90);
    // $(".infoImg").css("height", $(window).height() - 319);
  };

  render() {
    return (
      <div>
        <Row
          type="flex"
          justify="space-around"
          align="middle"
          id="infoRow"
          className="infoRow"
        >
          <Col span={8}>
            <img className="infoImg" src={this.props.pic} alt="" />
          </Col>
          <Col span={12}>
            <h2 className="title">{this.props.title}</h2>
            <p className="description">{this.props.description}</p>
          </Col>
        </Row>
      </div>
    );
  }
}
