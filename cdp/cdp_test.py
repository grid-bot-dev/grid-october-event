import pytest

from colorama import Fore, Style
from cdp_procedure import main

@pytest.mark.asyncio
async def test_cdp_main():
    result = None
    # Test the API response
    result = await main()
    
    if result:
        print(f"{Fore.GREEN}{Style.BRIGHT}[+] Cdp procedure API is working....{Style.RESET_ALL}")
    else:
        print(f"{Fore.RED}{Style.BRIGHT}[-] Unable to get API response{Style.RESET_ALL}")
