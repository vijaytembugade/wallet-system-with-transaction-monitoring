import { Router } from "express";
import {
  getAllWalletList,
  setupWallet,
} from "../controller/wallet.controlller.js";

const router = Router();

router.route("/").post(setupWallet);
router.route("/get-all-wallets").get(getAllWalletList);

export default router;
