import { cleanup } from "@testing-library/react";
import { render, mockSessions } from "../../../../../testing";
import { ActiveSessions } from "../ActiveSessions";
import type { Props } from "../ActiveSessions";

const renderActiveSessions = (props?: Partial<Props>) => render((
    <ActiveSessions
        sessions={props?.sessions || mockSessions.sessions as never}
        onCreate={props?.onCreate || jest.fn()}
        onInsertLink={props?.onInsertLink || jest.fn()}
        onDelete={props?.onDelete || jest.fn()}
    />
), { wrappers: { theme: true, router: true } });

describe("Home", () => {
    describe("ActiveSessions", () => {
        afterEach(() => {
            jest.clearAllMocks();
            cleanup();
        });

        test("render", async () => {
            const { findByText } = renderActiveSessions();

            expect(await findByText(/Active Sessions \(2\)/i)).toBeInTheDocument();
            expect(await findByText(/s119-457-589/i)).toBeInTheDocument();
            expect(await findByText(/s184-827-508/i)).toBeInTheDocument();
        });
    });
});

