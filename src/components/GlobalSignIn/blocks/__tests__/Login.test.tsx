import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../../testing";
import { Login } from "../Login";
import type { Props } from "../Login";

const renderLogin = (props?: Partial<Props>) => render((
    <Login
        url={props?.url as never}
        error={props?.error as never}
        isLoading={props?.isLoading || false}
        signIn={props?.signIn || jest.fn()}
        cancel={props?.cancel || jest.fn()}
    />
), { wrappers: { theme: true } });

describe("GlobalSignIn", () => {
    describe("Login", () => {
        afterEach(() => {
            jest.clearAllMocks();
            cleanup();
        });

        test("render", async () => {
            const { findByText, queryByRole } = renderLogin({ url: "https://deskpro.test/callback" });
            const signInLink = queryByRole("link", { name: /Sign-In/i }) as HTMLAnchorElement;
            const cancelButton = queryByRole("button", { name: /Cancel/i });

            expect(await findByText(/This TeamViewer user account will be used by all Deskpro agents/i)).toBeInTheDocument();
            expect(signInLink).toBeInTheDocument();
            expect(signInLink.href).toBe("https://deskpro.test/callback");
            expect(cancelButton).not.toBeInTheDocument();
        });

        test("should disabled sign-in link when url is not provided", () => {
            const { container } = renderLogin();
            const signInLink = container.querySelector("a[data-dp-name=AnchorButton]") as HTMLInputElement;

            expect(signInLink).not.toHaveAttribute("href");
        });

        test("should show loading spinner when loading", () => {
            const { container } = renderLogin({
                url: "https://deskpro.test/callback",
                isLoading: true,
            });
            const loading = container.querySelector("[data-dp-name=Spinner]") as HTMLInputElement;

            expect(loading).toBeInTheDocument();
        });

        test("should call signIn when sign-in link is clicked", async () => {
            const mockSignIn = jest.fn();
            const { queryByRole } = renderLogin({
                signIn: mockSignIn,
                url: "https://deskpro.test/callback",
            });
            const signInLink = queryByRole("link", { name: /Sign-In/i }) as HTMLAnchorElement;

            await userEvent.click(signInLink)

            expect(mockSignIn).toHaveBeenCalled();
        });

        test("shouldn't call sign-in if no pass url", async () => {
            const mockSignIn = jest.fn();
            const { queryByRole } = renderLogin({ signIn: mockSignIn });
            const signInLink = queryByRole("link", { name: /Sign-In/i }) as HTMLAnchorElement;

            await userEvent.click(signInLink)

            expect(mockSignIn).not.toHaveBeenCalled();
        });

        test("should show cancel button when loading", () => {
            const { queryByRole } = renderLogin({
                url: "https://deskpro.test/callback",
                isLoading: true,
            });
            const cancelButton = queryByRole("button", { name: /Cancel/i });

            expect(cancelButton).toBeInTheDocument();

        });

        test("should call cancel when cancel button is clicked", async () => {
            const mockCancel = jest.fn();
            const { queryByRole } = renderLogin({
                url: "https://deskpro.test/callback",
                isLoading: true,
                cancel: mockCancel,
            });
            const cancelButton = queryByRole("button", { name: /Cancel/i }) as HTMLButtonElement;

            await userEvent.click(cancelButton);

            expect(mockCancel).toHaveBeenCalled();
        });

        test("should show error message", async () => {
            const { findByText } = renderLogin({ error: "Some error message" });

            expect(await findByText(/Some error message/i)).toBeInTheDocument();
        });
    });
});
