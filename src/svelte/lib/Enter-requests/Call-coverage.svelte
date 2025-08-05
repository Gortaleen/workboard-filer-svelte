<script lang="ts">
  import type { StaffMember } from "workboard";
  import Modules from "./../Modules.svelte";
  import Typeahead from "svelte-typeahead";
  import { Spinner } from "@sveltestrap/sveltestrap";

  let {
    specialists,
    modulesSheet,
    selectedModules = $bindable(),
  }: {
    specialists: StaffMember[];
    modulesSheet: unknown;
    selectedModules: unknown;
  } = $props();

  let specToCoverName: string = $state();
  let specToCoverExt: string = $state();
  const extPattern = "^\\d{4}$";
</script>

<div class="col-sm-3">
  <div class="form-group">
    <p>Specialist to Cover</p>
    {#if specialists}
      <Typeahead
        class="form-control"
        placeholder="First Last"
        hideLabel
        data={specialists}
        extract={(mbr) => mbr.name}
        limit={10}
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
    {:else}
      <Spinner type="border" color="primary" />
    {/if}

    <input type="hidden" name="specToCover" id="specToCoverName" value={specToCoverName} />

    <input
      type="text"
      class="form-control input-sm"
      name="specToCoverExt"
      id="specToCoverExt"
      pattern={extPattern}
      placeholder="####"
      bind:value={specToCoverExt} />

      <input type="hidden" name="weCoverage">
  </div>
</div>
<div class="col-sm-3">
  <div class="form-group">
    <p>Date</p>
    <input type="date" name="date" />
  </div>
  <div class="form-group">
    <p>Coverage Period</p>
    <input
      type="text"
      class="form-control input-sm"
      name="coveragePeriod"
      placeholder="Time(s)" />
  </div>
  <div class="form-group">
    <p>Additional comments or details</p>
    <textarea class="form-control" rows="5" name="comment"></textarea>
  </div>
</div>
<div class="col-sm-3">
  <Modules {modulesSheet} bind:selectedModules />
</div>
