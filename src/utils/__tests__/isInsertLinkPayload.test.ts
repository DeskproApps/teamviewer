import { isInsertLinkPayload } from "../isInsertLinkPayload";

describe("utils", () => {
    describe("isInsertLinkPayload", () => {
        test("should InsertLink payload", () => {
            expect(isInsertLinkPayload({ type: "insertLink", link: "https://link.com" })).toBeTruthy();
        });

        test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
            expect(isInsertLinkPayload(payload as never)).toBeFalsy();
        });
    });
});