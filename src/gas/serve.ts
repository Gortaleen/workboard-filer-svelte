const IDX = "index.html"; // file name for svelte output

/**
 * Run this to obtain authorization for Google Services used by other functions.
 */
function getAuth() {
  "use strict";
  var userEmail = Session.getActiveUser().getEmail();
  Logger.log(userEmail);
  Logger.log(
    AdminDirectory.Users.get(userEmail, {
      fields: "name, phones",
      viewType: "domain_public",
    }),
  );
}

export function doGet() {
  return HtmlService.createTemplateFromFile(IDX)
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

export function cacheModulesArr(spreadsheetIdStr?) {
  const spreadsheetId = spreadsheetIdStr
    ? spreadsheetIdStr
    : PropertiesService.getScriptProperties().getProperty("workboardSheetId");
  // https://developers.google.com/apps-script/reference/cache/cache#put(String,String,Integer)
  // * The maximum amount of data that can be stored per key is 100KB.
  // https://developers.google.com/apps-script/reference/cache/cache#putkey,-value,-expirationinseconds
  // * the maximum time the value remains in the cache, in seconds. The minimum is 1 second and the maximum is 21600 seconds (6 hours).
  const modulesArr = SpreadsheetApp.openById(spreadsheetId)
    .getSheetByName("modules")
    .getDataRange()
    .getValues();
  CacheService.getScriptCache().put(
    "modules",
    JSON.stringify(modulesArr),
    21600,
  );
  return modulesArr;
}

/**
 *
 * @returns [[name,email,ext],...]
 */
export function cacheSpecialistArr() {
  // https://developers.google.com/apps-script/reference/cache/cache#put(String,String,Integer)
  // * The maximum amount of data that can be stored per key is 100KB.
  // https://developers.google.com/apps-script/reference/cache/cache#putkey,-value,-expirationinseconds
  // * the maximum time the value remains in the cache, in seconds. The minimum is 1 second and the maximum is 21600 seconds (6 hours).
  const staffSheetId =
    PropertiesService.getScriptProperties().getProperty("staffSheetId");
  const specialistsArr = SpreadsheetApp.openById(staffSheetId)
    .getSheetByName("Current")
    .getDataRange()
    .getValues()
    .filter(
      (spec) =>
        spec[7].match(/specialist/i) || spec[3] === "kgriffin@meditech.com",
    )
    // name, email, ext
    .map((spec) => [spec[2], spec[3], spec[4].split("-")[2]]);
  CacheService.getScriptCache().put(
    "specialists",
    JSON.stringify(specialistsArr),
    21600,
  );
  return specialistsArr;
}

export function getActiveUserEmail(): string {
  const user = Session.getActiveUser();
  return user.getEmail();
}

export function getScriptProps() {
  return PropertiesService.getScriptProperties().getProperties();
}

export function getModulesArr(spreadsheetId: string) {
  const cache = CacheService.getScriptCache();
  const cachedModules = cache.get("modules");

  if (cachedModules !== null) {
    return JSON.parse(cachedModules);
  }
  return cacheModulesArr(spreadsheetId);
}

export function getUserDetails(userKey): any {
  // https://developers.google.com/workspace/admin/directory/reference/rest/v1/users/get
  return AdminDirectory.Users.get(userKey, {
    viewType: "domain_public",
  });
}

/**
 * @return {object}
 */
export function getSpecialistArr() {
  const cache = CacheService.getScriptCache();
  const cachedSpecialistArr = cache.get("specialists");
  if (cachedSpecialistArr !== null) {
    return JSON.parse(cachedSpecialistArr);
  }
  return cacheSpecialistArr();
}

function getTimestamp() {
  "use strict";
  var dt = new Date();
  var m = dt.getMonth();
  var d = dt.getDate();
  var y = dt.getFullYear();
  var hh = dt.getHours();
  var mm = dt.getMinutes();
  var ss = dt.getSeconds();
  // JavaScript months range from 0 to 11.
  m += 1;
  return m + "/" + d + "/" + y + " " + hh + ":" + mm + ":" + ss;
}

export function fileCoverage(workboardSheetId: string, coverageArr: any[]) {
  const ss = SpreadsheetApp.openById(workboardSheetId);
  const sheet = ss.getSheetByName("Current");
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  const range = sheet.getRange(
    lastRow + 1,
    1,
    coverageArr.length,
    coverageArr[0].length,
  );

  range.setValues(coverageArr);
}
