// components/MainCard.tsx
interface MainCardProps {
  balance: string;
  isLoading?: boolean;
}

export function MainCard({ balance, isLoading = false }: MainCardProps) {
  const dollarValue = Number(balance).toFixed(2);

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-2xl p-8 pb-20">
      <div className="space-y-1">
        <div className="text-zinc-400 font-medium">Total Balance</div>
        {isLoading ? (
          <div className="h-8 w-32 animate-pulse bg-zinc-700 rounded" />
        ) : (
          <>
            <div className="text-4xl font-bold text-white">{balance} USDC</div>
            <div className="text-zinc-400">≈ ${dollarValue}</div>
          </>
        )}
      </div>
      
      <div className="mt-6 flex gap-4">
        <Button variant="default">Deposit</Button>
        <Button variant="outline">Withdraw</Button>
      </div>
    </div>
  );
}