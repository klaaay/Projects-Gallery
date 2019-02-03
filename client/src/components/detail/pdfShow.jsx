import React, { Component } from "react";
// import { Document,Page } from 'react-pdf/dist/entry.webpack';

import "./styles/pdfShow.css";

import $ from "jquery";

export default class pdfShow extends Component {
  // state = {
  //   numPages: null,
  //   pageNumber: 1
  // };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  componentDidMount = () => {
    $(".myPdf").css("height", $(window).height() - 98);
    $(".myPdf-show").css("height", ($(window).height() - 98) * 0.8);
    $(".myPdf-gallery").css("height", ($(window).height() - 98) * 0.2);
  };

  render() {
    // const { pageNumber, numPages } = this.state;
    return (
      <div className="myPdf">
        {/* <div className="myPdf-show">
          <Document
            file="http://localhost:3030/data/0%E6%99%BA%E8%83%BD%E5%A4%A7%E6%95%B0%E6%8D%AE/%E5%9F%8E%E5%B8%82%E5%A4%9A%E5%B0%BA%E5%BA%A6%E5%A4%9A%E7%BB%B4%E5%BA%A6%E6%99%BA%E6%85%A7%E6%84%9F%E7%9F%A5%E7%9A%84%E5%85%B1%E6%80%A7%E6%8A%80%E6%9C%AF%E4%B8%8E%E4%BD%93%E7%B3%BB%E7%A0%94%E7%A9%B6/pdf/%E7%8E%8B%E5%A5%94%E8%B7%AF%E6%BC%94.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div> */}
        <embed src={this.props.pdf[0].pdf} type="" className="myPdf-show" />
        <div className="myPdf-gallery">
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
