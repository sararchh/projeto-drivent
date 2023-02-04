import { prisma } from "@/config";
import { notFoundError } from "@/errors";

async function getHotels(userId: number) {
  const responseTicketTypes = await prisma.ticketType.findMany({
    include: {
      Ticket: { select: { status: true } }
    },
    where: {
      Ticket: {
        every: {
          Enrollment: {
            userId
          }
        }
      }
    }
  });
  
  if (responseTicketTypes.length === 0) {
    throw notFoundError();
  }

  const hotels = await prisma.hotel.findMany({});

  if (hotels.length === 0) {
    throw notFoundError();
  }

  const filterTickets = responseTicketTypes.filter(i => i.isRemote === true && i.includesHotel === true);

  if (filterTickets.length === 0) {
    throw { name: "HotelDoesNotExist" };
  }

  const filterPaidTickets = responseTicketTypes.filter(i => i.Ticket[0].status === "PAID");

  if (filterPaidTickets.length === 0) {
    throw { name: "HotelDoesNotExist" };
  }
  
  return hotels;
}

async function getHotelsById(hotelId: number, userId: number) {
  const responseTicketTypes = await prisma.ticketType.findMany({
    include: {
      Ticket: { select: { status: true } }
    },
    where: {
      Ticket: {
        every: {
          Enrollment: {
            userId
          }
        }
      }
    }
  });

  if (responseTicketTypes.length === 0) {
    throw notFoundError();
  }

  const hotels = await prisma.hotel.findMany({});

  if (hotels.length === 0) {
    throw notFoundError();
  }

  const filterTickets = responseTicketTypes.filter(i => i.isRemote === true && i.includesHotel === true);

  if (filterTickets.length === 0) {
    throw { name: "HotelDoesNotExist" };
  }
  
  const filterPaidTickets = responseTicketTypes.filter(i => i.Ticket[0].status === "PAID");

  if (filterPaidTickets.length === 0) {
    throw { name: "HotelDoesNotExist" };
  }

  const searchHotels = await prisma.hotel.findMany({
    where: {
      id: hotelId
    }
  });

  const searchRoom = await prisma.room.findMany({
    where: {
      hotelId: hotelId
    }
  });

  const obj = {
    id: searchHotels[0].id,
    name: searchHotels[0].name,
    image: searchHotels[0].image,
    createdAt: searchHotels[0].createdAt.toISOString(),
    updatedAt: searchHotels[0].updatedAt.toISOString(),
    Rooms: searchRoom
  };

  return obj;
}

const hotelsRepository = {
  getHotels,
  getHotelsById
};

export default hotelsRepository;
