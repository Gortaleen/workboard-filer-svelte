<script lang="ts">
  import type { StaffMember, User } from "workboard";
  import Contact from "./Contact.svelte";

  let {
    specialists,
    activeUser,
  }: {
    specialists: StaffMember[];
    activeUser: User;
  } = $props();
  const userExt = activeUser.phones[0].value.slice(-4);
  const casePattern = "^[0-9]{(7, 9)}$";
</script>

<div class="col-sm-3">
  <Contact {specialists} {activeUser} />
</div>
<div class="col-sm-3" id="col2">
  <p>Testing</p>
  <div class="radio">
    <label>
      <input type="radio" name="testtype" value="general" />
      General
    </label>
  </div>
  <div class="radio">
    <label>
      <input type="radio" name="testtype" value="pe" />
      Priority Event
    </label>
  </div>
</div>
<div class="col-sm-3">
  <p>Cases/Applications</p>
  {#each Array.from({ length: 7 }) as _elt, i}
    <div style="white-space: nowrap;">
      <input
        type="text"
        class="form-control input-sm no-wrap"
        name={"test-item_" + i}
        maxlength="9"
        placeholder="Case #"
        pattern={casePattern} />
      <select name={"test-item-mod_" + i}>
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
</div>

<style>
  .no-wrap {
    width: 10em;
    display: inline-block;
  }
</style>
