import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ListPage } from "./pages/list";
import { CreatePage } from "./pages/create";
import { CreatedPage } from "./pages/created";
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
        ],  
    },
]);
