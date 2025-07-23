import { Router } from "express";
import { createTransaction } from "../controller/transaction.controller.js";

const router = Router();

router.route("/:walletId").post(createTransaction);

export default router;
