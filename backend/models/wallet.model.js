import mongoose, { Schema } from "mongoose";

const walletSchema = new Schema(
  {
    balance: { type: Number, required: true, default: 0 },
    username: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
