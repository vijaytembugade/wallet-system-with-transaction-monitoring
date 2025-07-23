const API = import.meta.env.VITE_API_URL;

type optionTypes = {
  amount: number;
  type: "CREDIT" | "DEBIT";
  description?: string;
};

export const transactWallet = async (
  walletId: string,
  options: optionTypes
) => {
  try {
    if (!walletId) {
      const walletDetails = JSON.parse(
        localStorage?.getItem("walletDetails") || ""
      );
      walletId = walletDetails?.walletId;
    }

    const response = await fetch(`${API}/transact/${walletId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });
    const result = await response.json();
    return result?.data;
  } catch (error) {
    console.log(error);
  }
};
