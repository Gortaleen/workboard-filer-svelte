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
  let modules = $state();
  let scriptProps: WbScriptProps = $state();
  let activeUserEmail = $state();
  let specialists: StaffMember[] | undefined = $state([]);

  onMount(async () => {
    try {
      // Fetch props first since another call depends on it
      const props = await AppsScript.getScriptProps();
      scriptProps = props;

      activeUserEmail = await AppsScript.getActiveUserEmail();
      activeUser = (await getUserDetails(activeUserEmail)) as User;

      const [moduleData, specialistData] = await Promise.all([
        AppsScript.getModules(props.workboardSheetId),
        AppsScript.getSpecialistArr(),
      ]);

      modules = moduleData;
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

{#if specialists && activeUser && scriptProps && modules}
  <EnterRequests
    {specialists}
    {activeUser}
    workboardSheetId={scriptProps.workboardSheetId}
    {modules} />
{/if}
