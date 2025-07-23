import { setupWallet } from "@/apis/setupWallet";
import useWallet from "@/hooks/useWallet";
import { useState } from "react";

const useSetupWallet = () => {
  const [username, setUsername] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const { setWallet } = useWallet();

  const handleSetupWallet = async () => {
    try {
      const data = await setupWallet(username, balance);

      if (data && data.length > 0) {
        const walletId = data?.[0]?._id;
        const username = data?.[0]?.username;
        const walletDetails = {
          walletId,
          username,
        };
        localStorage.setItem("walletDetails", JSON.stringify(walletDetails));
        setWallet(walletDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { username, balance, setUsername, setBalance, handleSetupWallet };
};

export default useSetupWallet;
