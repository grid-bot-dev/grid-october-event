File: Functional-Level Business Logic for backend\_logic.py
The code defines a backend system that performs various data retrieval and processing tasks for a portfolio management application. It interacts with a database hosted on Google Cloud SQL and provides analytics and insights into financial assets, transactions, and compliance. Below is a comprehensive explanation of the business logic for each function and their interactions.

## **Purpose of the Module**

This backend module is responsible for:
1.  Establishing a secure connection to the database.
2.  Fetching and processing data related to assets, transactions, risks, compliance, and other metrics.
3.  Returning processed data in structured formats (e.g., JSON, dictionaries) or visualizations (e.g., charts) for further consumption by other components, such as a frontend application or reporting tools.

## **Key Components and Functions**

### **1\. init\_connection\_pool**

#### **Purpose**: 
This function initializes a connection pool to the database using Google Cloud's SQL Connector.

#### **Key Operations:**
*   Establishes an asynchronous connection to the database.
*   Utilizes environment variables to retrieve database credentials securely.

#### **Inputs**: No direct inputs; uses environment variables:
*   INSTANCE\_CONNECTION\_NAME, DB\_USER, DB\_PASS, DB\_NAME

#### **Outputs**: Returns:
*   engine: A SQLAlchemy async engine for database interactions.
*   connector: A connector instance to manage the database connection.
    
### **2\. get\_db\_session**

#### **Purpose**: 
Creates an asynchronous database session for executing SQL queries.

#### **Key Operations:**
*   Uses the engine returned by init\_connection\_pool to create a session.

#### **Inputs**: 
*   engine: The database engine created in the previous function.
    
#### **Outputs**: 
*   Returns a session object that can be used to interact with the database.
    
### **3\. get\_portfolio\_overview**

#### **Purpose**: 
Fetches an overview of the financial portfolio, including total assets, total value, average returns, and risk distribution.

#### **Key Operations:**
*   Executes SQL queries to calculate:
    *   Total distinct assets.
    *   Sum of market values.
    *   Average return.
    *   Risk distribution (grouped by risk category).
*   Converts the risk distribution into a dictionary format using Pandas.
    
#### **Inputs**: 
No direct inputs; retrieves data from the asset\_360 database table.

#### **Outputs**: 
A dictionary containing:
*   total\_assets: Total count of unique assets.
*   total\_value: Sum of all market values, rounded to two decimals.
*   average\_return: Average return percentage, rounded to two decimals.
*   risk\_distribution: A list of dictionaries representing risk categories and their respective counts.    

### **4\. get\_asset\_allocation**

#### **Purpose**: 
Provides an allocation breakdown of assets by type, visualized as a pie chart.

#### **Key Operations:**
*   Queries the database for asset type, total market value, and count of assets.
*   Creates a Pandas DataFrame for the results.
*   Generates a pie chart using Plotly.
    
#### **Inputs**: 
No direct inputs; retrieves data from the asset\_360 table.

#### **Outputs**: 
*   A JSON representation of the pie chart showing asset allocation by type.
    
### **5\. get\_risk\_metrics**

#### **Purpose**: 
Fetches and returns the top 10 assets based on value-at-risk metrics, along with other key indicators such as beta and Sharpe ratio.

#### **Key Operations:**
*   Retrieves distinct assets ordered by value\_at\_risk in descending order.
*   Uses Pandas to structure the data into a list of dictionaries.
    
#### **Inputs**: No direct inputs; queries the asset\_360 table.

#### **Outputs**: 
A list of dictionaries, each containing:
*   asset\_id, asset\_name, value\_at\_risk, beta, and sharpe\_ratio.
    
### **6\. get\_performance\_dashboard**

#### **Purpose**: 
Identifies the top 5 performing assets based on total returns.

#### **Key Operations:**
*   Retrieves distinct assets with the highest total\_return, along with other metrics such as avg\_daily\_return and avg\_volatility.
*   Structures the data into a list of dictionaries.
    
#### **Inputs**: No direct inputs; queries the asset\_360 table.

