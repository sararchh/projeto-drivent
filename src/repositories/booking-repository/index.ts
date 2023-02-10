import { prisma } from "@/config";
import { ForbiddenError, notFoundError } from "@/errors";

async function findBooking(userId: number) {
  const booking = await prisma.booking.findFirst({
    select: { id: true, Room: true, },
    where: { userId },
  });

  return booking;
}

async function searchTicketTypeByUserId(userId: number) {
  const ticketTypeByUserId = await prisma.ticketType.findFirst({
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

  return ticketTypeByUserId;
}

async function searchTicketById(ticketTypeId: number) {
  const ticketByUserId = await prisma.ticket.findFirst({
    where: {
      ticketTypeId: ticketTypeId
    }
  });

  return ticketByUserId;
}

async function storeBooking(userId: number, roomId: number) {
  const searchRoom = await prisma.room.findFirst({
    where: {
      id: roomId
    }
  });

  if (!searchRoom) {
    throw notFoundError();
  }

  const countBookingByRoomId = await prisma.booking.count({
    where: {
      roomId
    }
  });

  if (countBookingByRoomId === searchRoom.capacity) {
    throw ForbiddenError();
  }

  const createBooking = await prisma.booking.create({
    data: {
      userId,
      roomId
    }
  });

  return { bookingId: createBooking.id };
}

async function searchBooking(userId: number) {
  const searchBooking = await prisma.booking.findFirst({
    where: {
      userId: userId
    }
  });

  return searchBooking;
}

async function updateBooking(roomId: number, bookingId: number) {
  const searchRoom = await prisma.room.findFirst({
    where: {
      id: roomId
    }
  });

  if (!searchRoom) {
    throw notFoundError();
  }

  const countBookingByRoomId = await prisma.booking.count({
    where: {
      roomId
    }
  });

  if (countBookingByRoomId === searchRoom.capacity) {
    throw ForbiddenError();
  }

  const bookingUpdate = await prisma.booking.update({
    where: { id: bookingId },
    data: { roomId }
  });

  return { bookingId: bookingUpdate.id };
}

const bookingRepository = {
  findBooking,
  storeBooking,
  searchTicketTypeByUserId,
  searchTicketById,
  updateBooking,
  searchBooking
};

export default bookingRepository;
