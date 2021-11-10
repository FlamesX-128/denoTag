import { dirname, fromFileUrl, join } from "./deps.test.ts";


import render from "../mod.ts";


(async function main(): Promise<void> {
  const res: string = await render(
    join(dirname(fromFileUrl(import.meta.url)), "main.html")
  );

  console.log(res);
})();