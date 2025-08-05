<script lang="ts">
  // import { parseContext } from "./lib/parseContext";
  // let contextString = `<? context ?>`;
  import { AppsScript } from "./gasApi";
  import { onMount } from "svelte";
  // my code here
  import Home from "./lib/Home.svelte";
  import Navigator from "./lib/Navigator.svelte";
  import EnterRequests from "./lib/Enter-requests.svelte";
  import ViewRequests from "./lib/View-requests.svelte";
  import type { StaffMember, WbScriptProps, User } from "workboard";
  import { getUserDetails } from "./mock/mockApi";

  let activeUser: User = $state();
  let settingsSheet = $state();
  let modulesSheet = $state();
  let editorsSheet = $state();
  let scriptProps: WbScriptProps = $state();
  let page = $state("Home");
  let currentSheetData: unknown[][] = $state([]);
  let activeUserEmail = $state();
  let supervisor: User = $state();
  let manager: User = $state();
  let specialists: StaffMember[] | undefined = $state([]);

  function changePage(newPage: string) {
    page = newPage;
  }

  async function getManager(supervisor: User) {
    const mgrEmail = supervisor.relations.find(
      (rel) => rel.type === "manager",
    ).value;
    const mgrObj = await AppsScript.getUserDetails(mgrEmail);

    return mgrObj as User;
  }

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

      [currentSheetData, settingsSheet, modulesSheet, editorsSheet] = data;
      supervisor = (await getUserDetails(settingsSheet[1][1])) as User;
      manager = (await getManager(supervisor)) as User;
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

<Navigator {changePage} vrNotReady={!currentSheetData} currentPage={page} />

{#if page === "Home" && settingsSheet && manager}
  <Home {settingsSheet} {manager} />
{:else if page === "Enter-requests" && specialists && activeUser && scriptProps}
  <EnterRequests
    {changePage}
    {specialists}
    {activeUser}
    workboardSheetId={scriptProps.workboardSheetId}
    {modulesSheet}
    bind:currentSheetData />
{:else if page === "View-requests" && currentSheetData && activeUser && scriptProps}
  <ViewRequests bind:currentSheetData {activeUser} {scriptProps} />
{/if}
