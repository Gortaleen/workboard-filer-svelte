<script lang="ts">
  // import { parseContext } from "./lib/parseContext";
  // let contextString = `<? context ?>`;
  import { AppsScript } from "./gasApi";
  import { onMount } from "svelte";
  // my code here
  import EnterRequests from "./lib/Enter-requests.svelte";
  import type { StaffMember, WbScriptProps, User } from "workboard";
  import { Spinner, Alert } from "@sveltestrap/sveltestrap";

  // --- State Management ---
  // Use a dedicated status to drive the UI
  let status: "loading" | "success" | "error" = $state("loading");
  let errorMessage = $state("");

  // Component data state
  let activeUser: User = $state();
  let modules = $state();
  let scriptProps: WbScriptProps = $state();
  // let activeUserEmail: string = $state();
  let specialists: StaffMember[] | undefined = $state([]);

  /**
   * Handles the fade-out and removal of the static loader from index.html.
   */
  function hideAndRemoveLoader() {
    const loader = document.querySelector(".app-loader");
    if (loader) {
      loader.classList.add("hidden");
      loader.addEventListener("transitionend", () => loader.remove(), {
        once: true,
      });
    }
  }

  // --- Data Fetching ---
  async function loadInitialData() {
    try {
      // Fetch props first since another call depends on it
      const props = await AppsScript.getScriptProps();
      scriptProps = props;

      // Now fetch user details and other data in parallel
      const [activeUserEmail, moduleData, specialistData] = await Promise.all([
        AppsScript.getActiveUserEmail(),
        AppsScript.getModulesArr(props.workboardSheetId),
        AppsScript.getSpecialistArr(),
      ]);

      // Fetch user details based on the email
      // This has to be sequential after getting the email
      activeUser = (await AppsScript.getUserDetails(activeUserEmail)) as User;

      // Assign the rest of the data
      modules = moduleData;
      specialists = specialistData.map((mbr) => ({
        name: mbr[0],
        email: mbr[1],
        ext: mbr[2],
      }));

      // If all went well, update the status
      status = "success";
    } catch (e) {
      console.error("Failed to load initial data:", e);
      errorMessage =
        e instanceof Error ? e.message : "An unknown error occurred.";
      status = "error";
    } finally {
      // This will run regardless of success or failure.
      // It's the perfect place to remove the initial loader.
      hideAndRemoveLoader();
    }
  }

  onMount(async () => {
    // onMount is now clean, just kicks off the process
    loadInitialData();
  });
</script>

{#if status === "success" && activeUser && scriptProps}
  <EnterRequests
    {specialists}
    {activeUser}
    workboardSheetId={scriptProps.workboardSheetId}
    {modules} />
{:else if status === "error"}
  <Alert color="danger">
    <strong>Failed to load!</strong>
    <p>{errorMessage}</p>
  </Alert>
{/if}
