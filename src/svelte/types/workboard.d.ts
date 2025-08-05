declare module "workboard" {
  export interface StaffMember {
    name: string;
    email: string;
    ext: string;
  }

  export interface WbScriptProps {
    workboardSheetId?: string;
    apiKey?: string;
    [key: string]: string;
  }

  export interface User extends GoogleAppsScript.AdminDirectory.Schema.User {
    relations: { type: string; value: string }[];
  }
}
