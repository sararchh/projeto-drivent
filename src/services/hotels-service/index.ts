import hotelsRepository from "@/repositories/hotels-repository";

async function getHotels(userId: number) {
  const response = await hotelsRepository.getHotels(userId);

  return response;
}

async function getHotelsById(hotelId: number, userId: number) {
  const response = await hotelsRepository.getHotelsById(hotelId, userId);

  return response;
}

const hotelsService = {
  getHotels,
  getHotelsById
};

export default hotelsService;
