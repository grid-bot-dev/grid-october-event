# Financial Asset Management System

## Project Overview
This monorepo contains a Financial Asset Management System, including a FastAPI backend, database setup scripts, and infrastructure configurations. The system provides comprehensive asset tracking, performance monitoring, and risk analytics capabilities.

## Repository Structure
```
financial_asset_management/
├── backend/
├── asset_management/
├── docs/
├── frontend/
├── docker-compose.yml
├── main.tf
├── pyproject.toml
└── README.md
```

## Backend
The backend is built using FastAPI and provides API endpoints for accessing Assest Management data and analytics.

### Setup and Running
1. Navigate to the `backend` directory
2. Install dependencies: `pip install -r requirements.txt`
3. Run the server: `uvicorn main:app --host 0.0.0.0 --port 8000`

### API Endpoints
- `/`: Displays a welcome message to the users
- `/api/get_portfolio_overview`: Provides key performance indicators of the portfolio
- `/api/get_asset_allocation`: Shows the distribution by asset type
- `/api/get_risk_metrics`: Retrieves risk analytics including Value at Risk
- `/api/get_performance_dashboard`: Displays top performers with performance metrics
- `/api/get_compliance_summary`: Summarizes compliance status and active violations
- `/api/get_transaction_analysis`: Analyzes transaction volume and costs
- `/api/get_sector_exposure`: Analyzes exposure by sector
- `/api/get_geographic_distribution`: Provides geographic distribution of assets

## Assest Developement Platform
The Assest Developement Platform component handles database setup, data initialization, and Asset procedure creation.

### Asset Procedure
The Assest procedure is defined in `asset_procedure.py`. It creates the asset_360 table, which provides a comprehensive view of all asset of an entity.

## Database Schema Design

### Source Tables:

1. Asset Master:
```sql
asset_master
- asset_id (primary key)
- asset_name
- asset_type
- isin
- currency
- issuer
- issue_date
- maturity_date
- par_value
- rating
- sector
- issuing_country
- status
```

2. Market Data:
```sql
market_data
- data_id (primary key)
- asset_id (foreign key)
- price_date
- closing_price
- opening_price
- high_price
- low_price
- volume
- bid_price
- ask_price
- yield_rate
```

3. Transactions:
```sql
transactions
- transaction_id (primary key)
- asset_id (foreign key)
- transaction_date
- transaction_type
- quantity
- price
- total_amount
- counterparty_id
- portfolio_id
- transaction_costs
```

4. Portfolio Allocation:
```sql
portfolio_allocation
- allocation_id (primary key)
- portfolio_id
- asset_id (foreign key)
- target_percentage
- actual_percentage
- last_rebalance_date
```

5. Risk Metrics:
```sql
risk_metrics
- metric_id (primary key)
- asset_id (foreign key)
- calculation_date
- volatility
- beta
- sharpe_ratio
- var_95
- tracking_error
```

6. Compliance Records

```sql
compliance_records
- compliance_id (primary key)
- asset_id (foreign key)
- check_date
- rule_id
- rule_description
- status
- violation_details
```

7. Performance History

```sql
performance_history
- performance_id (primary key)
- asset_id (foreign key)
- date
- daily_return
- mtd_return
- ytd_return
- total_return
```

8. Counterparty Info

```sql
counterparty_info
- counterparty_id (primary key)
- name
- type
- rating
- country
- status
```

### Asset 360 View:
```sql
asset_360
- asset_id
- asset_name
- asset_type
- current_price
- market_value
- avg_daily_return
- total_return
- avg_volatility
- value_at_risk
- beta
- sharpe_ratio
- total_transactions
- total_purchases
- total_sales
- avg_transaction_cost
- active_violations
- last_compliance_check
- risk_category
- performance_category
- position_size
```

### Interacting with the Database
The application uses SQLAlchemy with asyncpg for asynchronous database operations. To interact with the database:

1. Ensure you have the necessary environment variables set (DB_USER, DB_PASS, DB_NAME, INSTANCE_CONNECTION_NAME)
2. Use the `get_db_session()` function in `backend_logic.py` to obtain a database session
3. Use SQLAlchemy's text() function to write raw SQL queries or use SQLAlchemy's ORM for more complex operations

Example:
```python
async with await get_db_session() as session:
    result = await session.execute(text("SELECT * FROM asset_360 LIMIT 10"))
    customers = result.fetchall()
```

## Frontend
(Placeholder for future frontend development)


## Analytics Dashboard Elements:

1. Portfolio Overview:
   - Risk Distribution Percentage

2. Asset Allocation:
   - Distribution by Asset Type
   - Asset Value Distribution
   - Asset Count by Category

3. Risk Analytics:
   - Value at Risk (VaR)
   - Beta Coefficients
   - Sharpe Ratios
   - Top 10 Riskiest Assets

4. Performance Metrics:
   - Top Performers
   - Daily Returns
   - Volatility Measures
   - Performance Categories

5. Compliance Monitoring:
   - Active Violations
   - Last Checks
   - Violation

6. Transaction Analysis:
   - Monthly Volume Trends
   - Transaction Costs
   - Buy/Sell Patterns

7. Sector Exposure:
   - Asset distribution by sector

8. Geographic Distribution:
   - Asset distribution by country

## Development Setup

### Prerequisites
- Docker and Docker Compose
- Python 3.9+
- PostgreSQL 13+
- Node.js 14+ (for frontend)

### Local Development
1. Clone the repository
2. Run `docker-compose up --build`
3. Access the backend at `http://localhost:8000`
4. Access the frontend at `http://localhost:3000`

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a pull request