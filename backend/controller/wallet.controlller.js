import WalletModel from "../models/wallet.model.js";
import mongoose from "mongoose";
import { TRANSACTION_TYPES } from "../constants/index.js";
import TransactionModel from "../models/transaction.model.js";

const setupWallet = async (req, res) => {
  const session = await mongoose.startSession();
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

    await session.withTransaction(async () => {
      const wallet = await WalletModel.create(
        [{ username, balance: parseFloat(balance.toFixed(4)) }],
        {
          session,
        }
      );

      if (!wallet || wallet.length === 0) {
        throw new Error("Failed to create wallet");
      }

      const transaction = await TransactionModel.create(
        [
          {
            walletId: wallet[0]?._id,
            amount: parseFloat(balance.toFixed(4)),
            type: TRANSACTION_TYPES.CREDIT,
            description: "Initial Wallet Setup",
            onRampBalance: balance,
          },
        ],
        {
          session,
        }
      );

      if (!transaction) {
        throw new Error("Failed to create wallet and transaction");
      }

      return res.status(200).json({
        data: wallet,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  } finally {
    await session.endSession();
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

const getWalletDetails = async (req, res) => {
  const { walletId } = req.params;
  const wallet = await WalletModel.findById(walletId);
  if (!wallet) {
    return res.status(404).json({
      message: "Wallet not found",
    });
  }
  return res.status(200).json({
    data: wallet,
  });
};

export { setupWallet, getAllWalletList, getWalletDetails };
