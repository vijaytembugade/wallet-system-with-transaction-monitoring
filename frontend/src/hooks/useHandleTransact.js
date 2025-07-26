import { transactWallet } from "@/apis/transactWallet";
import useGetWalletId from "./useGetWalletId";
import { useState } from "react";
import useUpdateWalletBalence from "./useUpdateWalletBalence";
const useHandleTransact = () => {
    const [amount, setAmount] = useState(null);
    const [type, setType] = useState("CREDIT");
    const [description, setDescription] = useState("");
    const { updateBalence } = useUpdateWalletBalence();
    const walletId = useGetWalletId();
    const handleTransact = async () => {
        const result = await transactWallet(walletId, {
            amount: amount
                ? type === "DEBIT"
                    ? -parseFloat(amount.toFixed(4))
                    : parseFloat(amount.toFixed(4))
                : 0,
            type,
            description,
        });
        if (result) {
            updateBalence();
        }
        setAmount(null);
        setDescription("");
    };
    return {
        amount,
        type,
        setAmount,
        setType,
        handleTransact,
        description,
        setDescription,
    };
};
export default useHandleTransact;
