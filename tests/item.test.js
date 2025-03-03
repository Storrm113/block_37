const request = require("supertest");
const app = require("../server");

describe("Item API Endpoints", () => {
    let itemId;

    beforeAll(async () => {
        const itemRes = await request(app)
            .post("/api/items")
            .send({ name: "Test Item", description: "This is a test item." });

        console.log("Item creation response:", itemRes.body); // Debugging log
        itemId = itemRes.body.id;
    });

    it("should get a specific item by ID", async () => {
        const res = await request(app).get(`/api/items/${itemId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("id", itemId);
    });
});
