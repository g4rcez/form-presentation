import React, { useEffect } from "react";
import { Link, useHref, usePage } from "brouther";
import { router } from "./router.tsx";
import { Anchor } from "./components/anchor.tsx";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { shortcutKeys } from "./lib/shortcuts.ts";

const slides = router.config.routes.map((x) => ({ path: x.originalPath }));

const getSlides = (href: string) => {
    const current = slides.findIndex((x) => x.path === href);
    const previous = slides[current - 1];
    const next = slides[current + 1];
    return { current, previous, next };
};

const Arrow = (props: { item: { path: string }; Arrow: React.FC<any> }) => (
    <nav className="flex min-h-full grow items-center justify-center px-4 w-20">
        {props.item ? (
            <Link href={props.item.path} className="text-2xl opacity-20">
                <props.Arrow width={64} height={64} />
            </Link>
        ) : (
            <div />
        )}
    </nav>
);

export const Layout = (props: React.PropsWithChildren) => {
    const href = useHref();
    const { next, previous } = getSlides(href);

    useEffect(() => {
        const s = shortcutKeys(window);
        s.add(
            "control+h",
            () => {
                const slides = getSlides(window.location.pathname);
                if (slides.previous) router.navigation.push(slides.previous.path);
            },
            { multiPlatform: false }
        );
        s.add(
            "control+l",
            () => {
                const slides = getSlides(window.location.pathname);
                if (slides.next) router.navigation.push(slides.next.path);
            },
            { multiPlatform: false }
        );
        return () => s.removeAll();
    }, []);

    return (
        <div className="flex min-h-screen w-full flex-col">
            {href === "/" ? (
                <header className="container mx-auto mb-8 text-center">
                    <h1 className="text-3xl font-extrabold">
                        Formulários sem estresse - por{" "}
                        <Anchor target="_blank" href="https://garcez.dev">
                            Allan Garcez
                        </Anchor>
                    </h1>
                </header>
            ) : null}
            <div className="h-full min-h-full w-full grid grid-cols-12 flex-row gap-12 container mx-auto">
                <Arrow item={previous} Arrow={ChevronLeftIcon} />
                <main className="w-full col-span-10 py-12">{props.children}</main>
                <Arrow item={next} Arrow={ChevronRightIcon} />
            </div>
        </div>
    );
};

export const App = () => {
    const page = usePage();
    return <Layout>{page}</Layout>;
};
