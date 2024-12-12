# Asset Management System Backend API Documentation

## Overview

This document details the backend API for the Asset Management System. Built using FastAPI, this API provides endpoints for retrieving asset data, portfolio metrics, risk analytics, and various visualizations for comprehensive asset management.

## Base URL

All API endpoints are relative to the base URL of your deployment. Replace `{BASE_URL}` with your actual deployment URL.

## Authentication

The current implementation uses basic database authentication. For production deployment, implement appropriate authentication mechanisms.

## Endpoints

### 1. Portfolio Overview

- **URL:** `{BASE_URL}/api/get_portfolio_overview`
- **Method:** GET
- **Description:** Retrieves comprehensive portfolio metrics and overview.
- **Response:** JSON object containing:
  - `total_assets`: Integer representing total number of assets
  - `total_value`: Float representing total portfolio value
  - `average_return`: Float representing average portfolio return (percentage)
  - `risk_distribution`: Array of objects showing risk category distribution
- **Example Response:**
  ```json
  {
    "total_assets": 1000,
    "total_value": 5000000.50,
    "average_return": 12.75,
    "risk_distribution": [
      {
        "risk_category": "High",
        "count": 200
      },
      {
        "risk_category": "Medium",
        "count": 500
      }
    ]
  }
  ```

### 2. Asset Allocation

- **URL:** `{BASE_URL}/api/get_asset_allocation`
- **Method:** GET
- **Description:** Retrieves asset allocation distribution by type.
- **Response:** JSON object representing a pie chart of asset allocation.
- **Note:** Returns Plotly figure JSON for frontend rendering.

### 3. Risk Metrics

- **URL:** `{BASE_URL}/api/get_risk_metrics`
- **Method:** GET
- **Description:** Retrieves key risk metrics for top assets.
- **Response:** Array of objects containing:
  - `asset_id`: String representing asset identifier
  - `asset_name`: String representing asset name
  - `var`: Float representing Value at Risk
  - `beta`: Float representing Beta value
  - `sharpe_ratio`: Float representing Sharpe Ratio
- **Example Response:**
  ```json
  [
    {
      "asset_id": "A001",
      "asset_name": "Tech Stock A",
      "var": 0.15,
      "beta": 1.2,
      "sharpe_ratio": 1.8
    }
  ]
  ```

### 4. Performance Dashboard

- **URL:** `{BASE_URL}/api/get_performance_dashboard`
- **Method:** GET
- **Description:** Retrieves performance metrics for top-performing assets.
- **Response:** JSON object containing array of top performers with:
  - `asset_name`: String
  - `total_return`: Float
  - `avg_daily_return`: Float
  - `avg_volatility`: Float
  - `performance_category`: String

### 5. Compliance Summary

- **URL:** `{BASE_URL}/api/get_compliance_summary`
- **Method:** GET
- **Description:** Retrieves compliance violation information.
- **Response:** Array of objects containing:
  - `asset_name`: String
  - `active_violations`: Integer
  - `last_compliance_check`: DateTime

### 6. Transaction Analysis

- **URL:** `{BASE_URL}/api/get_transaction_analysis`
- **Method:** GET
- **Description:** Retrieves monthly transaction volume trends.
- **Response:** JSON object representing a line chart of transaction volumes.
- **Note:** Returns Plotly figure JSON for frontend rendering.

### 7. Sector Exposure

- **URL:** `{BASE_URL}/api/get_sector_exposure`
- **Method:** GET
- **Description:** Retrieves sector-wise exposure distribution.
- **Response:** JSON object representing a pie chart of sector exposure.
- **Note:** Returns Plotly figure JSON for frontend rendering.

### 8. Geographic Distribution

- **URL:** `{BASE_URL}/api/get_geographic_distribution`
- **Method:** GET
- **Description:** Retrieves geographical distribution of investments.
- **Response:** JSON object representing a pie chart of geographic distribution.
- **Note:** Returns Plotly figure JSON for frontend rendering.

## Database Schema

The API interacts with a PostgreSQL database containing the following main tables:
- `asset_360`: Comprehensive asset information
- `asset_master`: Assets information
- `market_data`: Daily market asset information
- `transcation`: Daily entity asset information
- `portfolio_allocation`:  Inverstor Asset records
- `risk_metrics`: Risk Mertices
- `compliance_records`: Compliance Records
- `performance_history`: Asset History
- `counterparty_information`: Asset Information

## Dependencies

Key dependencies include:
- FastAPI: Web framework
- SQLAlchemy: Database ORM
- Google Cloud SQL Connector: Database connectivity
- Pandas: Data manipulation
- Plotly: Visualization generation

## Environment Variables

Required environment variables:
```
INSTANCE_CONNECTION_NAME=
DB_USER=
DB_PASS=
DB_NAME=
```

## Running the API

1. Install dependencies:
```bash
pip install fastapi uvicorn sqlalchemy google-cloud-sql-connector pandas plotly
```

2. Start the server:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Deployment Considerations

For production deployment:
- Implement robust authentication
- Use secure database connections
- Enable HTTPS
- Implement rate limiting
- Set up monitoring and logging
- Use production-grade ASGI server
- Implement caching where appropriate

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 4xx: Client errors
- 5xx: Server errors

Error responses include descriptive messages in JSON format.

This documentation provides a comprehensive overview of the Asset Management System's backend API, its endpoints, and implementation details. Adjust the content based on your specific implementation and requirements.