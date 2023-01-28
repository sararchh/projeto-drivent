import { NextFunction, Request, Response } from "express";
import { createPayments } from "@/schemas";

export const paymentsValidate = async (req: Request, res: Response, next: NextFunction) => {
  let errorsSchema;
  await createPayments.validateAsync(req.body, { abortEarly: false }).catch((errors: any) => {
    errorsSchema = errors;
  });

  if (errorsSchema) {
    return res.sendStatus(400);
  }

  next();
};
