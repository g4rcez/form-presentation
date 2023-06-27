type Polymorphism<T extends React.ElementType> = React.PropsWithChildren<{ as?: T }>;

type Props<T extends React.ElementType> = Polymorphism<T> & Omit<React.ComponentPropsWithRef<T>, keyof Polymorphism<T>>;

export const Anchor = <AS extends React.ElementType = "a">({ as, ...props }: Props<AS>) => {
    const Component = as || "a";
    return (
        <Component
            {...props}
            className={`inline border-b border-transparent bg-gradient-to-r from-indigo-400 to-violet-500 bg-clip-text font-extrabold tracking-wide text-transparent transition-colors duration-300 link:border-b-indigo-400 ${
                props.className ?? ""
            }`}
        />
    );
};
