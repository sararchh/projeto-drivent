import { prisma } from "@/config";
import { notFoundError, unauthorizedError } from "@/errors";
import { TicketPostProps } from "@/protocols";

type TicketProps = {
  id: number,
  ticketId: number,
  value: number,
  cardIssuer: string, //VISA | MASTERCARD
  cardLastDigits: string,
  createdAt: Date,
  updatedAt: Date,
}

type PaymentsProps = {
  id: number,
  ticketId: number,
  value: number,
  cardIssuer: string, // VISA | MASTERCARD
  cardLastDigits: string,
  createdAt: Date,
  updatedAt: Date,
}

export async function findByTicketId(ticketId: string, userId: number) {
  const ticketExist = await prisma.ticket.findFirst({
    where: {
      id: Number(ticketId)
    }
  });

  const searchEnrollment = await prisma.enrollment.findFirst({
    where: {
      id: ticketExist.enrollmentId,
      userId: userId
    }
  });

  if (searchEnrollment === null) {
    throw unauthorizedError();
  }

  if (ticketExist === null) {
    throw notFoundError();
  }

  const searchPayments = await prisma.payment.findFirst({
    where: {
      ticketId: Number(ticketId)
    }
  });

  return searchPayments as TicketProps;
}

export async function storePayments(payments: TicketPostProps, userId: number) {
  const searchEnrollment = await prisma.enrollment.findFirst({
    where: {
      userId: userId
    }
  });

  const searchTicket = await prisma.ticket.findFirst({
    where: {
      enrollmentId: searchEnrollment.id
    }
  });

  if (searchTicket === null) {
    throw unauthorizedError();
  }

  const searchTicketType = await prisma.ticketType.findFirst({
    where: {
      id: searchTicket.ticketTypeId
    }
  });

  const cardLastDigits = payments.cardData.number.substring(payments.cardData.number.length -4);

  const createTicket = await prisma.payment.create({
    data: {
      ticketId: Number(payments.ticketId),
      value: searchTicketType.price,
      cardIssuer: payments.cardData.issuer,
      cardLastDigits: cardLastDigits,
    }
  });

  return createTicket as PaymentsProps;
}

const paymentsRepository = {
  findByTicketId,
  storePayments
};

export default paymentsRepository;
