import mongoose from "mongoose";
import WalletModel from "../models/wallet.model.js";
import TransactionModel from "../models/transaction.model.js";
import { TRANSACTION_TYPES } from "../constants/index.js";

const validateTransactionInputs = (walletId, amount, type) => {
  if (!walletId || !amount || !type) {
    throw new Error("Wallet ID, amount, and type are required");
  }
  if (Math.abs(amount) === 0) {
    throw new Error("Amount should  not be 0");
  }
};

const calculateNewBalance = (currentBalance, amount, type) => {
  if (type === TRANSACTION_TYPES.DEBIT || amount < 0) {
    if (Math.abs(amount) > Math.abs(currentBalance)) {
      throw new Error("Wallet has insufficient balance");
    }
    return parseFloat(
      (currentBalance - parseFloat(Math.abs(amount).toFixed(4))).toFixed(4)
    );
  }
  if (type === TRANSACTION_TYPES.CREDIT || amount > 0) {
    return parseFloat(
      (currentBalance + parseFloat(Math.abs(amount).toFixed(4))).toFixed(4)
    );
  }
  throw new Error("Invalid transaction type");
};

const createTransaction = async (req, res) => {
  const { walletId } = req.params;
  const session = await mongoose.startSession();

  try {
    const { amount, type, description } = req.body;

    validateTransactionInputs(walletId, amount, type);

    await session.withTransaction(async () => {
      const wallet = await WalletModel.findById(walletId).session(session);
      if (!wallet) {
        throw new Error("Wallet not found");
      }

      const newBalance = calculateNewBalance(
        wallet.balance,
        parseFloat(amount.toFixed(4)),
        type
      );

      wallet.balance = newBalance;
      await wallet.save({ session });

      const transactionData = {
        walletId,
        amount: parseFloat(Math.abs(amount.toFixed(4))),
        type,
        description,
        onRampBalance: parseFloat(newBalance.toFixed(4)),
      };
      const createdTransaction = await TransactionModel.create(
        [transactionData],
        {
          session,
        }
      );

      if (!createdTransaction) {
        throw new Error("Failed to create transaction");
      }
      res.status(200).json({
        message: "Transaction created successfully",
        data: createdTransaction,
      });
      return;
    });
  } catch (error) {
    console.error(`Transaction failed: ${error.message}`);
    res.status(500).json({
      message: "Transaction failed",
      error: error.message,
    });
  } finally {
    await session.endSession();
  }
};

const getTransactionDetails = async (req, res) => {
  const { walletId, skip, limit, sortBy = { createdAt: -1 } } = req.query;

  try {
    const transaction = await TransactionModel.find({ walletId })
      .sort(JSON.parse(sortBy))
      .skip(skip)
      .limit(limit);

    const total = await TransactionModel.countDocuments({ walletId });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.status(200).json({
      data: transaction,
      total,
    });
  } catch (error) {
    console.error(`Transaction details failed: ${error.message}`);
    res.status(500).json({
      message: "Transaction details failed to fetch",
      error: error.message,
    });
  }
};

export { createTransaction, getTransactionDetails };
