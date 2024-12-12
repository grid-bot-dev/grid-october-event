import pytest
import asyncio
from unittest.mock import AsyncMock, patch, MagicMock
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import text
from asset_360_procedure import (
    init_connection_pool,
    create_and_run_procedure,
    main,
)

# Mock environment variables
MOCK_ENV = {
    "INSTANCE_CONNECTION_NAME": "mock-instance",
    "DB_USER": "mock_user",
    "DB_PASS": "mock_pass",
    "DB_NAME": "mock_db",
}

@pytest.mark.asyncio
class TestAsset360Procedure:
    # Test `init_connection_pool`

    async def test_init_connection_pool_success(self):
        mock_connector = AsyncMock()
        with patch.dict("os.environ", MOCK_ENV):
            engine = await init_connection_pool(mock_connector)

        assert engine is not None
        assert engine.url.drivername == "postgresql+asyncpg"

    async def test_init_connection_pool_missing_env_vars(self):
        mock_connector = AsyncMock()
        incomplete_env = MOCK_ENV.copy()
        del incomplete_env["DB_USER"]  # Simulate missing variable

        with patch.dict("os.environ", incomplete_env), pytest.raises(KeyError):
            await init_connection_pool(mock_connector)

    # Test `create_and_run_procedure`

    async def test_create_and_run_procedure_success(self):
        mock_session = AsyncMock(spec=AsyncSession)
        procedure_sql = "CREATE OR REPLACE PROCEDURE create_asset_360()"

        await create_and_run_procedure(mock_session)

        mock_session.execute.assert_any_call(text(procedure_sql))
        mock_session.execute.assert_any_call(text("CALL create_asset_360()"))
        assert mock_session.commit.call_count == 2  # Commit after creation and execution

    async def test_create_and_run_procedure_failure(self):
        mock_session = AsyncMock(spec=AsyncSession)
        mock_session.execute.side_effect = Exception("Test error")

        with pytest.raises(Exception, match="Test error"):
            await create_and_run_procedure(mock_session)

        mock_session.rollback.assert_called_once()

    async def test_create_and_run_procedure_temp_table_cleanup(self):
        mock_session = AsyncMock(spec=AsyncSession)
        cleanup_sql = (
            "DROP TABLE IF EXISTS temp_basic_info, temp_performance, "
            "temp_risk_profile, temp_transaction_summary, temp_compliance"
        )

        await create_and_run_procedure(mock_session)

        mock_session.execute.assert_any_call(text(cleanup_sql))

    # Test `main`

    async def test_main_success(self):
        with patch("asset_360_procedure.create_async_connector", AsyncMock()) as mock_connector, \
             patch("asset_360_procedure.init_connection_pool", AsyncMock()) as mock_pool, \
             patch("asset_360_procedure.create_and_run_procedure", AsyncMock()) as mock_create_procedure:
            
            result = await main()

        assert result is True
        mock_create_procedure.assert_called_once()
        mock_pool.return_value.dispose.assert_awaited_once()
        mock_connector.return_value.close_async.assert_awaited_once()

    async def test_main_connection_failure(self):
        with patch("asset_360_procedure.create_async_connector", AsyncMock()), \
             patch("asset_360_procedure.init_connection_pool", AsyncMock(side_effect=Exception("Connection error"))), \
             patch("asset_360_procedure.create_and_run_procedure", AsyncMock()):
            
            result = await main()

        assert result is False
