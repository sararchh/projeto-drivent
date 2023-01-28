import paymentsRepository from "@/repositories/payments-repository";
import { TicketPostProps } from "@/protocols";

export async function findByTicketId(ticketId: string, userId: number) {
  const searchPayments = await paymentsRepository.findByTicketId(ticketId, userId);

  return searchPayments;
}

export async function storePayments(payments: TicketPostProps, userId: number) {
  const searchPayments = await paymentsRepository.storePayments(payments, userId);

  return searchPayments;
}

const paymentsService = {
  findByTicketId,
  storePayments
};

export default paymentsService;
