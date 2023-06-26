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
    validityState: {
        path: "/validity-state",
        element: asyncComponent(() => import("./slides/validity-state")),
        data: { index: 4, title: "ValidityState" },
    },
    list: {
        path: "/listas",
        element: asyncComponent(() => import("./slides/form-with-list")),
        data: { index: 5, title: "Formulário com listas" },
    },
    jsonForm: {
        path: "/json-form-submission",
        element: asyncComponent(() => import("./slides/json-form-submission")),
        data: { index: 6, title: "Submissão de JSON via Form" },
    },
});
