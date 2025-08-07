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

  let dataArr = [];
  const eltArr = Array.from(evtTgtElt);
  // create arry for site-assist to use for filing each site separately
  const siteArr = [];

  eltArr.forEach((elt: { [key: string]: any }) => {
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

  // 3 Contact Name
  // 4 Contact Extension
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

  // create arry for site-assist to use for filing each site separately
  if (selectedOption === "site-assist") {
    eltArr.forEach((elt: { [key: string]: any }) => {
      const key = elt.name;
      switch (true) {
        case key.startsWith("sitemnemonic"):
          if (elt.value) {
            siteArr.push(elt.value);
          }
          break;

        default:
          break;
      }
    });

    return siteArr.map((site) => {
      // 8 Site Mnemonic
      dataArr = [...dataArr.slice(0, 8), site, ...dataArr.slice(9)];
      console.log("ut3", dataArr);
      return dataArr;
    });
  } else {
    return [dataArr];
  }
}
