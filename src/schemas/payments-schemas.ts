import Joi from "joi";

export const createPayments = Joi.object({
  ticketId: Joi.number().required(),
  cardData: {
    issuer: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    expirationDate: Joi.required(),
    cvv: Joi.string().required()
  }
});
