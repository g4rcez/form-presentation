import { Markdown } from "../components/markdown.tsx";
import React from "react";
import { formAsJson } from "../lib/form-as-json.ts";

const commonOptions = {
    required: true,
    minLength: 2,
    pattern: "^[A-Z].*",
};

export default function ContextSlide() {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const json = formAsJson(e.currentTarget);
        console.log(json);
    };
    return (
        <main>
            <Markdown title="context" />
            <form className="my-8 flex flex-row gap-4" onSubmit={onSubmit}>
                <input {...commonOptions} placeholder="Seu nome" name="user.name" />
                <input {...commonOptions} placeholder="Seu sobrenome" name="user.lastName" />
                <button className="rounded-lg bg-blue-500 px-4 py-1 text-white">Submit</button>
            </form>
        </main>
    );
}
