import { transactWallet } from "@/apis/transactWallet";
import useGetWalletId from "./useGetWalletId";
import { useState } from "react";
import useUpdateWalletBalence from "./useUpdateWalletBalence";
import { toast } from "sonner";

const useHandleTransact = () => {
  const [amount, setAmount] = useState<number | null>(null);
  const [type, setType] = useState<"CREDIT" | "DEBIT">("CREDIT");
  const [description, setDescription] = useState<string>("");
  const { updateBalence } = useUpdateWalletBalence();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const walletId = useGetWalletId();

  const handleTransact = async () => {
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }
    if (!walletId) {
      toast.error("Please setup your wallet first");
      return;
    }
    try {
      setIsLoading(true);
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
        await updateBalence();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setAmount(null);
      setDescription("");
    }
  };

  return {
    amount,
    type,
    setAmount,
    setType,
    handleTransact,
    description,
    setDescription,
    isLoading,
  };
};

export default useHandleTransact;
