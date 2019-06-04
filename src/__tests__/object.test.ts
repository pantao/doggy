import { object } from "..";

test("test object.lowercaseKeys(o)", () => {
  expect(object.lowercaseKeys({ Key: "v", KeYs: "v" }).key).toBe("v");
});

test("test object.deepEqual(a, b)", () => {
  expect(
    object.deepEqual(
      { a: { b: { c: { d: 1 } } } },
      { a: { b: { c: { d: 1 } } } }
    )
  ).toBe(true);
});
