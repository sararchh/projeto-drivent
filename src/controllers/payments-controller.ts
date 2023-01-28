import { Request, Response } from "express";
import httpStatus from "http-status";

import paymentsService from "@/services/payments-service";

export async function findByTicketId(req: Request, res: Response) {
  try {
    const { ticketId } = req.query;
    const userId = res.locals.userId;

    if (!ticketId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const searchPayments = await paymentsService.findByTicketId(ticketId.toString(), userId);

    return res.status(httpStatus.OK).send(searchPayments);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function storePayments(req: Request, res: Response) {
  try {
    const payments = req.body;
    const userId = res.locals.userId;

    const storePayments = await paymentsService.storePayments(payments, userId);

    return res.status(httpStatus.OK).send(storePayments);
  } catch (error) {
    if (error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }

    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}
