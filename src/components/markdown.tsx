import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Anchor } from "./anchor.tsx";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getHighlighter, Highlighter, Lang, setCDN } from "shiki";
import json5 from "json5";
import parseNumericRange from "parse-numeric-range";
import { visit } from "unist-util-visit";

export const langs: Lang[] = ["css", "html", "javascript", "typescript", "tsx"];

const components = {
    a: Anchor,
    code: (props: any) => <code {...props} className="not-prose" />,
};

setCDN("https://unpkg.com/shiki");

const remarkShiki = (props: { highlighter: Highlighter }) => {
    const parseMeta = parseMetaDefault;
    const loadedLanguages = props.highlighter.getLoadedLanguages();
    const ignoreUnknownLanguage = true;

    return function transformer(tree: any) {
        visit(tree, "code", visitor);

        function visitor(node: any) {
            const lang = ignoreUnknownLanguage && !loadedLanguages.includes(node.lang) ? null : node.lang;
            const lineOptions = parseMeta(node.meta);
            const highlighted = props.highlighter.codeToHtml(node.value, { lang, lineOptions, theme: "one-dark-pro" });
            node.type = "html";
            node.value = (
                <code
                    key={Math.random().toString(36).substring(2, 16)}
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                />
            );
        }
    };
};

function parseMetaDefault(meta: any) {
    if (meta === null || meta?.length === 0) return undefined;
    try {
        const parsed = json5.parse(meta);
        if (parsed.highlight === null) return;
        const highlighted = parseNumericRange(parsed.highlight);
        return highlighted.map((line) => ({ line, classes: ["highlighted-line"] }));
    } catch {}
    return undefined;
}

const context = createContext<Highlighter | null>(null);

export const useShiki = () => useContext(context);

export const Shiki = (props: React.PropsWithChildren) => {
    const [shiki, setShiki] = useState<Highlighter | null>(null);
    useEffect(() => {
        (async () => {
            const highlighter = await getHighlighter({ theme: "one-dark-pro", langs: langs });
            setShiki(highlighter);
        })();
    }, []);
    return <context.Provider value={shiki}>{props.children}</context.Provider>;
};

export const Markdown = (props: { title: string }) => {
    const [content, setContent] = useState("");
    const shiki = useShiki();
    const plugins: any[] = shiki ? [remarkGfm, [remarkShiki, { highlighter: shiki }]] : [remarkGfm];

    useEffect(() => {
        (async () => {
            const file = await fetch(`/docs/${props.title}.md`);
            setContent(await file.text());
        })();
    }, []);

    return (
        <ReactMarkdown
            children={content}
            className="prose prose-indigo w-full max-w-none px-2 lg:prose-xl"
            components={components}
            remarkPlugins={plugins}
        />
    );
};
