<script lang="ts">
  import { Spinner } from "@sveltestrap/sveltestrap";
  import Typeahead from "svelte-typeahead";
  import type { StaffMember, User } from "workboard";
  import Contact from "./Contact.svelte";

  let {
    specialists,
    activeUser,
  }: {
    specialists: StaffMember[];
    activeUser: User;
  } = $props();
</script>

<div class="col-sm-3">
  <Contact {specialists} {activeUser} />
</div>
<div class="col-sm-3">
  <p>Who/Application</p>
  {#if specialists}
    {#each Array.from({ length: 7 }) as _elt, i}
      <div style="white-space: nowrap;">
        <Typeahead
          class="form-control"
          label={"Who/Module"}
          name={"spec-assist_" + i}
          hideLabel
          data={specialists}
          extract={(mbr) => mbr.name}
          limit={10}
          placeholder="First Last"
          let:result
          let:index>
          {@html result.string}
        </Typeahead>
        <select name={"spec-assistt_" + i}>
          <option value=""></option>
          ABS
          <option value="adm">ADM</option>
          <option value="amb">AMB</option>
          <option value="bar">BAR</option>
          <option value="its">ITS</option>
          <option value="lab">LAB</option>
          <option value="mis">MIS</option>
          <option value="nmi">NMI</option>
          <option value="sca">SCA</option>
        </select>
      </div>
    {/each}
  {:else}
    <Spinner type="border" color="primary" />
  {/if}
</div>
<div class="col-sm-3">
  <div class="form-group">
    <p>Additional comments or details</p>
    <textarea class="form-control" rows="5" name="comment"></textarea>
  </div>
</div>
