import React, { Component } from "react";


import "./styles/card.css";

import Dotdotdot from "react-dotdotdot";

export default class card extends Component {
  render() {
    return (
      <div className="my-card">
        <img alt="" className="cardPic" src={this.props.pic} />
        <div className="card-info">
          <Dotdotdot clamp={4}>
            <p>
              {this.props.title}
              <br />
              {this.props.description}
            </p>
          </Dotdotdot>
        </div>
      </div>
    );
  }
}
