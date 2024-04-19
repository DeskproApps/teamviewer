import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { CallbackUrl } from "../CallbackUrl";
import type { Props } from "../CallbackUrl";

const renderCallbackUrl = (props?: Partial<Props>) => render((
    <CallbackUrl url={props?.url || "https://deskpro.test/callback"} />
), { wrappers: { theme: true } });

describe("GlobalSignIn", () => {
    describe("CallbackUrl", () => {
        afterEach(() => {
            jest.clearAllMocks();
            cleanup();
        });

        test("render", async () => {
            const { findByText, container } = renderCallbackUrl();
            const input = container.querySelector("input[data-dp-name=searchInputField]") as HTMLInputElement;

            expect(await findByText(/The callback URL will be required during TeamViewer app setup/i)).toBeInTheDocument();
            expect(input.value).toBe("https://deskpro.test/callback");
        });
    });
});
