import { Markdown } from "../components/markdown.tsx";
import React from "react";

const UncontrolledExample = () => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("userName");
        const lastName = formData.get("userLastName");
        const user = { user: { name, lastName } };
        console.log(user);
    };
    return (
        <form onSubmit={onSubmit} className="flex flex-row gap-4">
            <input required minLength={2} pattern="^[A-Z].*" placeholder="Seu nome" name="userName" />
            <input required minLength={2} pattern="^[A-Z].*" placeholder="Seu sobrenome" name="userLastName" />
            <button type="submit" className="rounded-lg bg-blue-500 px-4 py-1 text-white">
                Submit
            </button>
        </form>
    );
};

export default function FallbackPage() {
    return (
        <main>
            <Markdown title="uncontrolled" />
            <UncontrolledExample />
        </main>
    );
}
