const API_URL = import.meta.env.VITE_API_URL;

const getTransactionDetails = async (
  walletId: string,
  page: number = 1,
  limit: number = 10
) => {
  const skip = (page - 1) * limit;
  const response = await fetch(
    `${API_URL}/transaction/?walletId=${walletId}&skip=${skip}&limit=${limit}`
  );
  const result = await response.json();
  return result;
};

export default getTransactionDetails;
