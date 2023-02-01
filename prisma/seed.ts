import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  console.log({ event });

  let ticketType = await prisma.ticketType.findFirst();
  if (!ticketType) {
    ticketType = await prisma.ticketType.create({
      data: {
        name: "Driven.t",
        price: 10,
        isRemote: true,
        includesHotel: true,
        createdAt: dayjs().add(21, "days").toDate(),
        updatedAt: dayjs().add(21, "days").toDate(),
      }
    });
  }

  let hotel = await prisma.hotel.findFirst();
  if (!hotel) {
    hotel = await prisma.hotel.create({
      data: {
        name: "Driven.t HOTEL",
        image: "https://http.cat/200",
        createdAt: dayjs().add(21, "days").toDate(),
        updatedAt: dayjs().add(21, "days").toDate(),
      }
    });
  }

  let room = await prisma.room.findFirst();
  if (!room) {
    room = await prisma.room.create({
      data: {
        name: "Driven.t HOTEL",
        capacity: 20,
        hotelId: 1,
        createdAt: dayjs().add(21, "days").toDate(),
        updatedAt: dayjs().add(21, "days").toDate(),
      }
    });
  }

  let booking = await prisma.booking.findFirst();
  if (!booking) {
    booking = await prisma.booking.create({
      data: {
        userId: 4630,
        roomId: 1,
        createdAt: dayjs().add(21, "days").toDate(),
        updatedAt: dayjs().add(21, "days").toDate(),
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
