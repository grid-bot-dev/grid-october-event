import pytest
import asyncio
from unittest.mock import AsyncMock, patch, MagicMock
from backend_logic import (
    init_connection_pool,
    get_db_session,
    get_portfolio_overview,
    get_asset_allocation,
    get_risk_metrics,
    get_performance_dashboard,
    get_compliance_summary,
    get_transaction_analysis,
    get_sector_exposure,
    get_geographic_distribution
)

@pytest.fixture
def mock_engine_and_connector():
    """Fixture to mock database engine and connector."""
    mock_engine = MagicMock()
    mock_connector = AsyncMock()
    return mock_engine, mock_connector

@pytest.fixture
def mock_session():
    """Fixture to mock the database session."""
    mock_session = AsyncMock()
    return mock_session

@pytest.mark.asyncio
async def test_init_connection_pool():
    """Test connection pool initialization."""
    with patch("backend_logic.create_async_connector", new_callable=AsyncMock) as mock_connector:
        mock_connector.return_value.connect_async = AsyncMock()
        engine, connector = await init_connection_pool()
        assert engine is not None
        assert connector is not None

@pytest.mark.asyncio
async def test_get_db_session(mock_engine_and_connector):
    """Test getting a database session."""
    mock_engine, _ = mock_engine_and_connector
    session = await get_db_session(mock_engine)
    assert session is not None

@pytest.mark.asyncio
async def test_get_portfolio_overview(mock_engine_and_connector, mock_session):
    """Test portfolio overview data."""
    mock_engine, mock_connector = mock_engine_and_connector
    mock_session.execute = AsyncMock()
    mock_session.execute.side_effect = [
        AsyncMock(return_value=[[100]]),  # total_assets
        AsyncMock(return_value=[[500000]]),  # total_value
        AsyncMock(return_value=[[0.05]]),  # avg_return
        AsyncMock(return_value=[[("Low Risk", 50), ("High Risk", 30)]]),  # risk_distribution
    ]

    with patch("backend_logic.get_db_session", return_value=mock_session):
        result = await get_portfolio_overview()
        assert result["total_assets"] == 100
        assert result["total_value"] == 500000
        assert result["average_return"] == 5.0
        assert len(result["risk_distribution"]) == 2

@pytest.mark.asyncio
async def test_get_asset_allocation(mock_engine_and_connector, mock_session):
    """Test asset allocation data."""
    mock_engine, mock_connector = mock_engine_and_connector
    mock_session.execute = AsyncMock(return_value=[[("Stock", 300000, 100), ("Bond", 200000, 50)]])
    with patch("backend_logic.get_db_session", return_value=mock_session):
        with patch("backend_logic.px.pie", return_value=MagicMock(to_json=MagicMock(return_value="{}"))):
            result = await get_asset_allocation()
            assert isinstance(result, dict)

@pytest.mark.asyncio
async def test_get_risk_metrics(mock_engine_and_connector, mock_session):
    """Test risk metrics data."""
    mock_engine, mock_connector = mock_engine_and_connector
    mock_session.execute = AsyncMock(return_value=[[1, "Asset A", 0.2, 1.5, 2.0]])
    with patch("backend_logic.get_db_session", return_value=mock_session):
        result = await get_risk_metrics()
        assert len(result) == 1
        assert result[0]["asset_name"] == "Asset A"

@pytest.mark.asyncio
async def test_get_transaction_analysis(mock_engine_and_connector, mock_session):
    """Test transaction analysis data."""
    mock_engine, mock_connector = mock_engine_and_connector
    mock_session.execute = AsyncMock(return_value=[[("2023-01", 10000), ("2023-02", 15000)]])
    with patch("backend_logic.get_db_session", return_value=mock_session):
        with patch("backend_logic.px.line", return_value=MagicMock(to_json=MagicMock(return_value="{}"))):
            result = await get_transaction_analysis()
            assert isinstance(result, dict)

@pytest.mark.asyncio
async def test_get_sector_exposure(mock_engine_and_connector, mock_session):
    """Test sector exposure data."""
    mock_engine, mock_connector = mock_engine_and_connector
    mock_session.execute = AsyncMock(return_value=[[("Tech", 50), ("Health", 30)]])
    with patch("backend_logic.get_db_session", return_value=mock_session):
        with patch("backend_logic.px.pie", return_value=MagicMock(to_json=MagicMock(return_value="{}"))):
            result = await get_sector_exposure()
            assert isinstance(result, dict)

@pytest.mark.asyncio
async def test_get_geographic_distribution(mock_engine_and_connector, mock_session):
    """Test geographic distribution data."""
    mock_engine, mock_connector = mock_engine_and_connector
    mock_session.execute = AsyncMock(return_value=[[("US", 50), ("India", 30)]])
    with patch("backend_logic.get_db_session", return_value=mock_session):
        with patch("backend_logic.px.pie", return_value=MagicMock(to_json=MagicMock(return_value="{}"))):
            result = await get_geographic_distribution()
            assert isinstance(result, dict)
