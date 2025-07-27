import { setupWallet } from "@/apis/setupWallet";
import useWallet from "@/hooks/useWallet";
import { useState } from "react";
import { toast } from "sonner";

const useSetupWallet = () => {
  const [username, setUsername] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const { setWallet } = useWallet();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSetupWallet = async () => {
    try {
      if (!username || !balance) {
        toast.error("Please fill all the fields to setup your wallet");
        return;
      }
      setIsLoading(true);
      const data = await setupWallet(username, balance);

      if (data && data.length > 0) {
        const walletId = data?.[0]?._id;
        const username = data?.[0]?.username;
        const walletDetails = {
          walletId,
          username,
        };
        localStorage.setItem("walletDetails", JSON.stringify(walletDetails));
        setWallet({ ...walletDetails });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    username,
    balance,
    setUsername,
    setBalance,
    handleSetupWallet,
    isLoading,
  };
};

export default useSetupWallet;
