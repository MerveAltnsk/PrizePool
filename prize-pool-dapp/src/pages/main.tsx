import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkWalletConnection, disconnectWallet, getStoredPublicKey } from '../utils/wallet';
import { contribute, getTotalPool, setWinner, distributePrize, getContestStatus } from '../utils/stellar';
import type { ContestState } from '../types/wallet';

export default function MainPage() {
  const router = useRouter();
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [contribution, setContribution] = useState('');
  const [winnerAddress, setWinnerAddress] = useState('');
  const [isAdmin] = useState(true); // TODO: Replace with actual admin check
  const [contestState, setContestState] = useState<ContestState>({
    totalPool: 0,
    status: 'active',
    winnerAddress: null
  });
  useEffect(() => {
    const initializeWallet = async () => {
      const isConnected = await checkWalletConnection();
      if (!isConnected) {
        router.push('/');
        return;
      }
      const storedKey = getStoredPublicKey();
      setPublicKey(storedKey);
    };

    const loadContestState = async () => {
      try {
        const [total, status] = await Promise.all([
          getTotalPool(),
          getContestStatus(),
        ]);
        setContestState(prev => ({ ...prev, totalPool: total, status }));
      } catch (error) {
        console.error('Error loading contest state:', error);
      }
    };

    initializeWallet();
    loadContestState();
  }, [router]);

  const handleDisconnect = () => {
    disconnectWallet();
    router.push('/');
  };
  const handleContribute = async () => {
    try {
      if (!publicKey || !contribution) return;
      await contribute(Number(contribution), publicKey);
      const newTotal = await getTotalPool();
      setContestState(prev => ({ ...prev, totalPool: newTotal }));
    } catch (error) {
      console.error('Error contributing:', error);
    }
  };

  const handleSetWinner = async () => {
    try {
      if (!publicKey || !winnerAddress) return;
      await setWinner(winnerAddress, publicKey);
      const status = await getContestStatus();
      setContestState(prev => ({ ...prev, status, winnerAddress }));
    } catch (error) {
      console.error('Error setting winner:', error);
    }
  };

  const handleDistributePrize = async () => {
    try {
      if (!publicKey) return;
      await distributePrize(publicKey);
      const newTotal = await getTotalPool();
      setContestState(prev => ({ ...prev, totalPool: newTotal }));
    } catch (error) {
      console.error('Error distributing prize:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Prize Pool</h1>
            <button
              onClick={handleDisconnect}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Disconnect
            </button>
          </div>

          <div className="mb-6">
            <p className="text-gray-600">Connected Address:</p>
            <p className="font-mono">{publicKey}</p>
          </div>

          <div className="mb-6">
            <p className="text-lg font-semibold">Total Pool: {contestState.totalPool} XLM</p>
            <p className="text-lg">Status: {contestState.status}</p>
          </div>

          {contestState.status === 'active' && (
            <div className="mb-6">
              <input
                type="number"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                placeholder="Enter XLM amount"
                className="w-full p-2 border rounded mb-2"
              />
              <button
                onClick={handleContribute}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Contribute to Prize Pool
              </button>
            </div>
          )}

          {isAdmin && (
            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-4">Admin Controls</h2>
              <input
                type="text"
                value={winnerAddress}
                onChange={(e) => setWinnerAddress(e.target.value)}
                placeholder="Winner's Stellar Address"
                className="w-full p-2 border rounded mb-2"
              />
              <button
                onClick={handleSetWinner}
                className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-2"
              >
                Set Winner
              </button>
              {contestState.status === 'ended' && (
                <button
                  onClick={handleDistributePrize}
                  className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
                >
                  Distribute Prize
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
