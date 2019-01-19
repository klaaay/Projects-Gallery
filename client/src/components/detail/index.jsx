import React, { Component } from "react";

import { Layout, Tabs, Button, Breadcrumb } from "antd";
import { StickyContainer, Sticky } from "react-sticky";

import Content from "../layouts/content";

import projectDetail from "../../utils/projectDetail";

import InfoShow from "./infoShow";
import ImgShow from "./imgShow";
import PptShow from "./pptShow";
import VideoShow from "./videoShow";

import $ from "jquery";
import axios from "axios";

import "./styles/tabs.css";
import "./styles/breadcrumb.css";

const TabPane = Tabs.TabPane;

const navbarArray = [
  "智能大数据",
  "智能控制",
  "智慧电力",
  "智能环境",
  "智慧健康",
  "区块链"
];

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        style={{ ...style, zIndex: 1, background: "#fff", marginBottom: "0px" }}
      />
    )}
  </Sticky>
);
const queryString = require("query-string");
export default class details extends Component {
  state = {
    data: {}
  };

  componentDidMount = () => {
    axios.get("http://119.23.201.7:3030/").then(res => {
      this.setState({
        data: res.data
      });
    });
  };

  renderBackBtn = () => (
    <Button
      className="backBtn"
      onClick={() => {
        this.props.history.push("/");
      }}
    >
      返回
    </Button>
  );

  renderBreadcrumb = () => {
    let { title, classify } = queryString.parse(this.props.location.search);
    return (
      <Breadcrumb className="my-breadcrumb">
        <Breadcrumb.Item className="my-breadcrumb-item">
          {navbarArray[classify]}
        </Breadcrumb.Item>
        <Breadcrumb.Item className="my-breadcrumb-item">
          {title}
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  renderTabs = () => {
    let parsed = queryString.parse(this.props.location.search);
    if (this.state.data["classify" + parsed.classify]) {
      const { info, pic, video, ppt } = projectDetail(
        this.state.data["classify" + parsed.classify],
        parsed.title
      );
      return (
        <StickyContainer>
          <Tabs
            defaultActiveKey="1"
            renderTabBar={renderTabBar}
            onChange={() => {
              if ($("video").length > 0) {
                $("video")[0].pause();
              }
            }}
          >
            <TabPane tab="基本介绍" key="1">
              <InfoShow
                pic={info.pic}
                title={info.title}
                description={info.description}
              />
            </TabPane>
            <TabPane tab="图片展示" key="2">
              <ImgShow pic={pic} />
            </TabPane>
            <TabPane tab="视频演示" key="3">
              <VideoShow video={video} />
            </TabPane>
            <TabPane tab="演示文稿" key="4">
              <PptShow ppt={ppt} />
            </TabPane>
          </Tabs>
        </StickyContainer>
      );
    }
    return null;
  };

  render() {
    return (
      <Layout>
        <Content>
          {this.renderBackBtn()}
          {this.renderBreadcrumb()}
          {/* <Divider style={{ margin: "0" }} /> */}
          {this.renderTabs()}
        </Content>
      </Layout>
    );
  }
}
