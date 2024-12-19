import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const WalletConnector = () => {
  const [account, setAccount] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [chainId, setChainId] = useState('');
  
  const BASE_CHAIN_ID = '0x2105'; // Base Mainnet

  useEffect(() => {
    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAccount('');
      setError('Please connect your wallet');
    } else {
      setAccount(accounts[0]);
      setError('');
    }
  };

  const handleChainChanged = (chainId) => {
    setChainId(chainId);
    if (chainId !== BASE_CHAIN_ID) {
      setError('Please switch to Base network');
    } else {
      setError('');
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('MetaMask is not installed');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      // Request account access
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      // Get current chain
      const chainId = await window.ethereum.request({ 
        method: 'eth_chainId' 
      });
      
      setChainId(chainId);
      
      // Check if we're on Base
      if (chainId !== BASE_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BASE_CHAIN_ID }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            setError('Please add Base network to MetaMask');
          } else {
            setError('Failed to switch network');
          }
          return;
        }
      }

      setAccount(accounts[0]);
    } catch (err) {
      setError('Failed to connect wallet');
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {!account ? (
        <Button 
          onClick={connectWallet} 
          disabled={isConnecting}
          className="w-full"
        >
          {isConnecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            'Connect Wallet'
          )}
        </Button>
      ) : (
        <div className="bg-zinc-100 p-4 rounded-lg">
          <div className="text-sm text-zinc-500">Connected Account</div>
          <div className="font-mono text-sm truncate">
            {account}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnector;