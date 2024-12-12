import {
  AppstoreOutlined,
  BarChartOutlined,
  HomeOutlined,
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
    colorPrimary: "#FFC107",
    colorLink: "#FFC107",
    colorLinkHover: "#FFD54F",
    colorBgLayout: "#ffffff",
    colorInfo: "#FFC107",
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
        primaryColor: "#fff3cd",
        primaryTextColor: "#000",
        primaryBorderColor: "#000",
        lineColor: "#000",
        secondaryColor: "#fff3cd",
        tertiaryColor: "#fff3cd",
      },
    });

    mermaid.contentLoaded();
  }, []);

  return (
    <div
      className="mermaid"
      dangerouslySetInnerHTML={{ __html: mermaidCode }}
    />
  );
};

const SankeyDiagram = () => {
  const [collapsed, setCollapsed] = useState(true);
  const navigate = useNavigate();

  const mermaidCode = `
    erDiagram
    %% Original 8 Tables
    asset_master {
        int asset_id PK
        text asset_name
        text asset_type
        text isin
        text currency
        text status
    }
    
    market_data {
        int data_id PK
        int asset_id FK
        date price_date
        decimal closing_price
        decimal bid_price
        decimal ask_price
    }
    
    transactions {
        int transaction_id PK
        int asset_id FK
        date transaction_date
        text transaction_type
        decimal amount
    }
    
    portfolio_allocation {
        int allocation_id PK
        int asset_id FK
        decimal target_percentage
        decimal actual_percentage
    }
    
    risk_metrics {
        int metric_id PK
        int asset_id FK
        decimal volatility
        decimal beta
        decimal var_95
    }
    
    compliance_records {
        int compliance_id PK
        int asset_id FK
        date check_date
        text status
    }
    
    performance_history {
        int performance_id PK
        int asset_id FK
        date date
        decimal daily_return
        decimal total_return
    }
    
    counterparty_info {
        int counterparty_id PK
        text name
        text type
        text status
    }

    %% Relationships between original tables
    asset_master ||--o{ market_data : has
    asset_master ||--o{ transactions : has
    asset_master ||--o{ portfolio_allocation : has
    asset_master ||--o{ risk_metrics : has
    asset_master ||--o{ compliance_records : has
    asset_master ||--o{ performance_history : has
    transactions }o--|| counterparty_info : involves

    %% 5 Temporary Tables
    temp_basic_info {
        int asset_id PK
        text asset_name
        decimal current_price
        decimal market_value
    }
    
    temp_performance {
        int asset_id PK
        decimal avg_daily_return
        decimal total_return
    }
    
    temp_risk_profile {
        int asset_id PK
        decimal avg_volatility
        decimal value_at_risk
    }
    
    temp_transaction_summary {
        int asset_id PK
        int total_transactions
        decimal total_amount
    }
    
    temp_compliance {
        int asset_id PK
        int violations
        date last_check
    }

    %% Relationships from original to temp tables
    asset_master ||--o{ temp_basic_info : transforms
    market_data ||--o{ temp_basic_info : transforms
    performance_history ||--o{ temp_performance : transforms
    risk_metrics ||--o{ temp_risk_profile : transforms
    transactions ||--o{ temp_transaction_summary : transforms
    compliance_records ||--o{ temp_compliance : transforms

    %% Final Asset 360 Table
    asset_360 {
        int asset_id PK
        text asset_name
        decimal current_price
        decimal market_value
        decimal avg_daily_return
        decimal total_return
        decimal avg_volatility
        decimal value_at_risk
        int total_transactions
        int violations
        text risk_category
        text performance_category
    }

    %% Relationships from temp tables to final
    temp_basic_info ||--o{ asset_360 : consolidates
    temp_performance ||--o{ asset_360 : consolidates
    temp_risk_profile ||--o{ asset_360 : consolidates
    temp_transaction_summary ||--o{ asset_360 : consolidates
    temp_compliance ||--o{ asset_360 : consolidates
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
              icon={<HomeOutlined />}
              onClick={() => {
                console.log("clicked");
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
              Entity Relationships
            </Title>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <Card title="Database Schema">
              <MermaidDiagram mermaidCode={mermaidCode} />
            </Card>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default SankeyDiagram;
