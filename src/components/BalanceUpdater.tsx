// components/BalanceUpdater.tsx
function BalanceUpdater() {
  const { getBalance } = useTokenBalance();

  useEffect(() => {
    const updateBalance = async () => {
      const accounts = await window.ethereum.request({ 
        method: 'eth_accounts' 
      });
      if (accounts[0]) {
        await getBalance(accounts[0]);
      }
    };

    // ‰‰ñŽÀs
    updateBalance();
    
    // 30•b‚²‚Æ‚ÉXV
    const interval = setInterval(updateBalance, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return null;
}