import mongoose, { Schema } from "mongoose";

const walletSchema = new Schema(
  {
    balance: { type: Number, required: true },
    username: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);

export default Wallet;
