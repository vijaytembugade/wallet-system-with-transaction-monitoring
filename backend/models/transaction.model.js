import mongoose, { Schema } from "mongoose";
import { TRANSACTION_TYPES } from "../constants/index.js";

const transactionSchema = new Schema(
  {
    amount: { type: Number, required: true },
    type: {
      type: String,
      required: true,
      enum: [TRANSACTION_TYPES.CREDIT, TRANSACTION_TYPES.DEBIT],
    },
    walletId: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
    onRampBalance: { type: Number, required: false },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    error: { type: String, required: false },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
