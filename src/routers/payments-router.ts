import { Router } from "express";
// import {  } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken);

export { paymentsRouter };
