import ticketsRepository from "@/repositories/tickets-repository";

export async function findMany() {
  const ticketsTypesAll = await ticketsRepository.findMany();

  return ticketsTypesAll;
}

export async function insertOne(userId: number, ticketTypeId: number) {
  const ticketsTypesInsert = await ticketsRepository.insertOne(userId, ticketTypeId);
  return ticketsTypesInsert;
}

export async function findUnique(userId: number) {
  const ticketsTypesSearch = await ticketsRepository.findUnique(userId);
  return ticketsTypesSearch;
}

const ticketsService = {
  findMany,
  insertOne,
  findUnique
};

export default ticketsService;
