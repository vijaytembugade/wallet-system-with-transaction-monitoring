const API_URL = import.meta.env.VITE_API_URL;
const getTransactionDetails = async (walletId, page = 1, limit = 10, sortModel = { createdAt: -1 }) => {
    const skip = (page - 1) * limit;
    console.log(sortModel, "sortModel");
    const response = await fetch(`${API_URL}/transaction/?walletId=${walletId}&skip=${skip}&limit=${limit}&sortBy=${sortModel}`);
    const result = await response.json();
    return result;
};
export default getTransactionDetails;
