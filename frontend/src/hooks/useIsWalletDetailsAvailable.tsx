import useWallet from "./useWallet";

const useIsWalletDetailsAvailable = () => {
  const { wallet } = useWallet();

  return wallet !== null;
};

export default useIsWalletDetailsAvailable;
