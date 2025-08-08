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
  let specialistName0 = $state("");
  let specialistName1 = $state("");
  let specialistName2 = $state("");
  let specialistName3 = $state("");
  let specialistName4 = $state("");
  let specialistName5 = $state("");
  let specialistName6 = $state("");
</script>

<div class="col-sm-3">
  <Contact {specialists} {activeUser} />
</div>
<div class="col-sm-3">
  <p>Who/Application</p>
  <div style="white-space: nowrap;">
    <Typeahead
      class="form-control"
      label={"Who/Module"}
      hideLabel
      data={specialists}
      extract={(mbr) => mbr.name}
      limit={10}
      bind:value={specialistName0}
      placeholder="Last,First"
      let:result
      let:index>
      {@html result.string}
    </Typeahead>

    <input type="hidden" name="specialistName0" value={specialistName0} />

    <select name="specialistApp0">
      <option value=""></option>
      {#each modules as module}
        <option value={module}>{module}</option>
      {/each}
    </select>
  </div>

  <div style="white-space: nowrap;">
    <Typeahead
      class="form-control"
      label={"Who/Module"}
      hideLabel
      data={specialists}
      extract={(mbr) => mbr.name}
      limit={10}
      bind:value={specialistName1}
      placeholder="Last,First"
      let:result
      let:index>
      {@html result.string}
    </Typeahead>

    <input type="hidden" name="specialistName1" value={specialistName1} />

    <select name="specialistApp1">
      <option value=""></option>
      {#each modules as module}
        <option value={module}>{module}</option>
      {/each}
    </select>
  </div>

  <div style="white-space: nowrap;">
    <Typeahead
      class="form-control"
      label={"Who/Module"}
      hideLabel
      data={specialists}
      extract={(mbr) => mbr.name}
      limit={10}
      bind:value={specialistName2}
      placeholder="Last,First"
      let:result
      let:index>
      {@html result.string}
    </Typeahead>

    <input type="hidden" name="specialistName2" value={specialistName2} />

    <select name="specialistApp2">
      <option value=""></option>
      {#each modules as module}
        <option value={module}>{module}</option>
      {/each}
    </select>
  </div>

  <div style="white-space: nowrap;">
    <Typeahead
      class="form-control"
      label={"Who/Module"}
      hideLabel
      data={specialists}
      extract={(mbr) => mbr.name}
      limit={10}
      bind:value={specialistName3}
      placeholder="Last,First"
      let:result
      let:index>
      {@html result.string}
    </Typeahead>

    <input type="hidden" name="specialistName3" value={specialistName3} />

    <select name="specialistApp3">
      <option value=""></option>
      {#each modules as module}
        <option value={module}>{module}</option>
      {/each}
    </select>
  </div>

  <div style="white-space: nowrap;">
    <Typeahead
      class="form-control"
      label={"Who/Module"}
      hideLabel
      data={specialists}
      extract={(mbr) => mbr.name}
      limit={10}
      bind:value={specialistName4}
      placeholder="Last,First"
      let:result
      let:index>
      {@html result.string}
    </Typeahead>

    <input type="hidden" name="specialistName4" value={specialistName4} />

    <select name="specialistApp4">
      <option value=""></option>
      {#each modules as module}
        <option value={module}>{module}</option>
      {/each}
    </select>
  </div>

  <div style="white-space: nowrap;">
    <Typeahead
      class="form-control"
      label={"Who/Module"}
      hideLabel
      data={specialists}
      extract={(mbr) => mbr.name}
      limit={10}
      bind:value={specialistName5}
      placeholder="Last,First"
      let:result
      let:index>
      {@html result.string}
    </Typeahead>

    <input type="hidden" name="specialistName5" value={specialistName5} />

    <select name="specialistApp5">
      <option value=""></option>
      {#each modules as module}
        <option value={module}>{module}</option>
      {/each}
    </select>
  </div>

  <div style="white-space: nowrap;">
    <Typeahead
      class="form-control"
      label={"Who/Module"}
      hideLabel
      data={specialists}
      extract={(mbr) => mbr.name}
      limit={10}
      bind:value={specialistName6}
      placeholder="Last,First"
      let:result
      let:index>
      {@html result.string}
    </Typeahead>

    <input type="hidden" name="specialistName6" value={specialistName6} />

    <select name="specialistApp6">
      <option value=""></option>
      {#each modules as module}
        <option value={module}>{module}</option>
      {/each}
    </select>
  </div>
</div>
<div class="col-sm-3">
  <div class="form-group">
    <p>Additional comments or details</p>
    <textarea class="form-control" rows="5" name="comment"></textarea>
  </div>
</div>
