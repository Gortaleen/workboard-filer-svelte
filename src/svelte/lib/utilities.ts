import { User } from "workboard";

export function formatAsMoney(
  num: number,
  locale = "en-US",
  currency = "USD",
): string {
  return num.toLocaleString(locale, {
    style: "currency",
    currency: currency,
    notation: "compact",
  });
}

export function dollarsToNumber(dollarStr: string): number {
  return Number(dollarStr.replace(/[^0-9.-]+/g, ""));
}

function getTimestamp() {
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

export function processRequest(
  evtTgtElt: any,
  activeUser: User,
  modules: any,
  selectedOption: string,
) {
  //   const allValues = Array.from(evtTgtElt).reduce(
  //   (obj, field: { [key: string]: string }) => {
  //     switch (field.name) {
  //       case "module":
  //         break;

  //       case "type-of-assist":
  //         break;

  //       default:
  //         if (field.name) {
  //           obj[field.name] = field.value;
  //         }
  //         break;
  //     }

  //     return obj;
  //   },
  //   { modules: formModules, typeOfAssist: selectedOption, weCoverage: [] },
  // ) as { [key: string]: string };

  const dataArr = [];

  Array.from(evtTgtElt).forEach((elt: { [key: string]: any }) => {
    const key = elt.name;
    switch (key) {
      case "date":
        dataArr[5] = elt.value;
        break;

      case "coveragePeriod":
        dataArr[6] = elt.value;
        break;

      case "comment":
        dataArr[10] = elt.value;
        break;

      case "specToCoverName":
        dataArr[18] = elt.value;
        break;

      case "specToCoverExt":
        dataArr[19] = elt.value;
        break;

      default:
        break;
    }
  });

  dataArr[0] = getTimestamp();
  dataArr[1] = activeUser.primaryEmail;
  dataArr[2] = selectedOption;
  dataArr[7] = modules.toString();
  // 7 Modules
  // "module0": {
  // "module": {
  // "module1": {
  // "module2": {
  // "module3": {
  // "module4": {
  // "module5": {
  // "module6": {
  // "module7": {
  // "module8": {

  // 0 Timestamp
  // 1 Username
  // 3 Contact Name
  // 4 Contact Extension
  // 8 Site Mnemonic
  // 9 Specialist Covered
  //11 Test PE/Tasks
  //12 Testing Type
  //13 Test Item Modules
  //14 Tasks
  //15 Description / Other Comment
  //16 Other Contact Name
  //17 Other Contact Extension
  //20 TBD
  //21 TBD
  //22 TBD
  //23 W/E Staff Member
  //24 Deletion User
  //25 Deletion Milliseconds
  console.log("ut2", dataArr);
  return [dataArr];
}
