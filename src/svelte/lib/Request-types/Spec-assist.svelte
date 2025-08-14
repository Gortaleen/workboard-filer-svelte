<script lang="ts">
  import { Spinner } from "@sveltestrap/sveltestrap";
  import Typeahead from "svelte-typeahead";
  import type { StaffMember, User } from "workboard";
  import Contact from "../Contact.svelte";

  let {
    specialists,
    activeUser,
    modules,
  }: {
    specialists: StaffMember[];
    activeUser: User;
    modules: any;
  } = $props();
  let specs = $state([]);
  let nextId = 0;

  $effect(() => {
    if (specs.length === 0) {
      specs = [{ id: nextId++, name: "" }];
    } else {
      // If specialists are passed in, ensure our nextId is higher than any existing ID.
      nextId = Math.max(...specs.map((s) => s.id)) + 1;
    }
  });
  function addSpec() {
    // Svelte's reactivity is triggered by assignment.
    // This creates a new array with the new item appended.
    specs = [...specs, { id: nextId++, mnemonic: "" }];
  }
  function removeSpec(idToRemove: number) {
    // A specialist can only be removed if there is more than one.
    if (specs.length <= 1) return;

    // Filter out the specialist with the matching ID and assign the new array.
    specs = specs.filter((spec) => spec.id !== idToRemove);
  }
</script>

<div class="col-md-5">
  <Contact {specialists} {activeUser} />
</div>

<div class="col-md-7">
  <fieldset class="border rounded-3 p-3 h-100">
    <legend class="h6 fw-semibold text-primary px-2 float-none w-auto">
      Specialist Assistance
    </legend>

    <div id="specialist-list">
      {#each specs as spec (spec.id)}
        <div class="input-group mb-2">
          <div data-svelte-typeahead class="flex-grow-1">
            <Typeahead
              class="form-control"
              label={"Who/Module"}
              hideLabel
              data={specialists}
              extract={(mbr) => mbr.name}
              limit={10}
              bind:value={spec.name}
              placeholder="Last, First"
              let:result
              let:index>
              {@html result.string}
            </Typeahead>

            <input
              type="hidden"
              name={"specialistName" + spec.id}
              value={spec.name} />
          </div>
          <select
            class="form-select"
            name="specialistApp0"
            aria-label="Application"
            style="max-width: 120px;">
            <option value="">...</option>
            {#each modules as module}
              <option value={module}>{module}</option>
            {/each}
          </select>
          <button
            class="btn btn-outline-danger"
            type="button"
            aria-label="Remove Specialist"
            onclick={() => removeSpec(spec.id)}>
            <i class="bi bi-trash"></i>
          </button>
        </div>
      {/each}
    </div>

    <button
      type="button"
      class="btn btn-outline-secondary btn-sm mt-2"
      onclick={addSpec}>
      <i class="bi bi-plus-lg"></i>
      Add Specialist
    </button>
  </fieldset>
</div>

<div class="row mt-4">
  <div class="col-12">
    <label for="comment-textarea" class="form-label fw-semibold">
      Additional comments or details
    </label>
    <!-- prettier-ignore -->
    <textarea
      class="form-control"
      id="comment-textarea"
      name="comment"
      rows="4"></textarea>
  </div>
</div>
