<script>
  import { onMount } from 'svelte';

  /**
   * The `name` attribute for the hidden input field.
   * This allows the component to be used for different form fields.
   * @type {string}
   */
  export let name = 'coveragePeriod';

  /**
   * An initial value string, e.g., "09:00 - 17:00", to populate the fields.
   * @type {string}
   */
  export let value = '';

  // --- Internal State ---
  // These variables hold the live values from the time inputs.
  let startTime = '';
  let endTime = '';
  let warningMessage = '';

  // --- Reactive Statements ---
  // This derived variable automatically combines the times into the correct format.
  // It will update whenever startTime or endTime changes.
  $: combinedValue = (startTime && endTime) ? `${startTime} - ${endTime}` : '';

  // --- Lifecycle Function ---
  // onMount runs once when the component is first added to the DOM.
  // We use it to parse the initial `value` prop and set the start/end times.
  onMount(() => {
    if (value && value.includes(' - ')) {
      const parts = value.split(' - ');
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
      warningMessage = 'Warning: Please select a valid start and end time.';
      return false; // Validation failed
    }

    // Check if end time is logically after start time
    if (endTime <= startTime) {
      warningMessage = 'Warning: End time must be after start time.';
      return false; // Validation failed
    }

    // If all checks pass:
    warningMessage = ''; // Clear any previous warning
    return true; // Validation succeeded
  }
</script>

<!-- This component does NOT include a <form> tag so it can be used inside any form. -->
<div class="container-fluid p-0">
  <div class="row g-3 align-items-center">
    <div class="col-auto">
      <label for="startTime-{name}" class="col-form-label">Start Time</label>
    </div>
    <div class="col-auto">
      <!-- Two-way data binding with `bind:value` -->
      <input
        type="time"
        id="startTime-{name}"
        class="form-control"
        class:is-invalid={warningMessage}
        aria-label="Start Time"
        bind:value={startTime}
      />
    </div>
    <div class="col-auto">
      <label for="endTime-{name}" class="col-form-label">End Time</label>
    </div>
    <div class="col-auto">
      <input
        type="time"
        id="endTime-{name}"
        class="form-control"
        class:is-invalid={warningMessage}
        aria-label="End Time"
        bind:value={endTime}
      />
    </div>
  </div>

  <!-- The hidden input's value is bound to our reactive `combinedValue` variable -->
  <input type="hidden" {name} value={combinedValue} />

  <!-- The warning message is rendered conditionally -->
  {#if warningMessage}
    <div class="alert alert-warning mt-2 mb-0" role="alert">
      {warningMessage}
    </div>
  {/if}
</div>
