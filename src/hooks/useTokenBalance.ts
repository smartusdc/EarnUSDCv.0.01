// hooks/useTokenBalance.ts
export function useTokenBalance() {
  const [balance, setBalance] = useState('0');

  const getBalance = async (address: string) => {
    try {
      // balanceOf�֐��̃V�O�l�`��: 0x70a08231
      const data = `0x70a08231000000000000000000000000${address.slice(2)}`;
      
      const result = await window.ethereum.request({
        method: 'eth_call',
        params: [{
          to: CONTRACTS.USDC,
          data: data
        }, 'latest']
      });
      
      // 6�f�V�}�����l�������ϊ�
      return BigInt(result) / BigInt(10 ** USDC_DECIMALS);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      return BigInt(0);
    }
  };

  return { balance, getBalance };
}