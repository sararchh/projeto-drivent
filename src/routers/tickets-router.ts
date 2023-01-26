import { Router } from "express";
import { findMany, findUnique, insertOne } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/types", findMany)
  .get("/", findUnique)
  .post("/", insertOne);

export { ticketsRouter };
