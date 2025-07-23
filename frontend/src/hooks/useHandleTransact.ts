import { transactWallet } from "@/apis/transactWallet";
import useGetWalletId from "./useGetWalletId";
import { useState } from "react";

const useHandleTransact = () => {
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<"CREDIT" | "DEBIT">("CREDIT");
  const [description, setDescription] = useState<string>("");

  const walletId = useGetWalletId();

  const handleTransact = async () => {
    const result = await transactWallet(walletId, {
      amount,
      type,
      description,
    });
    const data = result?.data?.[0];
    console.log(data);
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
