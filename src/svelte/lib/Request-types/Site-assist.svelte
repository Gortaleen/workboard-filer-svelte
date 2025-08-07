<script lang="ts">
  import type { StaffMember, User } from "workboard";
  import Modules from "./../Modules.svelte";
  import Contact from "../Contact.svelte";
  import Typeahead from "svelte-typeahead";
  import { Spinner } from "@sveltestrap/sveltestrap";

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
        name="sitemnemonic0"
        id="sitemnemonic0"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="sitemnemonic1"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="sitemnemonic2"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="sitemnemonic3"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="sitemnemonic4"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
  </ol>
</div>

<div class="col-sm-3">
  <Modules {modules} bind:selectedModules />
</div>
