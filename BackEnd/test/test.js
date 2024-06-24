import app from "../app";
import request from "supertest";

describe("Data routes", () => {
  describe("GET /cities", () => {
    it("Get all cities", async () => {
      const response = await request(app).get("/cities");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(5);
    });
  });

  describe("GET /vehicles", () => {
    it("Get all vehicles", async () => {
      const response = await request(app).get("/vehicles");
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
    });
  });
});

describe("Capture routes", () => {
  it("post success", async () => {
    const payload = [
      { copName: "Cop1", city: "Yapkashnagar", vehicle: "EV SUV" },
      { copName: "Cop2", city: "Lihaspur", vehicle: "EV CAR" },
      { copName: "Cop3", city: "Nuravgram", vehicle: "EV BIKE" },
    ];
    const response = await request(app).post("/capture").send(payload);
    expect(response.status).toBe(200);
  });

  it("post failure, no three objects", async () => {
    const payload = [
      { copName: "Cop1", city: "Yapkashnagar", vehicle: "EV SUV" },
      { copName: "Cop3", city: "Nuravgram", vehicle: "EV BIKE" },
    ];
    const response = await request(app).post("/capture").send(payload);
    expect(response.status).toBe(400);
  });
});
