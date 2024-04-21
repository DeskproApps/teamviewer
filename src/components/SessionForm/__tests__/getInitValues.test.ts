import { getInitValues } from "../utils";
import { mockContext } from "../../../../testing";

describe("SessionForm", () => {
    describe("getInitValues", () => {
        test("should return initial values pre-filled", () => {
            expect(getInitValues(mockContext.data.ticket as never)).toStrictEqual({
                description: "Big ticket",
                waitingMessage: "",
                name: "Ivan Mazepa",
                email: "ivan.mazepa@cossacks.org",
            });
        });

        test.each(
            [undefined, null, "", 0, true, false, {}]
        )("wrong value: %p", (payload) => {
            expect(getInitValues(payload as never)).toStrictEqual({
                description: "",
                waitingMessage: "",
                name: "",
                email: "",
            });
        });
    });
});