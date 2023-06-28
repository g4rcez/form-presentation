import { Markdown } from "../components/markdown.tsx";
import React, { useState } from "react";

type ToDo = { value: string; checked: boolean };

const Example = () => {
    const [state, setState] = useState<ToDo[]>([{ checked: false, value: "Adicionar To Do" }]);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const todo = { todos: state };
        console.log(todo);
        alert(JSON.stringify(todo, null, 4));
    };

    const onChange = (index: number, todo: ToDo) => {
        setState((prev) => {
            const copy = [...prev];
            copy[index] = todo;
            return copy;
        });
    };

    const addToDo = () => setState((prev) => [...prev, { value: "", checked: false }]);

    const onRemove = (i: number) => setState((prev) => [...prev].splice(i, 1));

    return (
        <form onSubmit={onSubmit} className="flex flex-row flex-wrap gap-4">
            <ul className="w-full grow space-y-4 rounded-lg p-2">
                {state.map((x, i) => (
                    <li
                        data-disabled={x.checked}
                        className="relative flex items-center gap-4 data-[disabled=true]:opacity-40"
                        key={`todo-${i}`}>
                        <div
                            hidden={!x.checked}
                            className="pointer-events-none absolute inset-0 top-[50%] h-1 w-full bg-slate-400"
                        />
                        <input
                            checked={x.checked}
                            className="h-4 w-4 cursor-pointer rounded-xl"
                            onChange={(e) => onChange(i, { checked: e.target.checked, value: x.value })}
                            type="checkbox"
                        />
                        <input
                            required
                            onInvalid={(e) => {
                                const input = e.currentTarget;
                                console.log(input.validity);
                                if (input.validity.patternMismatch) input.setCustomValidity("Primeira letra: A-Z");
                            }}
                            pattern="^[A-Z].*"
                            onChange={(e) => onChange(i, { value: e.target.value, checked: x.checked })}
                            value={x.value}
                            className="input"
                        />
                        <button type="button" onClick={() => onRemove(i)}>
                            🗑️
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={addToDo} type="button" className="rounded-lg bg-green-500 px-4 py-1 text-white">
                +Add To Do
            </button>
            <button type="submit" className="rounded-lg bg-green-500 px-4 py-1 text-white">
                Submit
            </button>
        </form>
    );
};

export default function FormWithListPage() {
    return (
        <main>
            <Markdown title="form-with-list" />
            <Example />
        </main>
    );
}
