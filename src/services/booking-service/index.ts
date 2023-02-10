import { ForbiddenError, notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";

async function findBooking(userId: number) {
  const booking = await bookingRepository.findBooking(userId);

  if (!booking) {
    throw notFoundError();
  }
  return booking;
}

async function storeBooking(userId: number, roomId: number) {
  const searchTicketType = await bookingRepository.searchTicketTypeByUserId(userId);

  const searchTicket = await bookingRepository.searchTicketById(searchTicketType.id);

  const validateData = searchTicketType.isRemote === false || searchTicketType.includesHotel === false || searchTicket.status === "RESERVED";

  if (validateData) {
    throw ForbiddenError();
  }

  const booking = await bookingRepository.storeBooking(userId, roomId);

  return booking;
}

async function updateBooking(userId: number, roomId: number, bookingId: number) {
  const searchBooking = bookingRepository.searchBooking(userId);
  if (!searchBooking) {
    throw notFoundError();
  }

  const updateBooking = await bookingRepository.updateBooking(roomId, bookingId);

  if (!updateBooking) {
    throw notFoundError();
  }

  return updateBooking;
}

const bookingService = {
  findBooking,
  storeBooking,
  updateBooking
};

export default bookingService;
