const request = require("supertest");
const app = require("../server");

describe("Comment API Endpoints", () => {
    let token = "";

    beforeAll(async () => {
        const loginRes = await request(app)
            .post("/api/auth/login")
            .send({ email: "testuser2@example.com", password: "password123" });

        token = loginRes.body.token;
    });

    it("should add a comment to a review", async () => {
        const res = await request(app)
            .post("/api/items/1/reviews/1/comments")
            .set("Authorization", `Bearer ${token}`)
            .send({
                text: "I completely agree with this review!"
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id");
    });

    it("should get all comments by the user", async () => {
        const res = await request(app)
            .get("/api/comments/me")
            .set("Authorization", `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
