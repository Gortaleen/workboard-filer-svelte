<!----------------------------------- Code ------------------------------------>

<script lang="ts">
  import { AppsScript } from "../gasApi";
  import type { WbScriptProps } from "workboard";
  import {
    Button,
    Col,
    Container,
    Popover,
    Row,
    Table,
  } from "@sveltestrap/sveltestrap";
  let temp = $state();

  let {
    currentSheetData = $bindable(),
    activeUser,
    scriptProps,
  }: {
    currentSheetData: any;
    activeUser: GoogleAppsScript.AdminDirectory.Schema.User;
    scriptProps: WbScriptProps;
  } = $props();

  let callCoverageArr = $state(
    currentSheetData
      ?.slice(1)
      .filter((row: string[]) => row[2] === "call-coverage")
      .map((row: string[]) => {
        return {
          fileDate: new Date(row[0]),
          owner: row[1],
          module: row[7]?.length > 0 ? row[7].split(",") : ["TBD"],
          specialist: row[18],
          ext: row[19],
          date: new Date(row[5]).toLocaleDateString(),
          period: row[6],
          comments: row[10],
          weekendStaffArr: row[23]
            .split(",")
            .filter((smbr) => smbr)
            .map((smbr: string) => {
              const nameArr = smbr.split("+");
              return nameArr[1] + " " + nameArr[0];
            }),
        };
      }),
  );

  function addStaff(rowIdx: number) {
    console.log("a", currentSheetData);
    console.log("b", callCoverageArr);
    currentSheetData[rowIdx + 1][23] = activeUser.name.givenName;
    callCoverageArr[rowIdx - 1].weekendStaffArr = [activeUser.name.givenName];
    AppsScript.fileWeStaff(
      activeUser.name,
      rowIdx,
      scriptProps.workboardSheetId,
      true,
    );
  }

  function removeStaff(rowIdx: number) {
    currentSheetData[rowIdx + 1][23] = "";
    callCoverageArr[rowIdx - 1].weekendStaffArr = [];
    AppsScript.deleteWeStaff(
      activeUser.name,
      rowIdx,
      scriptProps.workboardSheetId,
      true,
    );
  }
</script>

<!---------------------------------- Markup ----------------------------------->

<Container>
  <Row>
    <Col>
      <Table size="sm">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>Module</th>
            <th>Specialist</th>
            <th>Ext.</th>
            <th>Date&nbsp;Period</th>
            <th class="commentCell">Comments</th>
            <th class="weStaff">W/E&nbsp;Staff</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each callCoverageArr as coverage, idx}
            <tr>
              <td>
                <i class="bi bi-x-circle text-danger" title="Delete request">
                </i>
              </td>
              <td>
                {coverage.module[0]}{#if coverage.module.length > 1}<i
                    class="bi bi-three-dots"
                    style="vertical-align: sub;"
                    title={coverage.module.join()}>
                  </i>{/if}
              </td>
              <td>{coverage.specialist}</td>
              <td>{coverage.ext}</td>
              <td>
                {coverage.date}&nbsp;{coverage.period}
              </td>
              <td class="commentCell" id="commentCell6"></td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <i
                          class="bi bi-plus-circle text-success"
                          title="Add yourself to the coverage list"
                          role="none"
                          onclick={() => addStaff(idx + 1)}>
                        </i>
                      </td>
                      <td>
                        <Button
                          id={"btn-top-basic" + idx}
                          size="sm"
                          color="light">
                          {coverage.weekendStaffArr.length}
                        </Button>
                        <Popover
                          target={"btn-top-basic" + idx}
                          placement="top"
                          title="Coverage List">
                          <div>
                            {#each coverage.weekendStaffArr as smbr}
                              {smbr}
                              <br />
                            {/each}
                          </div>
                        </Popover>
                      </td>
                      <td>
                        <i
                          class="bi bi-dash-circle text-danger"
                          title="Remove yourself from the coverage list"
                          role="none"
                          onclick={() => removeStaff(idx + 1)}>
                        </i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td title="Contact {coverage.owner} for edits.">
                <span class="glyphicon glyphicon-lock"></span>
              </td>
            </tr>
          {/each}
        </tbody>
      </Table>
    </Col>
    <Col></Col>
  </Row>
  <Row>
    <Col></Col>
    <Col></Col>
  </Row>
</Container>

<!--------------------------------- Styling ----------------------------------->

<style>
  :global(.py-2) {
    padding-top: 0px !important;
    padding-bottom: 0px !important;
  }
  :global(.px-3) {
    padding-right: 6px !important;
    padding-left: 6px !important;
  }

  :global(.btn) {
    --bs-btn-padding-x: 0;
    --bs-btn-padding-y: 0;
    --bs-btn-line-height: 16.5px;
  }

  td {
    white-space: nowrap;
  }
</style>
