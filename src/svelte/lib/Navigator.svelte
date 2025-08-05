<script lang="ts">
  let { changePage, vrNotReady, currentPage } = $props();

  import {
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    Spinner,
  } from "@sveltestrap/sveltestrap";
</script>

<Navbar>
  <NavbarBrand style="pointer-events: none;">
    Weekend Workboard (TEST)
  </NavbarBrand>
  <Nav class="me-auto" tabs>
    <NavItem>
      <NavLink
        on:click={() => changePage("Home")}
        active={currentPage === "Home"}>
        Home
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        on:click={() => changePage("Enter-requests")}
        active={currentPage === "Enter-requests"}>
        Enter Requests
      </NavLink>
    </NavItem>
    <NavItem>
      {#if vrNotReady}
        <Spinner />
      {:else}
        <NavLink
          on:click={() => changePage("View-requests")}
          active={currentPage === "View-requests"}>
          View Requests
        </NavLink>
      {/if}
    </NavItem>
  </Nav>
</Navbar>
