<script lang="ts">
  import type { StaffMember } from "workboard";
  import Modules from "./../Modules.svelte";
  import Typeahead from "svelte-typeahead";
  import CoveragePeriod from "../Coverage-period.svelte";

  let {
    specialists,
    modules,
    selectedModules = $bindable(),
    coveragePeriodComponent = $bindable(),
    initialTime,
  }: {
    specialists: StaffMember[];
    modules: unknown;
    selectedModules: unknown;
    coveragePeriodComponent: unknown;
    initialTime: string;
  } = $props();

  let specToCoverName: string = $state();
  let specToCoverExt: string = $state();
  const extPattern = "^\\d{4}$";
</script>

<div class="col-md-6">
  <fieldset class="border rounded-3 p-4 h-100">
    <legend class="h5 fw-semibold text-primary px-2 float-none w-auto">
      Coverage Details
    </legend>
    <div class="mb-3">
      <label for="specToCoverName" class="form-label">
        Specialist to Cover
      </label>
      <Typeahead
        class="form-control"
        placeholder="Last, First"
        hideLabel
        data={specialists}
        extract={(mbr) => mbr.name}
        limit={10}
        id="specToCoverName"
        bind:value={specToCoverName}
        on:select={(e) => {
          // Set the extension when a specialist is selected
          if (e.detail.original) {
            specToCoverExt = e.detail.original.ext;
          } else {
            // Clear the extension if the input is cleared
            specToCoverExt = undefined;
          }
        }}
        let:result>
        {@html result.string}
      </Typeahead>
    </div>
    <div class="mb-3">
      <label for="specToCoverExt" class="form-label">Extension</label>
      <input
        type="hidden"
        name="specToCoverName"
        id="specToCoverName"
        value={specToCoverName} />
      <input
        type="text"
        class="form-control"
        name="specToCoverExt"
        id="specToCoverExt"
        pattern={extPattern}
        placeholder="####"
        bind:value={specToCoverExt} />
      <input type="hidden" name="weCoverage" />
    </div>
    <div class="mb-3">
      <label for="requestDate" class="form-label">Date</label>
      <input type="date" class="form-control" id="requestDate" name="date" />
    </div>
    <div>
      <CoveragePeriod
        bind:this={coveragePeriodComponent}
        name="coveragePeriod"
        value={initialTime} />
    </div>
  </fieldset>
</div>

<div class="col-md-6 d-flex flex-column">
  <Modules {modules} bind:selectedModules />
  <div class="flex-grow-1 d-flex flex-column">
    <label for="comment" class="form-label">Comments</label>
    <!-- prettier-ignore -->
    <textarea
      class="form-control flex-grow-1"
      id="comment"
      name="comment"
      rows="5" placeholder="Provide any other relevant details..."></textarea>
  </div>
</div>

<style>
  :global([data-svelte-typeahead]) {
    width: 100% !important;
  }
</style>
