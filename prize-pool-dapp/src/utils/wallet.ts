import {
  isConnected,
  requestAccess,
  getPublicKey,
} from '@stellar/freighter-api';

export const checkWalletConnection = async (): Promise<boolean> => {
  try {
    const result = await isConnected();
    return result.isConnected;
  } catch (e) {
    console.error('Error checking wallet connection:', e);
    return false;
  }
};

export const connectWallet = async (): Promise<string | null> => {
  try {
    const access = await requestAccess();
    if (access) {
      const publicKey = await getPublicKey();
      if (publicKey) {
        localStorage.setItem('walletPublicKey', publicKey);
        return publicKey;
      }
    }
    return null;
  } catch (e) {
    console.error('Error connecting wallet:', e);
    return null;
  }
};

export const disconnectWallet = (): void => {
  localStorage.removeItem('walletPublicKey');
};

export const getStoredPublicKey = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('walletPublicKey');
};
