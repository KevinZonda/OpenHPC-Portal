import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ListPage } from "./pages/list";
import { CreatePage } from "./pages/create";
import { CreatedPage } from "./pages/created";
import { SettingsPage } from "./pages/settings";
import { UpgradePage } from "./pages/upgrade";

export const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <ListPage />,
            },
            {
                path: "/create",
                element: <CreatePage />,
            },
            {
                path: "/created",
                element: <CreatedPage />,
            },
            {
                path: "/settings",
                element: <SettingsPage />,
            },
            {
                path: "/upgrade",
                element: <UpgradePage />,
            },
        ],  
    },
]);
