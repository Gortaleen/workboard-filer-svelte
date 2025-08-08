<script>
  import { Spinner } from "@sveltestrap/sveltestrap";

  let { modules, selectedModules = $bindable() } = $props();
</script>

<p>Application(s)</p>
<div class="checkbox">
  {#if modules}
    {#each modules as module, i}
      <label class="checkbox-inline-start">
        <input
          type="checkbox"
          id={"module" + i}
          name="module"
          bind:group={selectedModules}
          value={module[0]} />
        <label for={"module" + i}>{module[0]}</label>
      </label>
      {#if i > 0 && i % 3 === 0}
        <br />
      {/if}
    {/each}
  {:else}
    Loading modules...
    <Spinner type="border" color="primary" />
  {/if}
</div>

<style></style>
