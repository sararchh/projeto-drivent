import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function getHotels() {
  const searchBooking = await prisma.booking.findMany({});

  const newArrayBooking = [];
  for (let i = 0; i < searchBooking.length; i++) {
    const searchRoom = await prisma.room.findMany({
      where: {
        id: searchBooking[i].roomId
      }
    });
    newArrayBooking.push(searchRoom[0]);
  }

  const newArrayHotels = [];
  for (let i = 0; i < newArrayBooking.length; i++) {
    const searchHotels = await prisma.hotel.findMany({
      where: {
        id: newArrayBooking[i].hotelId
      }
    });
    newArrayHotels.push(searchHotels[0]);
  }

  return newArrayHotels;
}

async function getHotelsById(hotelId: number) {
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
