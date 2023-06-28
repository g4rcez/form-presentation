enum Key {
    Shift = "shift",
    Control = "control",
    Command = "cmd",
    Alt = "alt",
    Space = " ",
    Enter = "enter",
}

export type ShortcutOptions = {
    prevent: boolean;
    multiPlatform: boolean;
    description: string;
    eventType: keyof WindowEventMap;
};

export type Undef<T> = undefined | T;

export type BrowserOptions = Partial<{
    capture: Undef<boolean>;
    once: Undef<boolean>;
    passive: Undef<boolean>;
    signal: Undef<AbortSignal>;
}>;

export type ShortcutValue = {
    options: Partial<ShortcutOptions>;
    nativeOptions: BrowserOptions;
    target: EventListener;
};

const excludes: string[] = [Key.Control, Key.Shift, Key.Alt];

export const shortcutKeys = (element: HTMLElement | Window) => {
    const shortcutMap: Record<string, ShortcutValue> = {};

    const hasKey = <T, K extends keyof T>(obj: T, key: K) => Object.prototype.hasOwnProperty.call(obj, key);

    const incrementUserAction = (e: KeyboardEvent, options: Partial<ShortcutOptions>) => {
        const key = e.key.toLowerCase();
        let keys = [];
        if ((e.ctrlKey || e.shiftKey || e.altKey) && excludes.includes(key)) {
            return;
        }
        if (options.multiPlatform && (e.ctrlKey || e.metaKey)) keys.push(Key.Control);
        else if (e.ctrlKey) keys.push(Key.Control);
        else if (e.metaKey) keys.push(Key.Command);
        if (e.shiftKey) keys.push(Key.Shift);
        if (e.altKey) keys.push(Key.Alt);
        if (key === Key.Space) keys.push("space");
        if (key === Key.Enter) keys.push(Key.Enter);
        if (key) keys.push(key);
        keys = keys.map((key) => key.trim()).filter(Boolean);
        const concatKeys = keys.join("+");
        const eventFound = shortcutMap[concatKeys];
        if (eventFound && options.prevent) e.preventDefault();
        return concatKeys;
    };

    const defaultOptions: ShortcutOptions = {
        description: "",
        multiPlatform: true,
        prevent: true,
        eventType: "keydown",
    };

    const defaultNativeOptions: BrowserOptions = {
        capture: undefined,
        once: undefined,
        passive: undefined,
        signal: undefined,
    };

    const add = (
        shortcut: string | string[],
        handler: (ev: KeyboardEvent) => any,
        options: Partial<ShortcutOptions> = defaultOptions,
        nativeOptions: BrowserOptions = defaultNativeOptions
    ): void => {
        const concatOptions = { ...defaultOptions, ...options };
        const concatNativeOptions = { ...defaultOptions, ...nativeOptions };
        const shortcuts = Array.isArray(shortcut) ? shortcut : [shortcut];
        shortcuts.forEach((shortcutItem) => {
            const key = shortcutItem.toLowerCase().trim();
            const target = (e: KeyboardEvent) =>
                incrementUserAction(e as KeyboardEvent, options) === key ? handler(e as KeyboardEvent) : undefined;
            shortcutMap[key] = { nativeOptions: concatNativeOptions, options: concatOptions, target: target as any };
            element.addEventListener(concatOptions.eventType, target as any, concatNativeOptions);
        });
    };

    const removeAll = () =>
        Object.entries(shortcutMap).forEach(([_, { target, options, nativeOptions }]) => {
            element.removeEventListener(options.eventType as any, target, nativeOptions);
        });

    const remove = (shortcut: string): void => {
        if (shortcut === "all") return removeAll();
        if (!hasKey(shortcutMap, shortcut)) return;
        return element.removeEventListener(
            shortcutMap[shortcut].options.eventType as any,
            shortcutMap[shortcut].target
        );
    };

    const list = () => ({ ...shortcutMap });

    return { removeAll, add, remove, list };
};
