import { Markdown } from "../components/markdown.tsx";
import { useState } from "react";
import { createFormPath, formAsJson } from "../lib/form-as-json.ts";

type State = {
    user: { name: string; lastName: string };
    items: Array<{ socialMedia: string; href: string }>;
};

const form = createFormPath<State>();

const Example = () => {
    const [list, setList] = useState<number[]>([]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const json = formAsJson<State>(e.currentTarget);
        alert(JSON.stringify(json, null, 4));
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-wrap gap-4">
            <input required name={form("user.name")} placeholder="Nome" />
            <input required name={form("user.lastName")} placeholder="Sobrenome" />
            <div className="w-full border border-slate-300 p-2 ">
                <ul className="w-full">
                    {list.map((x) => (
                        <li key={`input-${x}`} className="mb-4 flex gap-3 border-b border-slate-400 pb-2">
                            <input name={form(`items[${x}].href`)} placeholder="Midia social" required />
                            <input
                                name={form(`items[${x}].href`)}
                                placeholder="https://example.com"
                                required
                                type="url"
                            />
                        </li>
                    ))}
                </ul>
                <button
                    type="button"
                    onClick={() => setList((prev) => [...prev, prev.length])}
                    className="w-fit rounded-lg border px-4 py-1">
                    Add Item
                </button>
            </div>
            <button type="submit" className="w-fit rounded-lg bg-green-600 px-4 py-1 text-white">
                Add Item
            </button>
        </form>
    );
};

export default function RootSlide() {
    return (
        <main>
            <Markdown title="json-form-submission" />
            <Example />
        </main>
    );
}
