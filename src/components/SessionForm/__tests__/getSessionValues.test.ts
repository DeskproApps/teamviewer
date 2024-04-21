import { getSessionValues } from "../utils";
import values from "./values.json";

describe("SessionForm", () => {
    describe("getSessionValues", () => {
        test("should return session values", () => {
            expect(getSessionValues(values as never)).toStrictEqual({
                groupname: "Deskpro",
                description: "Some description",
                waiting_message: "Some waiting message",
                end_customer: {
                    name: "Ivan Mazepa",
                    email: "ivan.mazepa@cossacks.org",
                },
            });
        });
    });
});
