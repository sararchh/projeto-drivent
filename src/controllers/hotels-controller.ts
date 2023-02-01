import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const response = await hotelsService.getHotels(userId);

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    if (error.name === "HotelDoesNotExist") {
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
    
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getHotelsById(req: Request, res: Response) {
  try {
    const { hotelId } = req.params;

    if (!hotelId) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    const response = await hotelsService.getHotelsById(Number(hotelId));

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
