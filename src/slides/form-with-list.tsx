import { Markdown } from "../components/markdown.tsx";
import React, { useState } from "react";

type User = { name: string; lastName: string };

const Example = () => {
    const [state, setState] = useState<User[]>([]);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = { users: state };
        console.log(user);
    };
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        setState((prev) => ({ ...prev, [name]: value }));
    };
    const commonOptions = { required: true, minLength: 2, pattern: "^[A-Z].*", onChange };
    return (
        <form onSubmit={onSubmit} className="flex flex-row gap-4">
            <input {...commonOptions} placeholder="Seu nome" name="name" />
            <input {...commonOptions} placeholder="Seu sobrenome" name="lastName" />
            <button type="button" className="rounded-lg bg-blue-500 px-4 py-1 text-white">
                Submit
            </button>
            <button type="submit" className="rounded-lg bg-blue-500 px-4 py-1 text-white">
                Submit
            </button>
        </form>
    );
};

export default function ControlledPage() {
    return (
        <main>
            <Markdown title="controlled" />
            <Example />
        </main>
    );
}
