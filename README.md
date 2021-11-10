# **Deno Tag**
A simple html preprocessor for deno.

## **Change Log:**
This is the list of changes:
- 0.0.1 - first release:
  + Deno tag:
    ```html
      <deno>
        console.log("Hello Deno!");
      </deno>
    ```
  + write: This is a function that adds something to the html.

### **Examples:**
Example One:
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

Result:
```html
<body>
  Hello world
</body>
```

Example Two:
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

Result:
```html
<body>
  orange
  apple
</body>
```

#### **Information:**
Deno tag only accepts JS, tested with:
  - deno 1.14.3 (release, x86_64-unknown-linux-gnu)

  - v8 9.4.146.19

  - typescript 4.4.2
