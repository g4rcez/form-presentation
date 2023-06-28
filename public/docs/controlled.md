# Controle de estado

- Requer renderização do React
- Permite interatividade via estado
- Facilita a interação entre campos do form
- -DomAPI, [+React](https://react.dev/reference/react-dom/components/textarea#caveats)
- Forma mais utilizada em [NextJS](https://nextjs.org/) e aplicações React

```tsx
const Example = () => {
    const [state, setState] = useState({ name: "", lastName: "" });
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = { user: state };
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
            <button type="submit" className="rounded-lg bg-green-500 px-4 py-1 text-white">
                Submit
            </button>
        </form>
    );
};
```