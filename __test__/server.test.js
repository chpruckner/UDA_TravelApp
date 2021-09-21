import { app } from "../src/server/server";

describe("Testing express server", () => {
  test("Testing if app is defined", () => {
    expect(app).toBeDefined();
  });
});
