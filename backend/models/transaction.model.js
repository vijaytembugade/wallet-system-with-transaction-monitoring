import mongoose, { Schema } from "mongoose";
import { TRANSACTION_TYPES } from "../constants/index.js";

const transactionSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0.0001,
      max: 1000000000000000000,
    },
    type: {
      type: String,
      required: true,
      enum: [TRANSACTION_TYPES.CREDIT, TRANSACTION_TYPES.DEBIT],
    },
    walletId: { type: Schema.Types.ObjectId, ref: "Wallet", required: true },
    onRampBalance: { type: Number, required: false },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
