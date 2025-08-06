
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

     getModules(spreadsheetId: string): Promise<any> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: any) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .getModules(spreadsheetId);
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
    },

     fileCoverage(workboardSheetId: string, coverageArr: any[]): Promise<void> {
      return new Promise((resolve, reject) => {
        google.script.run
          .withSuccessHandler((result: void) => resolve(result))
          .withFailureHandler((error: any) => reject(error))
          .fileCoverage(workboardSheetId, coverageArr);
      });
    }
}
