import { transactWallet } from "@/apis/transactWallet";
import useGetWalletId from "./useGetWalletId";
import { useState } from "react";
import useUpdateWalletBalence from "./useUpdateWalletBalence";

const useHandleTransact = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [type, setType] = useState<"CREDIT" | "DEBIT">("CREDIT");
  const [description, setDescription] = useState<string>("");
  const { updateBalence } = useUpdateWalletBalence();

  const walletId = useGetWalletId();

  const handleTransact = async () => {
    const result = await transactWallet(walletId, {
      amount,
      type,
      description,
    });
    console.log(result[0]);
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
