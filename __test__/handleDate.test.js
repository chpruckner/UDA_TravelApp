import { handleDate } from "../src/client/js/handleDate";

describe("Testing date handler", () => {
  test("Testing if 2031-12-01 is in the future", () => {
    expect(handleDate("2031-12-01")).toEqual({ check: true, days: 3722 });
  });

  test("Testing if 2021-09-01 lies in the past", () => {
    expect(handleDate("2021-09-01")).toEqual({ check: false, days: 0 });
  });
});
