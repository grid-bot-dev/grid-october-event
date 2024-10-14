# CDP Schema Creation Process

## Step 1: Analyze Source Tables

Based on the provided DDL scripts, we have the following source tables:
1. customer_info
2. product_catalog
3. purchase_transactions
4. customer_service
5. marketing_campaigns
6. campaign_responses
7. website_behavior

## Step 2: Create Temporary Tables

We'll create several temporary tables to aggregate and transform data from the source tables:

### a. temp_customer_basic
Purpose: Store basic customer information
```sql
CREATE TEMPORARY TABLE temp_customer_basic AS
SELECT 
    customer_id,
    first_name,
    last_name,
    email,
    phone_number,
    date_of_birth,
    registration_date
FROM customer_info;
```

### b. temp_purchase_stats
Purpose: Calculate purchase-related statistics
```sql
CREATE TEMPORARY TABLE temp_purchase_stats AS
SELECT 
    customer_id,
    COUNT(DISTINCT transaction_id) AS total_purchases,
    SUM(total_amount) AS total_spend,
    AVG(total_amount) AS avg_purchase_value,
    MAX(purchase_date) AS last_purchase_date,
    MIN(purchase_date) AS first_purchase_date
FROM purchase_transactions
GROUP BY customer_id;
```

### c. temp_product_preferences
Purpose: Determine favorite product category and brand
```sql
CREATE TEMPORARY TABLE temp_product_preferences AS
SELECT 
    pt.customer_id,
    pc.category AS favorite_category,
    pc.brand AS favorite_brand
FROM purchase_transactions pt
JOIN product_catalog pc ON pt.product_id = pc.product_id
GROUP BY pt.customer_id
ORDER BY COUNT(*) DESC
LIMIT 1;
```

### d. temp_customer_service_stats
Purpose: Aggregate customer service interactions
```sql
CREATE TEMPORARY TABLE temp_customer_service_stats AS
SELECT 
    customer_id,
    COUNT(*) AS total_interactions,
    AVG(satisfaction_score) AS avg_satisfaction_score,
    SUM(CASE WHEN resolution_status = 'Resolved' THEN 1 ELSE 0 END) AS resolved_interactions
FROM customer_service
GROUP BY customer_id;
```

### e. temp_campaign_engagement
Purpose: Summarize campaign responses
```sql
CREATE TEMPORARY TABLE temp_campaign_engagement AS
SELECT 
    cr.customer_id,
    COUNT(DISTINCT cr.campaign_id) AS campaigns_engaged,
    SUM(CASE WHEN cr.response_type = 'Positive' THEN 1 ELSE 0 END) AS positive_responses
FROM campaign_responses cr
JOIN marketing_campaigns mc ON cr.campaign_id = mc.campaign_id
GROUP BY cr.customer_id;
```

### f. temp_website_behavior
Purpose: Aggregate website behavior data
```sql
CREATE TEMPORARY TABLE temp_website_behavior AS
SELECT 
    customer_id,
    COUNT(*) AS total_visits,
    AVG(pages_viewed) AS avg_pages_per_visit,
    AVG(time_spent) AS avg_time_spent,
    MAX(visit_date) AS last_visit_date
FROM website_behavior
GROUP BY customer_id;
```

## Step 3: Create the Customer 360 Table

Now, we'll join all the temporary tables to create the final customer_360 table:

