// import userService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

import ticketsService from "@/services/tickets-service";

export async function findMany(req: Request, res: Response) {
  try {
    const ticketsTypesAll = await ticketsService.findMany();

    return res.status(httpStatus.OK).send(ticketsTypesAll);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }
}

export async function insertOne(req: Request, res: Response) {
  try {
    const userId = res.locals.userId;

    if (req.body.ticketTypeId == undefined) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const insertTicket = await ticketsService.insertOne(userId, req.body.ticketTypeId);

    return res.status(httpStatus.CREATED).send(insertTicket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }
  }
}

export async function findUnique(req: Request, res: Response) {
  try {
    const userId = res.locals.userId;

    const findTicket = await ticketsService.findUnique(userId);

    return res.status(httpStatus.OK).send(findTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

