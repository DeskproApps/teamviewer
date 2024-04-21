import { isDeleteSessionPayload } from "../isDeleteSessionPayload";

describe("utils", () => {
    describe("isDeleteSessionPayload", () => {
        test("should \"delete session\" payload", () => {
            expect(isDeleteSessionPayload({ type: "delete", code: "s100500" })).toBeTruthy();
        });

        test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
            expect(isDeleteSessionPayload(payload as never)).toBeFalsy();
        });
    });
});
