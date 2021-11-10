# **Deno Tag**
A simple html preprocessor for deno.

## **ChangeLog**
`0.0.2` - Bug in await fixed:
  - Fixed a bug that did not allow use of await.

`0.0.1` - First release:
  + This is the first version!

---

## **Examples**

`Example One:`

```ts
// main.ts
import render from "https://deno.land/x/denotag/mod.ts";

(async function main() {
  const res = await render("./main.html");
  
  console.log(res);
})();
```

```html
<!-- main.html -->
<body>
  <deno>
    // This is a standard function that adds something to the html.
    Write("Hello world");
  </deno>
</body>
```

`Result:`

```html
<body>
  Hello world
</body>
```

---

`Example Two:`

```ts
// main.ts
import render from "https://deno.land/x/denotag/mod.ts";

(async function main() {
  const res = await render("./main.html");
  
  console.log(res);
})();
```

```html
<!-- main.html -->
<body>
  <deno>
    for (const txt of ["orange", "apple"]) {
      write(txt);
    }
  </deno>
</body>
```

`Result:`

```html
<body>
  orange
  apple
</body>
```

---

## **Information:**
Deno tag only accepts JS, tested with:
  - deno 1.14.3 (release, x86_64-unknown-linux-gnu)

  - v8 9.4.146.19

  - typescript 4.4.2