```sql
CREATE TABLE customer_360 AS
SELECT 
    tcb.*,
    tps.total_purchases,
    tps.total_spend,
    tps.avg_purchase_value,
    tps.last_purchase_date,
    tps.first_purchase_date,
    tpp.favorite_category,
    tpp.favorite_brand,
    tcss.total_interactions,
    tcss.avg_satisfaction_score,
    tcss.resolved_interactions,
    tce.campaigns_engaged,
    tce.positive_responses,
    twb.total_visits,
    twb.avg_pages_per_visit,
    twb.avg_time_spent,
    twb.last_visit_date,
    -- Derived fields
    DATEDIFF(CURRENT_DATE, tps.last_purchase_date) AS days_since_last_purchase,
    DATEDIFF(CURRENT_DATE, twb.last_visit_date) AS days_since_last_visit,
    (tps.total_spend / NULLIF(tps.total_purchases, 0)) AS customer_lifetime_value,
    (tcss.resolved_interactions / NULLIF(tcss.total_interactions, 0)) AS service_resolution_rate,
    (tce.positive_responses / NULLIF(tce.campaigns_engaged, 0)) AS campaign_response_rate,
    CASE 
        WHEN tps.total_spend > 1000 AND tps.total_purchases > 10 THEN 'High Value'
        WHEN tps.total_spend > 500 OR tps.total_purchases > 5 THEN 'Medium Value'
        ELSE 'Low Value'
    END AS customer_segment,
    CASE 
        WHEN DATEDIFF(CURRENT_DATE, tps.last_purchase_date) > 365 THEN 'High'
        WHEN DATEDIFF(CURRENT_DATE, tps.last_purchase_date) > 180 THEN 'Medium'
        ELSE 'Low'
    END AS churn_risk
FROM temp_customer_basic tcb
LEFT JOIN temp_purchase_stats tps ON tcb.customer_id = tps.customer_id
LEFT JOIN temp_product_preferences tpp ON tcb.customer_id = tpp.customer_id
LEFT JOIN temp_customer_service_stats tcss ON tcb.customer_id = tcss.customer_id
LEFT JOIN temp_campaign_engagement tce ON tcb.customer_id = tce.customer_id
LEFT JOIN temp_website_behavior twb ON tcb.customer_id = twb.customer_id;
```

## Step 4: Explanations for Derived Fields

1. days_since_last_purchase: Calculates the number of days since the customer's last purchase.
2. days_since_last_visit: Calculates the number of days since the customer's last website visit.
3. customer_lifetime_value: Calculates the average value of a customer over their entire relationship with the company.
4. service_resolution_rate: Calculates the percentage of customer service interactions that were resolved.
5. campaign_response_rate: Calculates the percentage of marketing campaigns that received a positive response from the customer.
6. customer_segment: Categorizes customers into High, Medium, or Low value segments based on their total spend and number of purchases.
7. churn_risk: Assesses the risk of customer churn based on the time since their last purchase.

## Final Customer 360 Table Schema

```json
{
  "customer_360": {
    "customer_id": "INTEGER",
    "first_name": "TEXT",
    "last_name": "TEXT",
    "email": "TEXT",
    "phone_number": "TEXT",
    "date_of_birth": "DATE",
    "registration_date": "DATE",
    "total_purchases": "INTEGER",
    "total_spend": "REAL",
    "avg_purchase_value": "REAL",
    "last_purchase_date": "DATE",
    "first_purchase_date": "DATE",
    "favorite_category": "TEXT",
    "favorite_brand": "TEXT",
    "total_interactions": "INTEGER",
    "avg_satisfaction_score": "REAL",
    "resolved_interactions": "INTEGER",
    "campaigns_engaged": "INTEGER",
    "positive_responses": "INTEGER",
    "total_visits": "INTEGER",
    "avg_pages_per_visit": "REAL",
    "avg_time_spent": "INTEGER",
    "last_visit_date": "DATE",
    "days_since_last_purchase": "INTEGER",
    "days_since_last_visit": "INTEGER",
    "customer_lifetime_value": "REAL",
    "service_resolution_rate": "REAL",
    "campaign_response_rate": "REAL",
    "customer_segment": "TEXT",
    "churn_risk": "TEXT"
  }
}
```

This comprehensive CDP schema combines information from all source tables, includes derived fields for customer analysis and segmentation, and captures customer behavior, preferences, and interactions. The schema is presented as a single customer_360 table in JSON format, using appropriate data types for each field.