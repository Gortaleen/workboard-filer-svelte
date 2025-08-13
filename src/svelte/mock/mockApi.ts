import kgriffin from "./mockData/kgriffin.json";
import rhomsey from "./mockData/rhomsey.json";
import bporter from "./mockData/bporter.json";
import modules from "./mockData/modules.json";
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

export function getModulesArr(spreadsheetId: string): any[][] {
  // return null; // TODO: Replace with mock return value of type any[][]
  // getSheetByName('Mass Cash').getSheetValues(2704,1,10,7)
  console.log("mock");
  return modules;
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

export function fileCoverage(
  workboardSheetId: string,
  coverageArr: any[],
): void {
  console.log("fileCoverage", workboardSheetId, coverageArr);
}

export function cacheModules(): any {
  return null; // TODO: Replace with mock return value of type any
}
