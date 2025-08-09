<script lang="ts">
  // import { parseContext } from "./lib/parseContext";
  // let contextString = `<? context ?>`;
  import { AppsScript } from "./gasApi";
  import { onMount } from "svelte";
  // my code here
  import EnterRequests from "./lib/Enter-requests.svelte";
  import type { StaffMember, WbScriptProps, User } from "workboard";
  import { getUserDetails } from "./mock/mockApi";
  import { Spinner } from "@sveltestrap/sveltestrap";

  let activeUser: User = $state();
  let modules = $state();
  let scriptProps: WbScriptProps = $state();
  let activeUserEmail = $state();
  let specialists: StaffMember[] | undefined = $state([]);

  onMount(async () => {
    try {
      // 1. Find the loader element in the document
      const loader = document.querySelector(".app-loader");

      if (loader) {
        // 2. Add the 'hidden' class to trigger the CSS fade-out transition
        loader.classList.add("hidden");

        // 3. (Optional but recommended) Remove the loader from the DOM
        // after the transition finishes to keep the HTML clean.
        loader.addEventListener("transitionend", () => {
          loader.remove();
        });
      }

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

{#if activeUser && scriptProps}
  <EnterRequests
    {specialists}
    {activeUser}
    workboardSheetId={scriptProps.workboardSheetId}
    {modules} />
{/if}