#### **Outputs**: 
A dictionary containing:
*   top\_performers: A list of top-performing assets with their performance metrics.
    
### **7\. get\_compliance\_summary**

#### **Purpose**: 
Fetches assets with active compliance violations.

#### **Key Operations:**
*   Retrieves assets with active\_violations greater than zero.
*   Orders results by the number of violations in descending order.
    
#### **Inputs**: 
No direct inputs; queries the asset\_360 table.

#### **Outputs**: 
A list of dictionaries containing:
*   asset\_name, active\_violations, and last\_compliance\_check.
    
### **8\. get\_transaction\_analysis**

#### **Purpose**: 
Analyzes transaction volume over the past 12 months and provides a monthly breakdown.

#### **Key Operations:**
*   Groups transactions by month and sums their total amounts.
*   Structures the results into a Pandas DataFrame.
*   Generates a line chart using Plotly.
    
#### **Inputs**: 
No direct inputs; queries the transactions table.

#### **Outputs**: 
*   A JSON representation of the line chart showing monthly transaction volume.
    
### **9\. get\_sector\_exposure**

#### **Purpose**: 
Analyzes portfolio exposure across different sectors and visualizes the percentage share.

#### **Key Operations:**
*   Counts assets grouped by sector and calculates the percentage share.
*   Uses Plotly to generate a pie chart.
    
#### **Inputs**: No direct inputs; queries the asset\_360 table.

#### **Outputs**: 
*   A JSON representation of the pie chart showing sector-wise exposure.
    
### **10\. get\_geographic\_distribution**

#### **Purpose**: 
Analyzes investment distribution across different countries.

#### **Key Operations:**
*   Counts assets grouped by their issuing country and calculates the percentage share.
*   Uses Plotly to generate a pie chart.
    
#### **Inputs**: No direct inputs; queries the asset\_360 table.

#### **Outputs**: 
*   A JSON representation of the pie chart showing geographic investment distribution.
    
#### **Interaction Between Components**

1.  **Database Connection:**
    *   init\_connection\_pool and get\_db\_session are foundational components that manage database connectivity and enable SQL queries for all other functions.

2.  **Data Retrieval and Processing:**    
    *   Functions such as get\_portfolio\_overview and get\_asset\_allocation retrieve raw data using SQL queries and process it into meaningful insights or visualizations.
        
3.  **Data Flow:**
    *   Raw data flows from the database to the functions, where it is processed using Pandas and Plotly, and then returned in structured formats (e.g., JSON, dictionaries).
        

#### **Expected Outcomes**

1.  **Users/Frontend Systems:**
    *   The frontend can use the returned JSON and dictionary data to display charts, graphs, and other metrics.
        
2.  **System Reliability:**
    *   Secure connections ensure data integrity and compliance.
        
3.  **Performance Insights:**
    *   Users gain actionable insights into portfolio performance, compliance, and risk metrics.

================================================================================

File: Functional-Level Business Logic for asset\_360\_procedure.py
The asset\_360\_procedure.py script is designed to create and execute a SQL procedure (create\_asset\_360) that aggregates and analyzes data from various tables in a PostgreSQL database. The script also handles the database connection, session management, and execution flow. Below is the functional-level breakdown:

#### **Purpose and Functional Overview**

1.  **Objective**:
    *   The script automates the creation and execution of a procedure to generate a comprehensive asset\_360 table.
    *   The table provides a consolidated view of asset details, performance metrics, risk profiles, transaction summaries, and compliance statuses.
        
2.  **Key Features**:
    *   Establishes an asynchronous connection to a PostgreSQL database using sqlalchemy and Google Cloud SQL Connector.
    *   Defines a SQL procedure (create\_asset\_360) that creates temporary tables, performs data aggregation, and generates the final asset\_360 table.
    *   Includes error handling, ensuring rollback and cleanup if issues occur.

## **Detailed Functional Explanation**

### **1\. Database Connection Initialization**

#### **init\_connection\_pool(connector)**

*   **Purpose**: Establishes a connection pool to the PostgreSQL database asynchronously.

