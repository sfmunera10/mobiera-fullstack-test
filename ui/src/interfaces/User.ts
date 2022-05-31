export enum BloodType {
  A = "A",
  B = "B",
  AB = "AB",
  O = "O",
  Undefined = "Undefined",
}

export enum RH {
  Positive = "Positive",
  Negative = "Negative",
  Undefined = "Undefined",
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
  Undefined = "Undefined",
}

export interface User {
  id?: number;
  givenNames: string;
  familyNames: string;
  docIdNumber: number;
  signatureFileUrl?: string;
  photoFileUrl?: string;
  countryCode: string;
  state: string;
  city: string;
  fingerprintFileUrl?: string;
  birthDate: Date | string;
  height?: number;
  bloodType?: BloodType;
  rh?: RH;
  gender?: Gender;
  expeditionPlace: string;
}
