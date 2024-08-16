import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Loader2 } from 'lucide-react'; // For a loading spinner
import { useToast } from './ui/use-toast';

interface PointsTransaction {
  id: number;
  description: string;
  points: number;
  date: string;
}

const ViewPoints: React.FC = () => {
  const [pointsBalance, setPointsBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<PointsTransaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPointsData = async () => {
      try {
        // Fetch points balance and transactions for the general user
        const balanceResponse = await fetch('/api/points/balance');
        if (!balanceResponse.ok) throw new Error('Failed to fetch points balance');
        const balanceData = await balanceResponse.json();
        setPointsBalance(balanceData.balance);

        const transactionsResponse = await fetch('/api/points/transactions');
        if (!transactionsResponse.ok) throw new Error('Failed to fetch transactions');
        const transactionsData = await transactionsResponse.json();
        setTransactions(transactionsData);

      } catch (error) {
        toast({ title: 'Error', description: 'Failed to load points data.', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPointsData();
  }, [toast]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Points Balance</h2>
        <div className="text-2xl font-bold text-blue-900">
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : pointsBalance !== null ? (
            `${pointsBalance} Points`
          ) : (
            'N/A'
          )}
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">Transaction History</h2>
        <ul className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <li key={transaction.id} className="p-4 border border-gray-200 rounded-lg">
                <p className="text-gray-700">{transaction.description}</p>
                <p className="text-blue-700">
                  {transaction.points > 0 ? `+${transaction.points}` : `${transaction.points}`} Points
                </p>
                <p className="text-gray-500 text-sm">{new Date(transaction.date).toLocaleDateString()}</p>
              </li>
            ))
          ) : (
            <p className="text-gray-700">No transactions found.</p>
          )}
        </ul>
      </Card>
    </div>
  );
};

export default ViewPoints;
