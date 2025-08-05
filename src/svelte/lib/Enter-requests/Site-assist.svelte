<script lang="ts">
  import type { StaffMember, User } from "workboard";
  import Modules from "./../Modules.svelte";
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
  <p>Site(s)</p>
  <ol class="list-unstyled">
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="sitemnemonic"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="sitemnemonic"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="sitemnemonic"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="sitemnemonic"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
    <li>
      <input
        type="text"
        class="form-control input-sm"
        name="sitemnemonic"
        placeholder="site mnemonic"
        pattern={"[A-Za-z]*"} />
    </li>
  </ol>
</div>

<div class="col-sm-3">
  <Modules />
</div>
