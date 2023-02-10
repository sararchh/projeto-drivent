import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { findBooking, storeBooking, updateBooking } from "@/controllers";

const bookingRouter = Router();

bookingRouter
  .all("/*", authenticateToken)
  .get("/", findBooking)
  .post("/", storeBooking)
  .put("/:bookingId", updateBooking);

export { bookingRouter };
