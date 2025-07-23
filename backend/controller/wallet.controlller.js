import WalletModel from "../models/wallet.model.js";

const setupWallet = async (req, res) => {
  try {
    const { username, balance } = req.body;

    if (!username) {
      throw new Error("Username is required");
    }

    if (!balance) {
      throw new Error("Balance is required");
    }

    if (balance < 0) {
      throw new Error("Balance must be greater than 0");
    }

    const wallet = await WalletModel.create({ username, balance });
    if (!wallet) {
      throw new Error("Failed to create wallet");
    }
    return res.status(200).json({
      data: wallet,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const getAllWalletList = async (req, res) => {
  try {
    const wallets = await WalletModel.find();
    return res.status(200).json({
      data: wallets,
    });
  } catch (error) {
    console.log(error);
  }
};
export { setupWallet, getAllWalletList };
