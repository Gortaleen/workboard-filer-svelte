<script>
  import { onMount } from "svelte";
  import { Tooltip } from "@sveltestrap/sveltestrap";

  /**
   * The `name` attribute for the hidden input field.
   * This allows the component to be used for different form fields.
   * @type {string}
   */
  export let name = "coveragePeriod";

  /**
   * An initial value string, e.g., "09:00 - 17:00", to populate the fields.
   * @type {string}
   */
  export let value = "";

  // --- Internal State ---
  // These variables hold the live values from the time inputs.
  let startTime = "";
  let endTime = "";
  let warningMessage = "";

  // --- Reactive Statements ---
  // This derived variable automatically combines the times into the correct format.
  // It will update whenever startTime or endTime changes.
  $: combinedValue = startTime && endTime ? `${startTime} - ${endTime}` : "";

  // --- Lifecycle Function ---
  // onMount runs once when the component is first added to the DOM.
  // We use it to parse the initial `value` prop and set the start/end times.
  onMount(() => {
    if (value && value.includes(" - ")) {
      const parts = value.split(" - ");
      startTime = parts[0];
      endTime = parts[1];
    }
  });

  // --- Exported Validation Function ---
  // This function can be called by the parent component to trigger validation.
  // It's the key to integrating with an external form.
  export function validate() {
    // Check for empty values
    if (!startTime || !endTime) {
      warningMessage = "Warning: Please select a valid start and end time.";
      return false; // Validation failed
    }

    // Check if end time is logically after start time
    if (endTime <= startTime) {
      warningMessage = "Warning: End time must be after start time.";
      return false; // Validation failed
    }

    // If all checks pass:
    warningMessage = ""; // Clear any previous warning
    return true; // Validation succeeded
  }

  let tooltipInstance;
</script>

<div class="mb-3">
  <label class="form-label" for="startTime" bind:this={tooltipInstance}>
    Coverage Period
  </label>
  <Tooltip target={tooltipInstance} placement="right">
    Tip: Use the arrow keys for time entry.
  </Tooltip>
  <div class="input-group">
    <input
      type="time"
      id="startTime"
      class="form-control"
      aria-label="Start Time"
      step="900"
      bind:value={startTime} />
    <span class="input-group-text">to</span>
    <input
      type="time"
      id="endTime"
      class="form-control"
      aria-label="End Time"
      step="900"
      bind:value={endTime} />
  </div>

  <!-- The hidden input's value is bound to our reactive `combinedValue` variable -->
  <input type="hidden" {name} value={combinedValue} />
</div>

<!-- The warning message is rendered conditionally -->
{#if warningMessage}
  <div class="alert alert-warning mt-2 mb-0" role="alert">
    {warningMessage}
  </div>
{/if}
