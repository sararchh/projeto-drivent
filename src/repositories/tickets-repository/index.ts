import { prisma } from "@/config";

type TicketTypeProps = {
  id: number,
  name: string,
  price: number,
  isRemote: boolean,
  includesHotel: boolean,
  createdAt: Date,
  updatedAt: Date,
}

type TicketsProps = {
  id: number,
  status: string, //RESERVED | PAID
  ticketTypeId: number,
  enrollmentId: number,
  TicketType: {
    id: number,
    name: string,
    price: number,
    isRemote: boolean,
    includesHotel: boolean,
    createdAt: Date,
    updatedAt: Date,
  },
  createdAt: Date,
  updatedAt: Date,
}

async function findMany() {
  return prisma.ticketType.findMany();
}

async function insertOne(userId: number, ticketTypeId: number) {
  const getTicketType = await prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId
    }
  });

  const getEnrollment = await prisma.enrollment.findFirst({
    where: {
      userId: userId
    }
  });

  const createTicket = await prisma.ticket.create({
    data: {
      ticketTypeId: ticketTypeId,
      enrollmentId: getEnrollment.id,
      status: "RESERVED"
    }
  });

  const obj = {
    id: createTicket.id,
    status: createTicket.status, //RESERVED | PAID
    ticketTypeId: ticketTypeId,
    enrollmentId: getEnrollment.id,
    TicketType: {
      id: getTicketType.id,
      name: getTicketType.name,
      price: getTicketType.price,
      isRemote: getTicketType.isRemote,
      includesHotel: getTicketType.includesHotel,
      createdAt: getTicketType.createdAt,
      updatedAt: getTicketType.updatedAt,
    },
    createdAt: createTicket.createdAt,
    updatedAt: createTicket.updatedAt,
  };

  return obj as TicketsProps;
}

async function findUnique(userId: number) {
  const searchEnrollment = await prisma.enrollment.findMany({
    where: {
      userId: userId
    }
  });

  if (searchEnrollment[0] === undefined) {
    throw Error("NoContentEnrollment");
  }

  const searchTicket = await prisma.ticket.findMany({
    where: {
      enrollmentId: searchEnrollment[0].id
    },
    include: {
      TicketType: true
    }
  });

  if (searchTicket[0] === undefined) {
    throw Error("NoContentEnrollment");
  }

  return searchTicket[0];
}

const ticketsRepository = {
  findMany,
  insertOne,
  findUnique
};

export default ticketsRepository;
