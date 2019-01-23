import React, { Component } from "react";

import "./styles/pdfShow.css";

import $ from "jquery";

export default class pdfShow extends Component {
  componentDidMount = () => {
    $(".myPdf").css("height", $(window).height() - 98);
    $(".myPdf-show").css("height", ($(window).height() - 98) * 0.8);
    $(".myPdf-gallery").css("height", ($(window).height() - 98) * 0.2);
  };

  render() {
    return (
      <div className="myPdf">
        <embed
          src={this.props.pdf[0].pdf}
          type=""
          className="myPdf-show"
        />
        <div
          className="myPdf-gallery"
        >
          {this.props.pdf.map((item, index) => (
            <img
              key={index}
              src={item.thumb}
              className={
                index === 0 ? "gallery-img gallery-img-selected" : "gallery-img"
              }
              alt={item.alt}
              onClick={e => {
                $(".myPdf-show").attr("src", item.pdf);
                $(".gallery-img").removeClass("gallery-img-selected");
                $(e.target).addClass("gallery-img-selected");
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}