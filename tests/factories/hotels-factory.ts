import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotels() {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.datatype.string()
    },
  });
}
