export interface WalletState {
  isConnected: boolean;
  publicKey: string | null;
}

export interface ContestState {
  totalPool: number;
  status: 'active' | 'ended';
  winnerAddress: string | null;
}
