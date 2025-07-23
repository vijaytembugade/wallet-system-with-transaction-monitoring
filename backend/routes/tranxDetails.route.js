import { Router } from "express";
import { getTransactionDetails } from "../controller/transaction.controller.js";

const router = Router();

router.route("/").get(getTransactionDetails);

export default router;
