import { createContext, useContext, useLayoutEffect, useState } from "react";

const WalletContext = createContext<WalletContextType | null>(null);

type Wallet = {
  walletId: string;
  username: string;
};

type WalletContextType = {
  wallet: Wallet | null;
  setWallet: (wallet: Wallet) => void;
};

const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState<Wallet | null>(null);

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

  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
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
