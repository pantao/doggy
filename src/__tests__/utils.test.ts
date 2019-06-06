import { utils } from "..";

test("test utils.uniqueId()", () => {
  expect(utils.uniqueId().length).toBe(36);
});
