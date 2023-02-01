import hotelsRepository from "@/repositories/hotels-repository";

async function getHotels() {
  const response = await hotelsRepository.getHotels();

  return response;
}

async function getHotelsById(hotelId: number) {
  const response = await hotelsRepository.getHotelsById(hotelId);

  return response;
}

const hotelsService = {
  getHotels,
  getHotelsById
};

export default hotelsService;
