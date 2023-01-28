import { Router } from "express";
import { findByTicketId, storePayments } from "@/controllers";
import { authenticateToken, paymentsValidate } from "@/middlewares";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", findByTicketId)
  .post("/process", [paymentsValidate], storePayments);

export { paymentsRouter };
