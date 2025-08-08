<!----------------------------------- Code ------------------------------------>

<script lang="ts">
  import type { StaffMember, User } from "workboard";
  import CallCoverage from "./Request-types/Call-coverage.svelte";
  import SiteAssist from "./Request-types/Site-assist.svelte";
  import SpecAssist from "./Request-types/Spec-assist.svelte";
  import Testing from "./Request-types/Testing.svelte";
  import Other from "./Request-types/Other.svelte";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
  import { AppsScript } from "../gasApi";
  import { processRequest } from "./utilities";

  let {
    specialists,
    activeUser,
    workboardSheetId,
    modules,
  }: {
    specialists: StaffMember[];
    activeUser: User;
    workboardSheetId: string;
    modules: unknown;
  } = $props();

  // State variable to hold the selected radio button option
  let selectedOption: string = $state("call-coverage");
  // formModules is needed due to the way Svelte handles groups of checkbox inputs.
  let formModules = $state([]);
  // Reactive array to store input and select values
  const casePeArrDefault = Array.from({ length: 7 }, () => ({
    case: "",
    module: "",
  }));
  let casePeArr = $state(casePeArrDefault);
  // --- ADDED: Key for resetting the form's child components ---
  let formKey = $state(Symbol());

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    // Access form data from the event target (e.g., e.target.elements.name.value)
    // formData = {
    //   name: e.target.elements.name.value,
    //   email: e.target.elements.email.value,
    //   message: e.target.elements.message.value,
    // };

    // You can also use `e.target.elements` to access all form elements and their values
    // For example:
    const allValues = Array.from(event.target.elements).reduce(
      (obj, field: { [key: string]: string }) => {
        switch (field.name) {
          case "module":
            break;

          case "type-of-assist":
            break;

          default:
            if (field.name) {
              obj[field.name] = field.value;
            }
            break;
        }

        return obj;
      },
      { modules: formModules, typeOfAssist: selectedOption, weCoverage: [] },
    ) as { [key: string]: string };
    // console.log("All form values:", allValues);

    const dt = new Date();

    showToast();
    // await AppsScript.fileCallCoverage(allValues, workboardSheetId);
    await AppsScript.fileCoverage(
      workboardSheetId,
      processRequest(
        event.target.elements,
        activeUser,
        formModules,
        selectedOption,
        casePeArr,
      ),
    );

    // --- ADDED: Reset form state after submission ---
    // 1. Reset state variables held in this parent component
    selectedOption = "call-coverage"; // Reset radio button to default
    formModules = []; // Reset bound checkbox data
    casePeArr = casePeArrDefault;

    // 2. Change the key to force Svelte to destroy and re-create child components
    formKey = Symbol();
  }

  const showToast = () => {
    const toast = toasts.add({
      title: selectedOption + " filed.",
      duration: 2000, // 0 or negative to avoid auto-remove
      placement: "bottom-center",
      type: "info",
      // component: BootstrapToast, // allows to override toast component/template per toast
    });

    // toast.remove()
  };
</script>

<!---------------------------------- Markup ----------------------------------->

<form onsubmit={handleSubmit} class="form-inline" action="">
  <div class="container-fluid flex-wrap">
    <div class="row">
      <div class="col-sm-2">
        <p>Type</p>
        <div class="radio">
          <label>
            <input
              type="radio"
              name="type-of-assist"
              value="call-coverage"
              bind:group={selectedOption} />
            Call Coverage
          </label>
        </div>
        <div class="radio">
          <label>
            <input
              type="radio"
              name="type-of-assist"
              value="site-assist"
              bind:group={selectedOption} />
            General Site Assistance
          </label>
        </div>
        <div class="radio">
          <label>
            <input
              type="radio"
              name="type-of-assist"
              value="spec-assist"
              bind:group={selectedOption} />
            Specialist Assistance
          </label>
        </div>
        <div class="radio">
          <label>
            <input
              type="radio"
              name="type-of-assist"
              value="testing"
              bind:group={selectedOption} />
            Testing
          </label>
        </div>
        <div class="radio">
          <label>
            <input
              type="radio"
              name="type-of-assist"
              value="other"
              bind:group={selectedOption} />
            Other
          </label>
        </div>
      </div>
      {#key formKey}
        {#if selectedOption === "call-coverage"}
          <CallCoverage
            {specialists}
            {modules}
            bind:selectedModules={formModules} />
        {:else if selectedOption === "site-assist"}
          <SiteAssist
            {specialists}
            {activeUser}
            {modules}
            bind:selectedModules={formModules} />
        {:else if selectedOption === "spec-assist"}
          <SpecAssist {specialists} {activeUser} {modules} />
        {:else if selectedOption === "testing"}
          <Testing {specialists} {activeUser} {modules} {casePeArr} />
        {:else if selectedOption === "other"}
          <Other {specialists} {activeUser} />
        {/if}
      {/key}
      <div class="col-sm-1">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </div>
  </div>
</form>
<ToastContainer placement="bottom-right" let:data>
  <FlatToast {data} />
  <!-- Provider template for your toasts -->
</ToastContainer>

<!--------------------------------- Styling ----------------------------------->

<style>
  :global([data-svelte-typeahead]) {
    /*  */
    font-family: inherit;
    width: 10em;
    display: inline-block;
  }
  :global(input[name="search"]) {
    --bs-border-radius: 0.375rem;
    border-radius: var(--bs-border-radius) !important;
  }
  :global(.mark, mark) {
    padding: 0;
  }
  :global(.form-control:focus) {
    box-shadow: none;
  }
</style>
