import { cleanup } from "@testing-library/react";
import { render, mockSessions } from "../../../../../testing";
import { ExpiredSessions } from "../ExpiredSessions";
import type { Props } from "../ExpiredSessions";

const renderExpiredSessions = (props?: Partial<Props>) => render((
    <ExpiredSessions sessions={props?.sessions || mockSessions.sessions as never[]}/>
), { wrappers: { theme: true } });

describe("Home", () => {
    describe("ExpiredSessions", () => {
        afterEach(() => {
            jest.clearAllMocks();
            cleanup();
        });

        test("render", async () => {
            const { findByText } = renderExpiredSessions();

            expect(await findByText(/Expired Sessions \(2\)/i)).toBeInTheDocument();
            expect(await findByText(/s119-457-589/i)).toBeInTheDocument();
            expect(await findByText(/s184-827-508/i)).toBeInTheDocument();
        });
    });
});
