const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);

  });
});

describe("Test POST /launches", () => {
  const completeLaunchData = {
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: "December 27, 2035",
    target: "Kepler-442b",
  };

  const launchDataWithInvalidDate = {
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate: "siddhartha",
    target: "Kepler-442b",
  };

  const launchDatawithoutDate = {
    mission: "Kepler Exploration X",
    rocket: "Explorer IS1",
    target: "Kepler-442b",
  };

  test("It should respond with 201 success", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDatawithoutDate);
  });

  test("It should catch missing required property", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDatawithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });

  test("It should cath invalid dates", async () => {
    const response = await request(app)
      .post("/launches")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing launch date",
    });
  });
});
