<script lang="ts">
  import type { StaffMember, User } from "workboard";
  import Modules from "./../Modules.svelte";
  import Contact from "../Contact.svelte";

  let {
    specialists,
    activeUser,
    modules,
    selectedModules = $bindable(),
  }: {
    specialists: StaffMember[];
    activeUser: User;
    modules: unknown;
    selectedModules: unknown;
  } = $props();
  let sites = $state([]);
  let nextId = 0;

  $effect(() => {
    if (sites.length === 0) {
      sites = [{ id: nextId++, mnemonic: "" }];
    } else {
      // If sites are passed in, ensure our nextId is higher than any existing ID.
      nextId = Math.max(...sites.map((s) => s.id)) + 1;
    }
  });
  function addSite() {
    // Svelte's reactivity is triggered by assignment.
    // This creates a new array with the new item appended.
    sites = [...sites, { id: nextId++, mnemonic: "" }];
  }
  function removeSite(idToRemove: number) {
    // A site can only be removed if there is more than one.
    if (sites.length <= 1) return;

    // Filter out the site with the matching ID and assign the new array.
    sites = sites.filter((site) => site.id !== idToRemove);
  }
</script>

<div class="col-md-6">
  <Contact {specialists} {activeUser} />
</div>

<div class="col-md-6">
  <label class="form-label fw-semibold mb-0" for="siteMnemonic0">Site(s)</label>
  <div id="site-list">
    {#each sites as site (site.id)}
      <div class="input-group mb-2">
        <input
          type="text"
          class="form-control"
          name={"siteMnemonic" + site.id}
          placeholder="site mnemonic"
          pattern="[A-Za-z0-9]*"
          aria-label="Site Mnemonic"
          bind:value={site.mnemonic} />
        <button
          class="btn btn-outline-danger"
          type="button"
          aria-label="Remove Site"
          onclick={() => removeSite(site.id)}
          disabled={sites.length <= 1}>
          <i class="bi bi-trash"></i>
        </button>
      </div>
    {/each}
  </div>
  <button
    type="button"
    class="btn btn-outline-secondary btn-sm mt-2"
    onclick={addSite}>
    <i class="bi bi-plus-lg"></i>
    Add Site
  </button>
</div>

<div class="col-12">
  <Modules {modules} bind:selectedModules />
</div>
