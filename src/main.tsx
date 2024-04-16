import React from "react";
import ReactDOM from "react-dom";
import { DeskproAppProvider } from "@deskpro/app-sdk";
import { HashRouter } from "react-router-dom";
import { StoreProvider } from "./context/StoreProvider";
import { App } from "./App";

import "flatpickr/dist/themes/light.css";
import "tippy.js/dist/tippy.css";
import "simplebar/dist/simplebar.min.css";
import "@deskpro/deskpro-ui/dist/deskpro-ui.css";
import "@deskpro/deskpro-ui/dist/deskpro-custom-icons.css";

ReactDOM.render(
    <React.StrictMode>
        <DeskproAppProvider>
            <StoreProvider>
                <HashRouter>
                    <App />
                </HashRouter>
            </StoreProvider>
        </DeskproAppProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
