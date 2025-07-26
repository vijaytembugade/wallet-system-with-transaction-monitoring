import getWalletDetailsById from "@/apis/getWalletDetailsById";
import useWallet from "./useWallet";
import { useCallback } from "react";
export const fetchBalance = async (walletId) => {
    if (!walletId) {
        return;
    }
    try {
        const { balance } = await getWalletDetailsById(walletId);
        return balance;
    }
    catch (error) {
        console.error(error);
        return null;
    }
};
const useUpdateWalletBalence = () => {
    const { wallet, setBalance } = useWallet();
    const updateBalence = useCallback(async () => {
        if (!wallet?.walletId) {
            return;
        }
        const balance = await fetchBalance(wallet.walletId);
        setBalance(balance);
    }, [wallet?.walletId, setBalance]);
    return { updateBalence };
};
export default useUpdateWalletBalence;
