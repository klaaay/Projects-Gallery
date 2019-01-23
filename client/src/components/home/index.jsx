import React, { Component } from "react";
import { Layout, Menu, Row, Col, Pagination, Carousel, Input } from "antd";
import { Link } from "react-router-dom";

import Head from "../layouts/head";
import Content from "../layouts/content";

import Card from "./card";

import groupArray from "../../utils/groupArray";
import pageSelector from "../../utils/pageSelector";

import $ from "jquery";
import axios from "axios";
import config from "../../config";

import "./styles/head.css";
import "./styles/homeCarousel.css";
import "./styles/homePagination.css";

const Search = Input.Search;
let data;

export default class main extends Component {
  cardInfoAnimation = () => {
    var $carImg;
    var $carInfo;
    $(".my-card").hover(
      function(event) {
        $carImg = $(event.target);
        $carInfo = $($(event.target).siblings()[0]);
        $carInfo.css("display", "block");
        $carImg.animate({
          width: "120%"
        });
        $carInfo.animate({
          opacity: 1
        });
      },
      function(event) {
        $carInfo.css("display", "none");
        $carImg.animate({
          width: "100%"
        });
        $carInfo.animate({
          opacity: 0
        });
      }
    );
  };

  componentDidMount = () => {
    axios.get(config.INFO_API).then(res => {
      data = res.data;
      this.setState({
        originalProjects: data.classify0,
        filterProjects: data.classify0,
        navbarInfo: data.navbarInfo
      });
    });

    $(".my-card").css("height", Math.floor(($(window).height() - 470) / 2));
    $(".card-info").css(
      "top",
      Math.floor(($(window).height() - 470) / 2) * -1 + "px"
    );
    this.cardInfoAnimation();
  };

  componentDidUpdate = (prevProps, prevState) => {
    $(".my-card").css("height", Math.floor(($(window).height() - 470) / 2));
    $(".card-info").css(
      "top",
      Math.floor(($(window).height() - 470) / 2) * -1 + "px"
    );
    this.cardInfoAnimation();
  };

  state = {
    navbarInfo: [],
    originalProjects: [],
    filterProjects: [],
    page: 1,
    filter: false,
    classify: 0
  };

  onSearch = value => {
    let originalProjects = this.state.originalProjects;
    if (value !== "") {
      let filterProjects = this.state.originalProjects
        .filter(item => {
          return item.info.title.search(value) !== -1;
        })
        .splice(0, 8);
      this.setState({
        filterProjects: filterProjects,
        filter: true
      });
    } else {
      this.setState({
        filterProjects: originalProjects,
        filter: false
      });
    }
  };

  renderNavbar = () => {
    return (
      <Head id="home-head">
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          onSelect={({ key }) => {
            this.setState({
              classify: key - 1,
              originalProjects: data["classify" + (key - 1)],
              filterProjects: data["classify" + (key - 1)],
              page: 1
            });
          }}
        >
          {this.state.navbarInfo.map((item, index) => (
            <Menu.Item key={index + 1}>
              <img
                alt=""
                src={item.icon}
                style={{ paddingRight: "5px", width: "20px", height: "16px" }}
              />
              {item.text}
            </Menu.Item>
          ))}
          <React.Fragment>
            <Search
              placeholder="输入想要查找的项目"
              onSearch={this.onSearch}
              className="head-search"
            />
          </React.Fragment>
        </Menu>
      </Head>
    );
  };

  renderCarousel = () => (
    <Carousel autoplay>
      {this.state.originalProjects
        .concat()
        .splice(0, 4)
        .map((item, index) => {
          return (
            <div className="homeCarousel" key={index}>
              <Link
                to={`/detail?title=${item.info.title}&classify=${
                  this.state.classify
                }`}
                style={{ width: "100%" }}
              >
                <img src={item.info.pic} alt="" className="homeCarousel-img" />
              </Link>
            </div>
          );
        })}
    </Carousel>
  );

  renderItem = filterProjects => {
    return groupArray(filterProjects, 4).map((array, index) => {
      return (
        <Row gutter={16} style={{ margin: "30px" }} key={array[0].info.title}>
          {array.map((item, index) => (
            <Col span={6} key={index}>
              <Link
                to={`/detail?title=${item.info.title}&classify=${
                  this.state.classify
                }`}
              >
                <Card
                  title={item.info.title}
                  pic={item.info.pic}
                  description={item.info.description}
                />
              </Link>
            </Col>
          ))}
        </Row>
      );
    });
  };

  render() {
    return (
      <Layout>
        {this.renderNavbar()}
        <Content>
          <div>
            {this.renderCarousel()}
            {this.renderItem(
              this.state.filter
                ? this.state.filterProjects
                : pageSelector(this.state.filterProjects, this.state.page)
            )}
          </div>
          <Pagination
            defaultCurrent={this.state.page}
            pageSize={8}
            total={this.state.filterProjects.length}
            className="home-pagination"
            onChange={value => {
              this.setState({
                page: value
              });
            }}
          />
        </Content>
      </Layout>
    );
  }
}
