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
  // This variable will hold a reference to the CoveragePeriod component instance
  let coveragePeriodComponent: any = $state();
  // This variable can be used to set an initial value for the component
  let initialTime = "09:00 - 17:30";

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    // Access form data from the event target (e.g., e.target.elements.name.value)
    // formData = {
    //   name: e.target.elements.name.value,
    //   email: e.target.elements.email.value,
    //   message: e.target.elements.message.value,
    // };

    if (selectedOption === "call-coverage") {
      // Call the `validate` function that we exported from the child component.
      if (coveragePeriodComponent.validate() !== true) {
        return;
      }
    }

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

<div class="card shadow-sm p-4 p-lg-5">
  <form onsubmit={handleSubmit} action="">
    <div class="row g-4 g-lg-5">
      <!-- === Restyled First Fieldset === -->
      <div class="col-12">
        <fieldset class="border rounded-3 p-4">
          <legend class="h5 fw-semibold text-primary px-2 float-none w-auto">
            Type of Assistance
          </legend>
          <div class="d-flex flex-wrap gap-4">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="type-of-assist"
                id="type-call-coverage"
                value="call-coverage"
                bind:group={selectedOption} />
              <label class="form-check-label" for="type-call-coverage">
                Call Coverage
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="type-of-assist"
                id="type-site-assist"
                value="site-assist"
                bind:group={selectedOption} />
              <label class="form-check-label" for="type-site-assist">
                General Site Assistance
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="type-of-assist"
                id="type-spec-assist"
                value="spec-assist"
                bind:group={selectedOption} />
              <label class="form-check-label" for="type-spec-assist">
                Specialist Assistance
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="type-of-assist"
                id="type-testing"
                value="testing"
                bind:group={selectedOption} />
              <label class="form-check-label" for="type-testing">Testing</label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                name="type-of-assist"
                id="type-other"
                value="other"
                bind:group={selectedOption} />
              <label class="form-check-label" for="type-other">Other</label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
    <div class="row g-4 g-lg-5">
      {#key formKey}
        {#if selectedOption === "call-coverage"}
          <CallCoverage
            {specialists}
            {modules}
            bind:selectedModules={formModules}
            bind:coveragePeriodComponent
            {initialTime} />
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
    </div>
    <div class="mt-5 pt-4 border-top d-flex justify-content-end">
      <button type="submit" class="btn btn-primary btn-lg">
        Submit Request
      </button>
    </div>
  </form>
  <ToastContainer placement="bottom-right" let:data>
    <FlatToast {data} />
    <!-- Provider template for your toasts -->
  </ToastContainer>
</div>

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
