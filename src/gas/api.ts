/* Export all functions you'll want to call with
google.script.run here -- this will allow our type
definition magic to work, so in your svelte side code
you get clean autocomplete for google.script.run */

/*
Functions added to api.ts are placeholders to satisfy requirements for
TypeScript and VSCode IntelliSense.

To make the code function as a server function add it to:
src\gas\serve.ts
then import it in
src\gas\main.ts

To make mock server functions for local testing, add code to:
src\svelte\mock\mockApi.ts
*/

import { cacheSpecialistArr } from "./serve";

export function getActiveUserEmail(): string {
  const user = Session.getActiveUser();
  return user.getEmail();
}

export function getScriptProps() {
  return PropertiesService.getScriptProperties().getProperties();
}

export function getModules(spreadsheetId: string) {
  // placeholder - actual code in src\gas\serve.ts
  let modulesSheet;
  console.log("api");
  return modulesSheet;
}

export function getUserDetails(userKey: string) {
  // https://developers.google.com/workspace/admin/directory/reference/rest/v1/users/get
  const userDetails = AdminDirectory.Users.get(userKey, {
    viewType: "domain_public",
  });
  return userDetails;
}

/**
 * @return {object}
 */
export function getSpecialistArr() {
  // placeholder
  let specArr: any[][];

  return specArr;
}

export function fileCoverage(workboardSheetId: string, coverageArr: any[]) {
  // placeholder
}
