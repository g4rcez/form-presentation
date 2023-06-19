import { asyncComponent, createMappedRouter } from "brouther";

export const router = createMappedRouter({
    whoami: {
        path: "/",
        element: asyncComponent(() => import("./slides/whoami")),
        data: { index: 1, title: "whoami" },
    },
    context: {
        path: "/contexto",
        element: asyncComponent(() => import("./slides/context")),
        data: { index: 2, title: "Contexto" },
    },
    uncontrolled: {
        path: "/estado-nao-controlado",
        element: asyncComponent(() => import("./slides/uncontrolled")),
        data: { index: 3, title: "Estado não controlado" },
    },
    controlled: {
        path: "/estado-controlado",
        element: asyncComponent(() => import("./slides/controlled")),
        data: { index: 3, title: "Controle de estado" },
    },
});
