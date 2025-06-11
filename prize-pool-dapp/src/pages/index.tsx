import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { checkWalletConnection, connectWallet } from '../utils/wallet';

export default function ConnectPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkWalletConnection();
      if (isConnected) {
        router.push('/main');
      }
    };
    checkConnection();
  }, [router]);

  const handleConnect = async () => {
    setIsLoading(true);
    const publicKey = await connectWallet();
    if (publicKey) {
      router.push('/main');
    }
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Prize Pool dApp</h1>
        <button
          onClick={handleConnect}
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Connecting...' : 'Connect Freighter Wallet'}
        </button>
      </div>
    </main>
  );
}
