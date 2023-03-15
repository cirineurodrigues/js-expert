const { describe, it } = require("mocha");
const request = require("supertest");
const { deepStrictEqual, ok } = require("assert");

const app = require("./api");

describe("API Suit test", () => {
  describe("/contact", () => {
    it("should request the contact page and return HTTP status 200", async () => {
      const response = await request(app).get("/contact").expect(200);
      deepStrictEqual(response.text, "contact us page");
    });
  });

  describe("/hello", () => {
    it("should request an inexistent route /hi and redirect to /hello", async () => {
      const response = await request(app).get("/hi").expect(200);
      deepStrictEqual(response.text, "Hello World!");
    });
  });

  describe("/login", () => {
    it("should login successfully on the login route and return HTTP Status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "cirineurodrigues", password: "123456" })
        .expect(200);
      deepStrictEqual(response.text, "Loggin has succeeded!");
    });

    it("should unauthorize a request when requesti it using wrong credentials", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "cirineurodrigues", password: "654321" })
        .expect(401);

      ok(response.unauthorized);
      deepStrictEqual(response.text, "Logginn failed!");
    });
  });
});
