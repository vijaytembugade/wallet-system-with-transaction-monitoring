const createTransaction = async (req, res) => {
  const { walletId } = req.params;
  try {
    const { amount, type, description } = req.body;
    if (!walletId || !amount || !type) {
      throw new Error("Wallet ID, amount, and type are required");
    }

    console.log(walletId, amount, type, description);
  } catch (error) {
    console.log(error);
  }
};

export { createTransaction };
