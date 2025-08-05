<script lang="ts">
  // import { parseContext } from "./lib/parseContext";
  // let contextString = `<? context ?>`;
  import { AppsScript } from "./gasApi";
  import { onMount } from "svelte";
  // my code here
  import EnterRequests from "./lib/Enter-requests.svelte";
  import type { StaffMember, WbScriptProps, User } from "workboard";
  import { getUserDetails } from "./mock/mockApi";

  let activeUser: User = $state();
  let settingsSheet = $state();
  let modulesSheet = $state();
  let scriptProps: WbScriptProps = $state();
  let page = $state("Home");
  let currentSheetData: unknown[][] = $state([]);
  let activeUserEmail = $state();
  let supervisor: User = $state();
  let specialists: StaffMember[] | undefined = $state([]);

  onMount(async () => {
    try {
      // Fetch props first since another call depends on it
      const props = await AppsScript.getScriptProps();
      scriptProps = props;

      activeUserEmail = await AppsScript.getActiveUserEmail();
      activeUser = (await getUserDetails(activeUserEmail)) as User;

      const [data, specialistData] = await Promise.all([
        AppsScript.getSpreadsheetData(props.workboardSheetId),
        AppsScript.getSpecialistArr(),
      ]);

      [currentSheetData, settingsSheet, modulesSheet] = data;
      supervisor = (await getUserDetails(settingsSheet[1][1])) as User;
      specialists = specialistData.map((mbr) => ({
        name: mbr[0],
        email: mbr[1],
        ext: mbr[2],
      }));
    } catch (e) {
      console.error(e);
      // error = (e as Error).message;
    }
  });
</script>

{#if specialists && activeUser && scriptProps}
  <EnterRequests
    {specialists}
    {activeUser}
    workboardSheetId={scriptProps.workboardSheetId}
    {modulesSheet}
    bind:currentSheetData />
{/if}
