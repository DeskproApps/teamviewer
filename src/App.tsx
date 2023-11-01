import { DeskproAppProvider } from "@deskpro/app-sdk";
import { HashRouter } from "react-router-dom";
import { StoreProvider } from "./context/StoreProvider";
import { Main } from "./pages/Main";
import "iframe-resizer/js/iframeResizer.contentWindow.js";
import "flatpickr/dist/themes/light.css";
import "tippy.js/dist/tippy.css";
import "simplebar/dist/simplebar.min.css";
import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";

function App() {
    return (
        <DeskproAppProvider>
            <StoreProvider>
                <HashRouter>
                    <Main />
                </HashRouter>
            </StoreProvider>
        </DeskproAppProvider>
    );
}

export default App;
