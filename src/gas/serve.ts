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

export function cacheModules() {
  // https://developers.google.com/apps-script/reference/cache/cache#put(String,String,Integer)
  // * The maximum amount of data that can be stored per key is 100KB.
  // https://developers.google.com/apps-script/reference/cache/cache#putkey,-value,-expirationinseconds
  // * the maximum time the value remains in the cache, in seconds. The minimum is 1 second and the maximum is 21600 seconds (6 hours).
  const modulesSheetId =
    PropertiesService.getScriptProperties().getProperty("workboardSheetId");
  const modulesArr = SpreadsheetApp.openById(modulesSheetId)
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

export function getModules(spreadsheetId: string) {
  const cache = CacheService.getScriptCache();
  const cachedModules = cache.get("modules");

  if (cachedModules !== null) {
    return JSON.parse(cachedModules);
  }
  return cacheModules();
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

function formatRowData(dataObject) {
  return [
    getTimestamp(),
    Session.getActiveUser(),
    dataObject.typeOfAssist || "",
    dataObject.contactName || "",
    dataObject.contactExt || "",
    dataObject.date || "",
    '=T("' + dataObject.coveragePeriod + '")' || "",
    dataObject.modules || "",
    dataObject.site || "",
    dataObject.specialist || "",
    dataObject.comment || "",
    dataObject.testItem || "",
    // (tasks or
    // PEs)
    dataObject.testType || "",
    dataObject.testItemModule || "",
    dataObject.task || "",
    dataObject.comment2 || "",
    dataObject.otherName || "",
    dataObject.otherExt || "",
    dataObject.specToCover || "",
    dataObject.specToCoverExt || "",
    "",
    "",
    "",
    dataObject.weCoverage || "", // Column X
    // Column Y in use
    // Column Z in use
  ];
}

export function fileCallCoverage(formObject, workboardSheetId) {
  console.log(formObject);
  const ss = SpreadsheetApp.openById(workboardSheetId);
  const dataObject = {
    comment: formObject.comment,
    coveragePeriod: formObject.coveragePeriod,
    date: formObject.date,
    modules: formObject.modules.toString(),
    otherExt: formObject.otherExt,
    otherName: formObject.otherName,
    specToCover: formObject.specToCover,
    specToCoverExt: formObject.specToCoverExt,
    typeOfAssist: formObject.typeOfAssist,
    weCoverage: formObject.weCoverage.toString(),
  };
  let row = 0;
  let rowArr = formatRowData(dataObject);
  let arrLen = rowArr.length;
  let dataSheet = ss.getSheetByName("Current");
  let dataRow;
  let oldRowData = [];
  let oldDate: Date;
  let oldDateStr = "";
  let str = "";
  if (formObject.row) {
    row = Number(formObject.row) + 1;
    dataRow = dataSheet.getRange(row, 1, 1, arrLen);
    oldRowData = dataRow.getValues();
    // keep original requestor's email
    if (formObject.editMode && oldRowData[0][1]) {
      rowArr[1] = oldRowData[0][1];
    }
    // Two-dimensional array
    dataRow.setValues([rowArr]);
    // if Coverage staff, Date, Coverage Period, Comments, Modules change then send mail
    oldDate = new Date(oldRowData[0][5]);
    oldDateStr =
      oldDate.getFullYear() +
      "-" +
      Number(oldDate.getMonth() + 1)
        .toString()
        .padStart(2, "0") +
      "-" +
      oldDate.getDate().toString().padStart(2, "0");
    if (
      dataObject.weCoverage !== oldRowData[0][23] ||
      dataObject.date !== oldDateStr ||
      dataObject.coveragePeriod !== oldRowData[0][6] ||
      dataObject.comment !== oldRowData[0][10] ||
      dataObject.modules !== oldRowData[0][7]
    ) {
      str +=
        dataObject.weCoverage !== oldRowData[0][23]
          ? "Weekend coverage staff changed from\n" +
            oldRowData[0][23]
              .split(",")
              .map((emp) => emp.split("+").reverse().join(" "))
              .join(", ") +
            "\nto\n" +
            dataObject.weCoverage
              .split(",")
              .map((emp) => emp.split("+").reverse().join(" "))
              .join(", ") +
            "\n \n"
          : "";
      str +=
        dataObject.date !== oldDateStr
          ? "Coverage date changed from\n" +
            oldDateStr +
            "\nto\n" +
            dataObject.date +
            "\n \n"
          : "";
      str +=
        dataObject.coveragePeriod !== oldRowData[0][6]
          ? "Coverage period changed from\n" +
            oldRowData[0][6] +
            "\nto\n" +
            dataObject.coveragePeriod +
            "\n \n"
          : "";
      str +=
        dataObject.comment !== oldRowData[0][10]
          ? "Coverage comment changed from\n" +
            oldRowData[0][10] +
            "\nto\n" +
            dataObject.comment +
            "\n \n"
          : "";
      str +=
        dataObject.modules !== oldRowData[0][7]
          ? "Coverage modules changed from\n" +
            oldRowData[0][7] +
            "\nto\n" +
            dataObject.modules +
            "\n \n"
          : "";
      // sendmail
      MailApp.sendEmail(
        oldRowData[0][1],
        "Weekend Staff call coverage change for " + oldRowData[0][1],
        str,
      );
    }
  } else {
    ss.getSheetByName("Current").appendRow(rowArr);
  }
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
