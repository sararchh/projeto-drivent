import app, { init } from "@/app";
import httpStatus from "http-status";
import supertest from "supertest";
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

  it("should respond with status 200 when there is a hotel", async () => {
    const token = await generateValidToken();

    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
  });

  it("should respond with status 200 and empty array when no room is booked", async () => {
    const token = await generateValidToken();

    const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([]);
  });
});

// describe("GET /hotels:hotelId ", () => {
//   it("should response with status 401 when token is not valid", async () => {
//     const token = "kjiowejgoiajgoiejoijhoijaohi";

//     const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);
    
//     expect(response.status).toBe(httpStatus.UNAUTHORIZED);
//   });

//   it("should respond with status 200 when there is a hotel", async () => {
//     const token = await generateValidToken();

//     const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(httpStatus.OK);
//   });

//   it("should respond with status 200 and empty array when no room is booked", async () => {
//     const token = await generateValidToken();

//     const response = await server.get("/hotels").set("Authorization", `Bearer ${token}`);

//     expect(response.status).toBe(httpStatus.OK);
//     expect(response.body).toEqual([]);
//   });
// });
