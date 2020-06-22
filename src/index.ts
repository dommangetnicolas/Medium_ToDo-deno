import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";

const port = 3000;
const app = new Application();

app.use(router.routes());

await app.listen({ port });
