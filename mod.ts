import { parse } from "npm:node-html-parser@7.0.1";

interface Config<T> {
    querySelector?: string;
    params?: T;
}

async function tseval(code: string): Promise<(params: unknown) => Promise<unknown>> {
    const b64 = btoa(code);
    const module = (
        await import(`data:application/typescript;base64,${b64}`)
    );

    return module.default;
}

async function evaluateValue(item: unknown): Promise<string> {
    if (!item) {
        return "";
    }

    if (typeof item === "function") {
        return evaluateValue(await item());
    }

    if (typeof item === "object") {
        const evaluatedObject: Record<string, unknown> = {};

        await Promise.all(
            Object.entries(item).map(async ([key, val]) => {
                evaluatedObject[key] = await evaluateValue(val);
            })
        );

        return Object
            .values(evaluatedObject)
            .join('');
    }

    return String(item);
}

async function render<T>(code: string, config: Config<T> = {}): Promise<string> {
    if (!config.querySelector) {
        config.querySelector = 'deno, script[type="application/typescript"]';
    }

    const dom = parse(code);
    const scripts = dom
        .querySelectorAll(config.querySelector);

    for (const script of scripts) {
        try {
            const init = await tseval(`
                export default async function(params) {
                    ${script.text}
                }
            `);

            const result = await evaluateValue(
                await init(config.params)
            );

            script.replaceWith(result);
        } catch (error) {
            script.replaceWith(`<!-- ${error} -->`);
        }
    }

    return dom.toString();
}

export {
    render,
}

export type {
    Config
}
