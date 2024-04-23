import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockAccount } from "../../../../../testing";
import { Logout } from "../Logout";
import type { Props } from "../Logout";

const renderLogout = (props?: Partial<Props>) => render((
    <Logout
        user={props?.user || mockAccount}
        signOut={props?.signOut || jest.fn()}
    />
), { wrappers: { theme: true } });

describe("GlobalSignIn", () => {
    describe("Logout", () => {
        afterEach(() => {
            jest.clearAllMocks();
            cleanup();
        });

        test("render", async () => {
            const { findByText, findByRole } = renderLogout();

            expect(await findByText(/Signed-in as/i)).toBeInTheDocument();
            expect(await findByText(/Jon Snow/i)).toBeInTheDocument();
            expect(await findByText(/<jon.snow@nightwatch\.org>/i)).toBeInTheDocument();
            expect(await findByRole("button", { name: /Sign-out/i })).toBeInTheDocument();
        });

        test("should call sign-out when Sign-out button is clicked", async () => {
            const mockSignOut = jest.fn();
            const { findByRole } = renderLogout({ signOut: mockSignOut });
            const signOutButton = await findByRole("button", { name: /Sign-out/i });

            await userEvent.click(signOutButton);

            expect(mockSignOut).toHaveBeenCalled();
        });
    });
});
