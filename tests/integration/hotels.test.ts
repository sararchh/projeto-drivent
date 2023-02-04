import app, { init } from "@/app";
import { TicketStatus } from "@prisma/client";
import httpStatus from "http-status";
import supertest from "supertest";
import { createEnrollmentWithAddress, createTicket, createTicketType, createUser } from "../factories";
import { createHotels } from "../factories/hotels-factory";
import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe("GET /hotels ", () => {
  it("should response with status 401 when token is not valid", async () => {
    const token = "kjiowejgoiajgoiejoijhoijaohi";

    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should return 404 when there is no ticketType", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);    
    expect(response.body).toEqual({});
  });

  it("should return 404 when there is no hotel", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const ticketType = await createTicketType();
    const enrollment =  await createEnrollmentWithAddress(user);
    const ticket =  await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body).toEqual({});
  });

  it("should return status 200 when including hotel and remote. Or should return 402 when there is no hotel and it is not remote", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const ticketType = await createTicketType();
    const enrollment =  await createEnrollmentWithAddress(user);
    const ticket =  await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const hotels = await createHotels();

    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

    if(ticketType.isRemote === true && ticketType.includesHotel === true) {
      return expect(response.status).toBe(httpStatus.OK);
      //TO DO VERIFICAR RETORNO DO OBJETO
    }
    
    expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
    expect(response.body).toEqual({});
  });
});

describe("GET /hotels/:hotelsId ", () => {
  it("should response with status 401 when token is not valid", async () => {
    const token = "kjiowejgoiajgoiejoijhoijaohi";
    const hotels = await createHotels();
    
    const response = await server.get(`/hotels/${hotels.id}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should return 404 when there is no ticketType", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const hotels = await createHotels();
    
    const response = await server.get(`/hotels/${hotels.id}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);    
    expect(response.body).toEqual({});
  });

  it("should return 404 when there is no hotel", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const ticketType = await createTicketType();
    const enrollment =  await createEnrollmentWithAddress(user);
    await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    
    const response = await server.get("/hotels/xxxxxxxxxx").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.NOT_FOUND);
    expect(response.body).toEqual({});
  });

  it("should return status 200 when including hotel and remote. Or should return 402 when there is no hotel and it is not remote", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    const ticketType = await createTicketType();
    const enrollment =  await createEnrollmentWithAddress(user);
    const ticket =  await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
    const hotels = await createHotels();
    
    const response = await server.get(`/hotels/${hotels.id}`).set("Authorization", `Bearer ${token}`);

    if(ticketType.isRemote === true && ticketType.includesHotel === true) {
      return expect(response.status).toBe(httpStatus.OK);
      //TO DO VERIFICAR RETORNO DO OBJETO
    }
    
    expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
    expect(response.body).toEqual({});
  });
});

