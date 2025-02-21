# Deno Tag

A simple HTML preprocessor for Deno.

## Example

```ts, deno@2.2.0
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
```

```html
<!-- You can use <deno>, <script type="application/typescript">, or a custom query by adjusting the configuration. -->
<body>
    <p>
        The value of the fibonacci sequence is:
        <script type="application/typescript">
            function fibonacci(n: number): number {
                if (n <= 1) {
                    return n;
                }
                return fibonacci(n - 1) + fibonacci(n - 2);
            }
    
            return fibonacci(20);
        </script>
    </p>

    <deno>
        return Date.now() - params.timestamp;
    </deno>
</body>
```

```html
<!-- When evaluated, it becomes into this -->
<body>
    <p>
        The value of the fibonacci sequence is:
        6765
    </p>

    13
</body>
```
