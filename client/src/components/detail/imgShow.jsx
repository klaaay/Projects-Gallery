import React, { Component } from "react";

import "./styles/imgShow.css";

import $ from "jquery";

import ImageGallery from "react-image-gallery";

export default class imgShow extends Component {
  render() {
    return (
      <ImageGallery
        items={this.props.pic}
        showPlayButton={false}
        showFullscreenButton={false}
        autoPlay={true}
        onImageLoad={() => {
          $(".image-gallery-image>img").css("height", $(window).height() - 240);
        }}
      />
    );
  }
}