*   **Input**:
    *   Google Cloud SQL Connector object (connector).
    *   Environment variables (DB\_USER, DB\_PASS, DB\_NAME, INSTANCE\_CONNECTION\_NAME) for connection details.
        
*   **Key Operations**:
    *   Creates a getconn function to retrieve a database connection asynchronously.
    *   Uses sqlalchemy.ext.asyncio.create\_async\_engine to initialize the connection pool with the asyncpg driver.

*   **Output**: Returns a connection pool (engine) to be used for creating sessions.    

### **2\. SQL Procedure Definition**

#### **create\_and\_run\_procedure(Session)**

*   **Purpose**: Defines and executes the SQL procedure create\_asset\_360.
    
*   **Input**: Session object for database operations.
    
*   **Key Operations**:
    
    1.  **Define Temporary Tables**:
        *   **temp\_basic\_info**: Combines asset data with current market value and calculates the market value for each asset.
        *   **temp\_performance**: Aggregates performance metrics like daily return and total return for the past year.
        *   **temp\_risk\_profile**: Computes risk indicators (volatility, beta, Sharpe ratio, etc.) for the last three months.
        *   **temp\_transaction\_summary**: Summarizes transactions (counts, purchases, sales) and calculates average transaction costs for the past year.
        *   **temp\_compliance**: Tracks compliance violations and the last compliance check within the last six months.
            
    2.  **Generate asset\_360 Table**:
        *   Merges data from all temporary tables into a consolidated view (asset\_360).
        *   Categorizes assets into risk, performance, and size groups based on computed metrics.
            
    3.  **Cleanup**:
        *   Drops temporary tables after the final table creation.
            
    4.  **Procedure Execution**:
        *   Executes the create\_asset\_360 procedure.
            
*   **Error Handling**:
    *   Rolls back the session and prints error messages if issues occur.
        
*   **Output**:
    *   Creates or replaces the asset\_360 table in the database.
        

### **3\. Script Execution Flow**

#### **main()**

*   **Purpose**: Orchestrates the overall execution.
    
*   **Key Operations**:
    
    1.  **Connection Establishment**:
        *   Initializes the connection pool and session maker using init\_connection\_pool.
            
    2.  **Procedure Execution**:
        *   Calls create\_and\_run\_procedure to define and execute the SQL procedure.
            
    3.  **Resource Cleanup**:
        *   Disposes of the connection pool and closes the Google Cloud SQL Connector.
            
*   **Error Handling**:
    *   Handles connection errors and ensures proper resource cleanup.
        

**Interaction Between Components**

1.  **Connection Handling**:
    *   The main function initializes the database connection (init\_connection\_pool) and provides the session (Session) to create\_and\_run\_procedure.
        
2.  **Data Flow**:
    *   Temporary tables created by the SQL procedure (temp\_basic\_info, temp\_performance, etc.) flow into the final asset\_360 table.
    *   Intermediate metrics and summaries feed into consolidated risk, performance, and compliance categorizations.
        
#### **Key Inputs and Outputs**

#### **Inputs**:

1.  **Environment Variables**:
    *   Database credentials (DB\_USER, DB\_PASS, DB\_NAME).
    *   Instance connection details (INSTANCE\_CONNECTION\_NAME).
        
2.  **Database Tables**:
    *   asset\_master, market\_data, portfolio\_allocation, performance\_history, risk\_metrics, transactions, compliance\_records.
        

#### **Outputs**:

1.  **asset\_360 Table**:
    *   Comprehensive asset details.
    *   Categorized risk and performance metrics.
    *   Transaction summaries and compliance statuses.
        

#### **Expected Outcomes**
*   A new or updated asset\_360 table is created in the PostgreSQL database.
*   The table provides actionable insights for asset management, risk assessment, and compliance tracking.
*   The system gracefully handles errors, ensuring no partial changes are committed.
    
#### **Summary**
This script automates a complex data aggregation process for assets, offering an efficient way to analyze asset performance, risk, and compliance. The combination of asynchronous operations and SQL procedure execution ensures scalability and robust handling of large datasets.

================================================================================

