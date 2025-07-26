import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useLayoutEffect, useState, } from "react";
import { fetchBalance } from "./useUpdateWalletBalence";
const WalletContext = createContext(null);
const WalletProvider = ({ children }) => {
    const [wallet, setWallet] = useState(null);
    const [balance, setBalance] = useState(0);
    useLayoutEffect(() => {
        const walletDetails = localStorage?.getItem("walletDetails");
        if (!walletDetails) {
            return;
        }
        const walletDetailsObject = JSON.parse(walletDetails);
        if (!walletDetailsObject) {
            return;
        }
        if (Object.hasOwn(walletDetailsObject, "walletId") &&
            Object.hasOwn(walletDetailsObject, "username")) {
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
    return (_jsx(WalletContext.Provider, { value: { wallet, setWallet, balance, setBalance }, children: children }));
};
export default function useWallet() {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider");
    }
    return context;
}
export { WalletProvider };
