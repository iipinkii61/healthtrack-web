import { EFormStatus } from "@/enum/form.enum";

export interface IUserProfile {
  consent: boolean;
  dateOfBirth: string;
  emergencyContact: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  nationality: string;
  religion?: string;
  gender: "male" | "female" | "other";
  phone: string;
  email: string;
  address: string;
  lang: string;
  emergencyPhone: string;
  emergencyRelationship?: string;
  emergencyName?: string;
}

export interface IFormData extends IUserProfile {
  id: string;
  status?: EFormStatus;
}

export interface ImemberEventData {
  id: string;
  info: IUserProfile;
}
