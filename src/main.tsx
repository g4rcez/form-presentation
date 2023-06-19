import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Brouther } from "brouther";
import { router } from "./router.tsx";
import { App } from "./layout.tsx";
import { Shiki } from "./components/markdown.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <React.Suspense fallback={<div />}>
            <Brouther config={router.config}>
                <Shiki>
                    <App />
                </Shiki>
            </Brouther>
        </React.Suspense>
    </React.StrictMode>
);
