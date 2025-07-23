import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/index.js";
import walletRoute from "./routes/wallet.route.js";
import transactionRoute from "./routes/transaction.route.js";
import transactionDetailsRoute from "./routes/tranxDetails.route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

app.use("/setup", walletRoute);
app.use("/transact", transactionRoute);
app.use("/transaction", transactionDetailsRoute);

app.listen(process.env.PORT ?? 3000, () => {
  console.log(
    `Server is running on port ${process.env.PORT ?? 3000}: ${
      process.env.NODE_ENV
    }`,
    `http://localhost:${process.env.PORT}`
  );
});
