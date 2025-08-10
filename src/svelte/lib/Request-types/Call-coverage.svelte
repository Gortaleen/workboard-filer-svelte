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

<div class="col-sm-3">
  <div class="form-group">
    <p>Specialist to Cover</p>
    <Typeahead
      class="form-control"
      placeholder="Last,First"
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

    <input
      type="hidden"
      name="specToCoverName"
      id="specToCoverName"
      value={specToCoverName} />

    <input
      type="text"
      class="form-control input-sm"
      name="specToCoverExt"
      id="specToCoverExt"
      pattern={extPattern}
      placeholder="####"
      bind:value={specToCoverExt} />

    <input type="hidden" name="weCoverage" />
  </div>
</div>
<div class="col-sm-3">
  <div class="form-group">
    <p>Date</p>
    <input type="date" name="date" />
  </div>
  <div class="form-group">
    <p>Coverage Period</p>
    <CoveragePeriod
      bind:this={coveragePeriodComponent}
      name="coveragePeriod"
      value={initialTime} />
  </div>
  <div class="form-group">
    <p>Additional comments or details</p>
    <textarea class="form-control" rows="5" name="comment"></textarea>
  </div>
</div>
<div class="col-sm-3">
  <Modules {modules} bind:selectedModules />
</div>
