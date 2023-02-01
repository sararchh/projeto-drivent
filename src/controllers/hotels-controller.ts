import hotelsService from "@/services/hotels-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: Request, res: Response) {
  try {
    const response = await hotelsService.getHotels();

    return res.status(httpStatus.OK).send(response);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}

export async function getHotelsById(req: Request, res: Response) {
  try {
    const { hotelId } = req.params;
    const response = await hotelsService.getHotelsById(Number(hotelId));

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
