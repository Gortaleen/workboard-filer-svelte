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
</script>

<div class="col-sm-3">
  <Contact {specialists} {activeUser} />
</div>
<div class="col-sm-3">
  <p>Site(s)</p>
  <ol class="list-unstyled">
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="siteMnemonic0"
        id="siteMnemonic0"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="siteMnemonic1"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="siteMnemonic2"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="siteMnemonic3"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="siteMnemonic4"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
  </ol>
</div>

<div class="col-sm-3">
  <Modules {modules} bind:selectedModules />
</div>
