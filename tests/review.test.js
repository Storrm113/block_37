const request = require("supertest");
const app = require("../server");

describe("Review API Endpoints", () => {
    let userId, itemId;

    beforeAll(async () => {
        const userRes = await request(app)
            .post("/api/auth/register")
            .send({ username: "testuser2", email: "testuser2@example.com", password: "password123" });

        console.log("User creation response:", userRes.body); // Debugging log
        userId = userRes.body.id;

        const itemRes = await request(app)
            .post("/api/items")
            .send({ name: "Test Item", description: "This is a test item." });

        console.log("Item creation response:", itemRes.body); // Debugging log
        itemId = itemRes.body.id;
    });

    it("should submit a new review", async () => {
        const res = await request(app)
            .post(`/api/items/${itemId}/reviews`)
            .send({ userId: userId, rating: 5, text: "Great product!" });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id");
    });
});

