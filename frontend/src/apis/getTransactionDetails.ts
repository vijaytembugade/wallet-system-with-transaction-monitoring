const API_URL = import.meta.env.VITE_API_URL;

const getTransactionDetails = async (
  walletId: string,
  page: number = 1,
  limit: number = 10,
  sortModel: any = { createdAt: -1 }
) => {
  const skip = (page - 1) * limit;
  console.log(sortModel, "sortModel");
  const response = await fetch(
    `${API_URL}/transaction/?walletId=${walletId}&skip=${skip}&limit=${limit}&sortBy=${sortModel}`
  );
  const result = await response.json();
  return result;
};

export default getTransactionDetails;
