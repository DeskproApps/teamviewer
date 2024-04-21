import { isLast } from "../isLast";

describe("isLast", () => {
    test("should return true if pass last index of array", () => {
        expect(isLast([1 ,2, 3] as never, 2)).toBeTruthy();
        expect(isLast([1] as never, 0)).toBeTruthy();
    });

    test("should return false if pass not last index", () => {
        expect(isLast([1, 2, 3, 4, 5] as never, 3)).toBeFalsy();
    });

    test("should return false if empty array", () => {
        expect(isLast([] as never, 0)).toBeFalsy();
    });

    test("should return false if no pass idx", () => {
        expect(isLast([1, 2, 3] as never)).toBeFalsy();
    });

    test.each(
        [undefined, null, "", 0, true, false, {}],
    )("wrong value: %p", (value) => {
        expect(isLast(value as never, 0)).toBeFalsy();
    });
});
