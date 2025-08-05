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

export function fileWeStaff(
  staffName: GoogleAppsScript.AdminDirectory.Schema.UserName,
  rowNum: number,
  workboardSheetId: string,
  multi: boolean,
) {
  const dataSheet =
    SpreadsheetApp.openById(workboardSheetId).getSheetByName("Current");
  const rowData = dataSheet.getRange(rowNum + 1, 1, 1, 26).getValues()[0];
  const oldCoverageList = String(rowData[23]);
  // email will be sent to the coverage requestor
  const recipient = rowData[1];
  const amsName = staffName.familyName + "+" + staffName.givenName;
  let newList = [];
  const weStaffCell = dataSheet.getRange(rowNum + 1, 24);
  if (multi === true) {
    if (oldCoverageList.indexOf(amsName) < 0) {
      newList = oldCoverageList.length > 0 ? oldCoverageList.split(",") : [];
      newList.push(amsName);
      newList = newList.sort();
      weStaffCell.setValue(newList.toString());
    }
  } else {
    weStaffCell.setValue(amsName);
  }
  const newCoverageList = newList.length > 0 ? newList : [amsName];
  // coverage accepted array
  let coverageAccArr = newCoverageList.map((name) => name.replace("+", ", "));
  coverageAccArr.sort();
  coverageAccArr = coverageAccArr.map((nameStr) => {
    const nameArr = nameStr.split(", ");
    return nameArr[1] + " " + nameArr[0];
  });
  const dt = new Date(rowData[5]).toLocaleDateString();
  const subject = "Weekend Workboard - " + rowData[2] + " Accepted";
  const body =
    "Request Type: " +
    rowData[2] +
    "\n" +
    "Staff Member: " +
    rowData[18] +
    "\n" +
    "Coverage Accepted by: " +
    coverageAccArr.join(", ") +
    "\n" +
    "Date: " +
    dt +
    ", Time: " +
    rowData[6] +
    "\n" +
    "Modules: " +
    rowData[7] +
    "\n" +
    "Comments: " +
    rowData[10];
  const bcc = "";
  const cc = "";
  const htmlBody =
    "<html><body>" +
    "<b>Request Type:</b> " +
    rowData[2] +
    "<br />" +
    "<b>Staff Member:</b> " +
    rowData[18] +
    "<br />" +
    "<b>Coverage Accepted By:</b> " +
    coverageAccArr.join(", ") +
    "<br />" +
    "<b>Date:</b> " +
    dt +
    ", <b>Time:</b> " +
    rowData[6] +
    "<br />" +
    "<b>Modules:</b> " +
    rowData[7] +
    "<br />" +
    "<b>Comments:</b> " +
    rowData[10] +
    "<br />" +
    "</body></html>";
  const options = { bcc, cc, htmlBody };
  MailApp.sendEmail(recipient, subject, body, options);
}

export function deleteWeStaff(
  staffName: GoogleAppsScript.AdminDirectory.Schema.UserName,
  rowNum: number,
  workboardSheetId: string,
  multi: boolean,
) {
  var dataSheet =
    SpreadsheetApp.openById(workboardSheetId).getSheetByName("Current");
  var rowData = dataSheet.getRange(rowNum + 1, 1, 1, 26).getValues()[0];
  // email will be sent to the coverage requestor
  var recipient = rowData[1];
  var weStaffCell = dataSheet.getRange(rowNum + 1, 24);
  let val = "";
  let arr = [];
  let len = 0;
  let loc = 0;

  if (staffName && multi) {
    val = weStaffCell.getValue();
    if (val) {
      arr = val.split(",");
      loc = arr.indexOf(staffName.familyName + "+" + staffName.givenName);
      len = arr.length;
      if (loc > -1 && loc < len) {
        arr.splice(loc, 1);
        if (arr.length === 0) {
          weStaffCell.setValue("");
        } else {
          weStaffCell.setValue(arr.toString());
        }
      }
    }
  } else {
    weStaffCell.setValue("");
  }

  const dt = new Date(rowData[5]).toLocaleDateString();
  const subject = "Weekend Workboard - " + rowData[2] + " Declined";
  const body =
    "Request Type: " +
    rowData[2] +
    "\n" +
    "Staff Member: " +
    rowData[18] +
    "\n" +
    "Coverage Declined by: " +
    staffName.fullName +
    "\n" +
    "Date: " +
    dt +
    ", Time: " +
    rowData[6] +
    "\n" +
    "Modules: " +
    rowData[7] +
    "\n" +
    "Comments: " +
    rowData[10];
  const bcc = "";
  const cc = "";
  const htmlBody =
    "<html><body>" +
    "<b>Request Type:</b> " +
    rowData[2] +
    "<br />" +
    "<b>Staff Member:</b> " +
    rowData[18] +
    "<br />" +
    "<b>Coverage Declined By:</b> " +
    staffName.fullName +
    "<br />" +
    "<b>Date:</b> " +
    dt +
    ", <b>Time:</b> " +
    rowData[6] +
    "<br />" +
    "<b>Modules:</b> " +
    rowData[7] +
    "<br />" +
    "<b>Comments:</b> " +
    rowData[10] +
    "<br />" +
    "</body></html>";
  const options = { bcc, cc, htmlBody };
  MailApp.sendEmail(recipient, subject, body, options);
}

export function getActiveUserEmail(): string {
  const user = Session.getActiveUser();
  return user.getEmail();
}

export function getScriptProps() {
  return PropertiesService.getScriptProperties().getProperties();
}

export function getSpreadsheetData(spreadsheetId: string) {
  const spreadSheet = SpreadsheetApp.openById(spreadsheetId);
  const startRow = 1;
  const startColumn = 1;
  let sheet;
  let numRows;
  let numColumns;
  sheet = spreadSheet.getSheetByName("Current");
  numRows = sheet.getLastRow();
  numColumns = sheet.getLastColumn();
  const currentSheet = sheet
    .getRange(startRow, startColumn, numRows, numColumns)
    .getDisplayValues();
  sheet = spreadSheet.getSheetByName("settings");
  numRows = sheet.getLastRow();
  numColumns = sheet.getLastColumn();
  const settingsSheet = sheet
    .getRange(startRow, startColumn, numRows, numColumns)
    .getDisplayValues();
  sheet = spreadSheet.getSheetByName("modules");
  numRows = sheet.getLastRow();
  numColumns = sheet.getLastColumn();
  const modulesSheet = sheet
    .getRange(startRow, startColumn, numRows, numColumns)
    .getDisplayValues();
  numRows = sheet.getLastRow();
  numColumns = sheet.getLastColumn();

  return [currentSheet, settingsSheet, modulesSheet];
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
