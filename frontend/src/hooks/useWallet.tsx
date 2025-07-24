import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { fetchBalance } from "./useUpdateWalletBalence";

const WalletContext = createContext<WalletContextType | null>(null);

type Wallet = {
  walletId: string;
  username: string;
};

type WalletContextType = {
  wallet: Wallet | null;
  setWallet: (wallet: Wallet) => void;
  balance: number;
  setBalance: (balance: number) => void;
};

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState<number>(0);

  useLayoutEffect(() => {
    const walletDetails = localStorage?.getItem("walletDetails");
    if (!walletDetails) {
      return;
    }

    const walletDetailsObject = JSON.parse(walletDetails);
    if (!walletDetailsObject) {
      return;
    }

    if (
      Object.hasOwn(walletDetailsObject, "walletId") &&
      Object.hasOwn(walletDetailsObject, "username")
    ) {
      setWallet(walletDetailsObject);
    }
  }, []);

  useEffect(() => {
    if (wallet?.walletId) {
      (async () => {
        const balance = await fetchBalance(wallet.walletId);
        if (balance) {
          setBalance(balance);
        }
      })();
    }
  }, [wallet?.walletId]);

  return (
    <WalletContext.Provider value={{ wallet, setWallet, balance, setBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

export default function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

export { WalletProvider };
