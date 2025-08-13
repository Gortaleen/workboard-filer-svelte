<script>
  import { Spinner } from "@sveltestrap/sveltestrap";

  let { modules, selectedModules = $bindable() } = $props();
</script>

<fieldset class="border rounded-3 p-4 mb-4">
  <legend class="h5 fw-semibold text-primary px-2 float-none w-auto">
    Application(s)
  </legend>

  {#if !modules}
    <div
      class="d-flex justify-content-center align-items-center"
      style="height: 100px;">
      <Spinner size="50" color="#0d6efd" />
    </div>
  {:else if modules.length === 0}
    <p class="text-muted mb-0">No modules available.</p>
  {/if}
  <div class="row">
    {#each modules as module, i}
      <div class="col-6 col-sm-4">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            id={"module" + i}
            name="module"
            bind:group={selectedModules}
            value={module[0]} />
          <label class="form-check-label" for={"module" + i}>{module[0]}</label>
        </div>
      </div>
    {/each}
  </div>
</fieldset>
