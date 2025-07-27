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
  walletLoading: boolean;
};

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [walletLoading, setWalletLoading] = useState<boolean>(false);

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
      try {
        (async () => {
          setWalletLoading(true);
          const balance = await fetchBalance(wallet.walletId);
          if (balance) {
            setBalance(balance);
          }
        })();
      } catch (error) {
        console.log(error);
      } finally {
        setWalletLoading(false);
      }
    }
  }, [wallet?.walletId]);

  return (
    <WalletContext.Provider
      value={{ wallet, setWallet, balance, setBalance, walletLoading }}
    >
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
