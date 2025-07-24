const API_URL = import.meta.env.VITE_API_URL;

const getWalletDetailsById = async (walletId: string) => {
  if (!walletId) {
    throw new Error("Wallet ID is required");
  }
  try {
    const response = await fetch(`${API_URL}/wallet/${walletId}`);
    const result = await response.json();
    return result?.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getWalletDetailsById;
