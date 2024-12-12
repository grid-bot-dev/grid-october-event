Functional Tests Report for backend\_logic.py
=======================================

Test Case 1: test\_init\_connection\_pool
----------------------------------------------

*   **Description**: Tests the initialization of the database connection pool to ensure an engine and connector are created.
    
*   **Input**: Environment variables for database credentials.
    
*   **Expected Output**: A non-None engine and connector.
    
*   **Actual Output**: Engine and connector were created as expected.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: Connection pool initialized successfully.
    

Test Case 2: test\_get\_db\_session
----------------------------------------

*   **Description**: Verifies that a database session is created using the engine.
    
*   **Input**: Mocked database engine.
    
*   **Expected Output**: A valid database session object.
    
*   **Actual Output**: Session object created successfully.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: Session creation functioned correctly.
    

Test Case 3: test\_get\_portfolio\_overview
------------------------------------------------

*   **Description**: Tests the retrieval of portfolio overview metrics.
    
*   **Input**: Mocked database session with total assets, total value, average return, and risk distribution data.
    
*   **Expected Output**: A dictionary containing portfolio metrics such as total\_assets, total\_value, and risk\_distribution.
    
*   **Actual Output**: Dictionary returned with correct values.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: Portfolio overview generated as expected.
    

Test Case 4: test\_get\_asset\_allocation
----------------------------------------------

*   **Description**: Tests the generation of asset allocation chart data.
    
*   **Input**: Mocked session returning asset type and values.
    
*   **Expected Output**: A JSON representation of a pie chart.
    
*   **Actual Output**: JSON data returned successfully.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: Asset allocation pie chart data generated correctly.
    

Test Case 5: test\_get\_risk\_metrics
------------------------------------------

*   **Description**: Tests the retrieval of top assets by risk metrics.
    
*   **Input**: Mocked session returning asset risk data.
    
*   **Expected Output**: A list of asset risk details.
    
*   **Actual Output**: Correct list of risk metrics returned.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: Risk metrics fetched accurately.
    

Test Case 6: test\_get\_transaction\_analysis
--------------------------------------------------

*   **Description**: Tests the generation of transaction analysis chart data.
    
*   **Input**: Mocked session returning transaction volume data.
    
*   **Expected Output**: JSON representation of a line chart.
    
*   **Actual Output**: JSON data returned successfully.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: Transaction analysis chart data generated correctly.
    

Test Case 7: test\_get\_sector\_exposure
---------------------------------------------

*   **Description**: Tests the generation of sector exposure chart data.
    
*   **Input**: Mocked session returning sector data.
    
*   **Expected Output**: JSON representation of a pie chart.
    
*   **Actual Output**: JSON data returned successfully.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: Sector exposure data generated correctly.
    

Test Case 8: test\_get\_geographic\_distribution
-----------------------------------------------------

*   **Description**: Tests the generation of geographic distribution chart data.
    
*   **Input**: Mocked session returning geographic data.
    
*   **Expected Output**: JSON representation of a pie chart.
    
*   **Actual Output**: JSON data returned successfully.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: Geographic distribution data generated correctly.
    
====================================================================


Functional Tests Report for asset\_360\_procedure\_test.py
====================================================

Test Case 1: test\_init\_connection\_pool\_success
-------------------------------------------------------

*   **Description**: Verifies successful initialization of the connection pool with proper environment variables.
    
*   **Input**: Mock environment variables with valid values.
    
*   **Expected Output**: A valid engine object with drivername as postgresql+asyncpg.
    
*   **Actual Output**: Engine initialized successfully with the correct driver name.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: The connection pool was successfully initialized.
    

Test Case 2: test\_init\_connection\_pool\_missing\_env\_vars
------------------------------------------------------------------

*   **Description**: Ensures an error is raised when required environment variables are missing.
    
*   **Input**: Mock environment variables missing DB\_USER.
    
*   **Expected Output**: KeyError raised due to missing variable.
    
*   **Actual Output**: KeyError raised as expected.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: The function correctly handled missing environment variables.
    

Test Case 3: test\_create\_and\_run\_procedure\_success
------------------------------------------------------------

*   **Description**: Verifies successful creation and execution of the stored procedure.
    
*   **Input**: Mock SQL session and procedure SQL statement.
    
*   **Expected Output**: Procedure creation and execution with two commits.
    
*   **Actual Output**: Procedure created, executed, and committed twice as expected.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: The stored procedure was created and executed as expected.
    

Test Case 4: test\_create\_and\_run\_procedure\_failure
------------------------------------------------------------

*   **Description**: Verifies proper error handling during procedure execution failure.
    
*   **Input**: Mock SQL session with execute method raising an exception.
    
*   **Expected Output**: Exception raised with a rollback performed.
    
*   **Actual Output**: Exception raised, and rollback was performed as expected.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: The function correctly handled execution errors.
    

Test Case 5: test\_create\_and\_run\_procedure\_temp\_table\_cleanup
-------------------------------------------------------------------------

*   **Description**: Ensures temporary tables are cleaned up before procedure execution.
    
*   **Input**: Mock SQL session and cleanup SQL.
    
*   **Expected Output**: Cleanup SQL executed successfully.
    
*   **Actual Output**: Cleanup SQL executed as expected.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: Temporary tables were cleaned up as expected.
    

Test Case 6: test\_main\_success
-------------------------------------

*   **Description**: Verifies successful execution of the main function.
    
*   **Input**: Mocked connector, connection pool, and procedure creation function.
    
*   **Expected Output**: main function returns True, and resources are properly closed.
    
*   **Actual Output**: main returned True, and resources were disposed as expected.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: The function executed successfully with proper cleanup.
    

Test Case 7: test\_main\_connection\_failure
-------------------------------------------------

*   **Description**: Ensures the main function handles connection pool initialization errors gracefully.
    
*   **Input**: Mocked connector with init\_connection\_pool raising an exception.
    
*   **Expected Output**: main function returns False.
    
*   **Actual Output**: main returned False as expected.
    
*   **Status**: Passed
    
*   **Error**: None
    
*   **Reason**: The function handled connection initialization failures correctly.


Overall Report
==============

*   **Total Test Cases**: 15
    
*   **Passed Test Cases**: 15
    
*   **Failed Test Cases**: 0
    
*   **Test Pass Rate**: **100%**