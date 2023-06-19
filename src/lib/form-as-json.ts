import { parse } from "qs";

export const formAsJson = (form: HTMLFormElement) => {
    const formData = new FormData(form)
    return parse(new URLSearchParams(formData as any).toString(), {
        allowDots: true,
        allowPrototypes: false,
        arrayLimit: Number.MAX_SAFE_INTEGER,
        charset: "utf-8",
        depth: Number.MAX_SAFE_INTEGER,
        parameterLimit: Number.MAX_SAFE_INTEGER,
        parseArrays: true,
    });
};
