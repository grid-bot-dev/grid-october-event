import {
  AppstoreOutlined,
  BarChartOutlined,
  DashboardOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, ConfigProvider, Layout, Menu, Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import Item from "antd/es/menu/MenuItem";
import mermaid from "mermaid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const customTheme = {
  token: {
    colorPrimary: "#EAB308",
    colorLink: "#EAB308",
    colorLinkHover: "#f7931f",
    colorBgLayout: "#ffffff",
    colorInfo: "#EAB308",
  },
  components: {
    Layout: {
      siderBg: "rgb(245,245,245)",
      triggerBg: "rgb(241,241,241)",
    },
  },
};

const MermaidDiagram = ({ mermaidCode }) => {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "base",
      themeVariables: {
        primaryColor: "#ffdc6f",
        primaryTextColor: "#000",
        primaryBorderColor: "#000",
        lineColor: "#000",
        secondaryColor: "#ffdc6f",
        tertiaryColor: "#ffdc6f",
      },
    });

    mermaid.contentLoaded();
  }, []);

  return (
    <div
      className="mermaid"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
      dangerouslySetInnerHTML={{ __html: mermaidCode }}
    />
  );
};

const WebsiteFlow = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const mermaidCode = `
    graph TD
    A[User Visits Site] --> B{Authenticated?}
    B -->|No| C[Display SSO Login]
    C --> D[Google SSO Process]
    D --> E[Redirect to Dashboard]
    B -->|Yes| E
    E --> F[Initialize Dashboard]
    F --> G[Load KPIs]
    F --> H[Load Charts]
    F --> I[Load Tables]
    G --> J[Dashboard Ready]
    H --> J
    I --> J
    J --> K[User Interacts with Dashboard]
    K --> L[Update Components]
    L --> K
  `;

  return (
    <ConfigProvider theme={customTheme}>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          style={{
            backgroundColor: "#ffffff",
            boxShadow: "2px 0 8px 0 rgba(29,35,41,.05)",
          }}
          theme="light"
          width="20%"
        >
          <div
            className="logo"
            style={{ padding: "16px", textAlign: "center" }}
          >
            <AppstoreOutlined style={{ fontSize: "32px", color: "#EAB308" }} />
          </div>
          <Menu
            theme="light"
            defaultSelectedKeys={["2"]}
            mode="inline"
            style={{
              "& .ant-menu-item": {
                margin: "4px 0",
                borderRadius: "4px",
                "&:hover": {
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                },
              },
            }}
          >
            <Item
              key="1"
              icon={<DashboardOutlined />}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              Dashboard
            </Item>
            <Item
              key="2"
              icon={<BarChartOutlined />}
              onClick={() => {
                navigate("/erdiagram");
              }}
            >
              Entity Relationships
            </Item>
            <Item
              key="3"
              icon={<UserOutlined />}
              onClick={() => {
                navigate("/userflow");
              }}
            >
              User Flow
            </Item>
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              background: "#fff",
              padding: 0,
              borderBottom: "1px solid #f0f0f0",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Title level={3} style={{ margin: "0 0 0 16px" }}>
              Website Flow
            </Title>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <Card style={{ minHeight: 360 }}>
              <Title level={4} style={{ textAlign: "center" }}>
                User Flow Diagram
              </Title>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "calc(100% - 40px)",
                }}
              >
                <MermaidDiagram mermaidCode={mermaidCode} />
              </div>
            </Card>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default WebsiteFlow;
