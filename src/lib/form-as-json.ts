import { parse } from "qs";

type Primitives = bigint | boolean | string | number | null | undefined | symbol;

type N<T> = T extends `${infer n extends bigint | number}` ? n : never;

type Keys<T> = T extends readonly unknown[]
    ? { [K in keyof T]: K }[number] extends infer R
        ? R extends string
            ? N<R> & keyof T
            : R & keyof T
        : never
    : keyof T;

type JoinPath<A extends string, B extends string, Sep extends string = ""> = [A] extends [never]
    ? B
    : [B] extends [never]
    ? A
    : `${A}${Sep}${B}`;

export type AllPaths<T, ParentPath extends string = never> = T extends Primitives
    ? ParentPath
    : unknown extends T
    ? JoinPath<ParentPath, string, ".">
    : T extends readonly any[]
    ? Keys<T> extends infer key extends string | number
        ? JoinPath<ParentPath, `[${key}]`> | AllPaths<T[number], JoinPath<ParentPath, `[${key}]`>>
        : never
    : keyof T extends infer key extends keyof T & string
    ? key extends any
        ? JoinPath<ParentPath, key, "."> | AllPaths<T[key], JoinPath<ParentPath, key, ".">>
        : never
    : ParentPath;

export const createFormPath =
    <T>(_t?: T) =>
    <Path extends AllPaths<T>>(path: Path) =>
        path;

export const formAsJson = <T>(form: HTMLFormElement): T => {
    const formData = new FormData(form);
    return parse(new URLSearchParams(formData as any).toString(), {
        allowDots: true,
        allowPrototypes: false,
        arrayLimit: Number.MAX_SAFE_INTEGER,
        charset: "utf-8",
        depth: Number.MAX_SAFE_INTEGER,
        parameterLimit: Number.MAX_SAFE_INTEGER,
        parseArrays: true,
    }) as any;
};
