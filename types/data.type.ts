export interface IUserProfile {
  consent: boolean;
  dateOfBirth: string;
  emergencyContact: string;
  firstName: string;
  lastName: string;
  middleName: string;
  nationality: string;
  religion: string;
  gender: "male" | "female" | "other";
}

export interface IFormData extends IUserProfile {
  id: string | number;
  userId: string | number;
  status?: "active" | "inactive" | "submit";
}
