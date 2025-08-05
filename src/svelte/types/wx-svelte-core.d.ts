// https://docs.svar.dev/svelte/core/category/api/

declare module "wx-svelte-core" {
  import type { SvelteComponent } from "svelte";
  // https://docs.svar.dev/svelte/core/pager/api/
  export class Pager extends SvelteComponent<{
    pageSize?: number;
    total?: number;
    value?: number;
    onchange?: unknown;
  }> {}

  export class Material extends SvelteComponent {}
}
