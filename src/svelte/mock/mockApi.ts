import kgriffin from "./mockData/kgriffin.json";
import rhomsey from "./mockData/rhomsey.json";
import bporter from "./mockData/bporter.json";
import current from "./mockData/current.json";
import settings from "./mockData/settings.json";
import modules from "./mockData/modules.json";
import editors from "./mockData/editors.json";
import staffList from "./mockData/staff-list.json";

export function getActiveUserEmail(): string {
  return "kgriffin@meditech.com";
}

export function getScriptProps(): { [key: string]: string } {
  // return null; // TODO: Replace with mock return value of type { [key: string]: string; }
  return {
    apiKey: "face-api-key",
    workboardSheetId: "1iHrlhmzOI6Qw0nQ3puzEJl7fE60AKqv349Raqlg6F-Q",
  };
}

export function getSpreadsheetData(spreadsheetId: string): any[][] {
  // return null; // TODO: Replace with mock return value of type any[][]
  // getSheetByName('Mass Cash').getSheetValues(2704,1,10,7)
  console.log("mock");
  return [current, settings, modules, editors];
}

export function getUserDetails(
  userKey: any,
): GoogleAppsScript.AdminDirectory.Schema.User {
  // return null; // TODO: Replace with mock return value of type { projection: string; viewType: string; }
  switch (userKey) {
    case "bporter@meditech.com":
      return bporter;

    case "rhomsey@meditech.com":
      return rhomsey;

    default:
      return kgriffin;
  }
}

export function getSpecialistArr(): string[][] {
  // return null; // TODO: Replace with mock return value of type any
  return staffList;
}

export function fileCallCoverage(formObject: any, ss: any): void {
  console.log("fileCallCoverage", formObject, ss);
}

export function fileWeStaff(
  staffName: GoogleAppsScript.AdminDirectory.Schema.UserName,
  rowNum: number,
  workboardSheetId: string,
  multi: boolean,
): void {}

export function deleteWeStaff(
  staffName: GoogleAppsScript.AdminDirectory.Schema.UserName,
  rowNum: number,
  workboardSheetId: string,
  multi: boolean,
): void {}
