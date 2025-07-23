import { Router } from "express";
import {
  getAllWalletList,
  setupWallet,
  getWalletDetails,
} from "../controller/wallet.controlller.js";

const router = Router();

router.route("/").post(setupWallet);
router.route("/get-all-wallets").get(getAllWalletList);
router.route("/:walletId").get(getWalletDetails);

export default router;
