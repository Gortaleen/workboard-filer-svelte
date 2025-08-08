<script lang="ts">
  import { Spinner } from "@sveltestrap/sveltestrap";
  import Typeahead from "svelte-typeahead";
  import type { StaffMember, User } from "workboard";

  let {
    specialists,
    activeUser,
  }: {
    specialists: StaffMember[];
    activeUser: User;
  } = $props();
  const userExt = activeUser.phones[0]["value"].slice(-4);
  let contactExt = $state(userExt);
  const userName = activeUser.name.familyName + "," + activeUser.name.givenName;
  let contactName: string = $state("");
  const extPattern = "^\\d{4}$";

  contactName = userName;
</script>

<div class="form-group">
  <p>Contact</p>
  {#if specialists}
    <Typeahead
      class="form-control"
      label={"Contact"}
      hideLabel
      data={specialists}
      extract={(mbr) => mbr.name}
      limit={10}
      bind:value={contactName}
      let:result
      let:index
      showDropdownOnFocus={true}>
      {@html result.string}
      {(contactExt = result.original.ext)}
    </Typeahead>
  {:else}
    <Spinner type="border" color="primary" />
  {/if}

  <input type="hidden" name="contactName" bind:value={contactName} />

  <input
    type="text"
    class="form-control input-sm"
    name="contactExt"
    id="contactExt"
    pattern={extPattern}
    placeholder="####"
    value={contactExt} />

  <input type="hidden" name="weCoverage" />
</div>
