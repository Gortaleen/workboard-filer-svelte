<!----------------------------------- Code ------------------------------------>

<script lang="ts">
  import type { User } from "workboard";
  let { settingsSheet, manager }: { settingsSheet: any; manager: User } =
    $props();
  const supervisor = formatName(settingsSheet[1][2]);

  function formatName(lastCommaFirst) {
    return lastCommaFirst.split(",").reverse().join(" ");
  }
</script>

<!---------------------------------- Markup ----------------------------------->

<div class="container">
  <div class="container text-center">
    <div class="row align-items-start">
      <div class="col">
        <b>Staff:</b>
        <br />
        {supervisor} (supervisor)
        {#each settingsSheet.slice(1) as row}
          {#if row[3]}
            <br />
            {formatName(row[3])}
          {/if}
        {/each}
      </div>
      <div class="col">
        <p>
          <b>Disclaimer:</b>
          The weekend workboard will direct our areas of focus on Fridays and Mondays
          as time and w/e staff availability allow. IF you have something that MUST
          be reviewed please follow the OHS transition guidelines and or speak directly
          with {supervisor} or {manager.name.fullName}.
        </p>
      </div>
    </div>
  </div>
</div>

<!--------------------------------- Styling ----------------------------------->

<style>
</style>
