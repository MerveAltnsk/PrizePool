import Server from 'stellar-sdk';
import { signTransaction } from '@stellar/freighter-api';

const server = new Server('https://horizon-testnet.stellar.org');
const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID;

if (!contractId) {
  throw new Error('Contract ID not found in environment variables');
}

export async function contribute(amount: number, publicKey: string) {
  try {
    // TODO: Implement contract call for contribute function
    // This will be implemented once we have the contract deployed
    const transaction = await server.loadAccount(publicKey);
    // Build transaction using SorobanClient
    
    const signedXDR = await signTransaction(transaction.toXDR(), {
      networkPassphrase: 'Test SDF Network ; September 2015',
      address: publicKey,
    });

    return await server.submitTransaction(signedXDR);
  } catch (error) {
    console.error('Error contributing to pool:', error);
    throw error;
  }
}

export async function getTotalPool(): Promise<number> {
  try {
    // TODO: Implement contract call for get_total_pool function
    return 0;
  } catch (error) {
    console.error('Error getting total pool:', error);
    throw error;
  }
}

export async function setWinner(winnerAddress: string, adminKey: string) {
  try {
    // TODO: Implement contract call for set_winner function
    const transaction = await server.loadAccount(adminKey);
    // Build transaction using SorobanClient
    
    const signedXDR = await signTransaction(transaction.toXDR(), {
      networkPassphrase: 'Test SDF Network ; September 2015',
      address: adminKey,
    });

    return await server.submitTransaction(signedXDR);
  } catch (error) {
    console.error('Error setting winner:', error);
    throw error;
  }
}

export async function distributePrize(adminKey: string) {
  try {
    // TODO: Implement contract call for distribute_prize function
    const transaction = await server.loadAccount(adminKey);
    // Build transaction using SorobanClient
    
    const signedXDR = await signTransaction(transaction.toXDR(), {
      networkPassphrase: 'Test SDF Network ; September 2015',
      address: adminKey,
    });

    return await server.submitTransaction(signedXDR);
  } catch (error) {
    console.error('Error distributing prize:', error);
    throw error;
  }
}

export async function getContestStatus(): Promise<'active' | 'ended'> {
  try {
    // TODO: Implement contract call for get_contest_status function
    return 'active';
  } catch (error) {
    console.error('Error getting contest status:', error);
    throw error;
  }
}
