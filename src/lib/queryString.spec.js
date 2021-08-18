const { queryString } = require("./queryString");

describe("Query string", () => {
  it("should create a valid query string when an object is provided", () => {
    const obj = {
      name: "Jonathan",
      profession: "developer",
    };

    expect(queryString(obj)).toBe("name=Jonathan&profession=developer");
  });
});
