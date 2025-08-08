<script lang="ts">
  import type { StaffMember, User } from "workboard";
  import Contact from "../Contact.svelte";

  let {
    specialists,
    activeUser,
    modules,
    casePeArr,
  }: {
    specialists: StaffMember[];
    activeUser: User;
    modules: any;
    casePeArr: any;
  } = $props();
  // Reactive array to store input and select values
  // let testItems = Array.from({ length: 7 }, () => ({
  //   case: "",
  //   module: "",
  // }));
</script>

<div class="col-sm-3">
  <Contact {specialists} {activeUser} />
</div>
<div class="col-sm-3" id="col2">
  <p>Testing</p>
  <div class="radio">
    <label>
      <input type="radio" name="testType" value="general" checked />
      General
    </label>
  </div>
  <div class="radio">
    <label>
      <input type="radio" name="testType" value="pe" />
      Priority Event
    </label>
  </div>
</div>
<div class="col-sm-3">
  <p>Cases/Applications</p>
  {#each casePeArr as item, i}
    <div style="white-space: nowrap;">
      <input
        type="text"
        class="form-control input-sm no-wrap"
        name={"testItem" + i}
        placeholder="Case or PE #"
        bind:value={item.case} />
      <select name={"testItemMod" + i} bind:value={item.module}>
        <option value=""></option>
        {#each modules as module}
          <option value={module}>
            {module}
          </option>
        {/each}
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
