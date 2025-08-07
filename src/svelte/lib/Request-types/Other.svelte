<script lang="ts">
  import type { StaffMember, User } from "workboard";
  import Contact from "../Contact.svelte";

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
<div class="col-sm-4">
  <div class="form-group">
    <p>Additional comments or details</p>
    <textarea class="form-control" rows="5" name="comment"></textarea>
  </div>
</div>
