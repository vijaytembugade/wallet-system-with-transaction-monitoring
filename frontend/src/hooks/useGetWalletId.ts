import useWallet from "./useWallet";

const useGetWalletId = () => {
  const { wallet } = useWallet();
  return (
    wallet?.walletId ??
    JSON.parse(localStorage?.getItem("walletDetails") || "{}")?.walletId
  );
};

export default useGetWalletId;
