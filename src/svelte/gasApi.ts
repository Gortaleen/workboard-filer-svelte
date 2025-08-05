
export const AppsScript = {
  
     getActiveUserEmail(): Promise<string> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: string) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getActiveUserEmail();
      });
    },

     getScriptProps(): Promise<{ [key: string]: string; }> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: { [key: string]: string; }) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getScriptProps();
      });
    },

     getSpreadsheetData(spreadsheetId: string): Promise<any[]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: any[]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getSpreadsheetData(spreadsheetId);
      });
    },

     fileWeStaff(staffName: GoogleAppsScript.AdminDirectory.Schema.UserName, rowNum: number, workboardSheetId: string, multi: boolean): Promise<void> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: void) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .fileWeStaff(staffName, rowNum, workboardSheetId, multi);
      });
    },

     deleteWeStaff(staffName: GoogleAppsScript.AdminDirectory.Schema.UserName, rowNum: number, workboardSheetId: string, multi: boolean): Promise<void> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: void) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .deleteWeStaff(staffName, rowNum, workboardSheetId, multi);
      });
    },

     getUserDetails(userKey: string): Promise<GoogleAppsScript.AdminDirectory.Schema.User> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: GoogleAppsScript.AdminDirectory.Schema.User) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getUserDetails(userKey);
      });
    },

     getSpecialistArr(): Promise<any[][]> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: any[][]) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getSpecialistArr();
      });
    },

     fileCallCoverage(formObject: any, ss: any): Promise<void> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: void) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .fileCallCoverage(formObject, ss);
      });
    }
}
