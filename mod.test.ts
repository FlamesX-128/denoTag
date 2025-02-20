import { render } from "https://deno.land/x/denotag@0.2.0/mod.ts";

const html = Deno.readTextFileSync(
    new URL("assets/main.html", import.meta.url)
);

console.log(
    await render(html, {
        params: {
            timestamp: Date.now()
        }
    })
)
