export enum UserRole {
  admin = "admin",
  student = "student",
  management = "management",
}

export type User = {
  _id: string;
  companyName: string;
  email: string;
  phoneNumber: string;
  address: string;
  legalStructure: "proprietorship" | "pvtLtd" | "llp";
  gstNumber: string;
  gstCertificate: string;
  isVerified: boolean;
  incorporationCertificate: string;
  socialMedia: SocialMediaLink[];
  owner: PersonModel[];
  contactPerson: PersonModel[];
  financialInfo: FinancialInfoModel[];
  __v?: string;
};

export type UserError = {
  companyName: string;
  email: string;
  phoneNumber: string;
  address: string;
  legalStructure: string;
  gstNumber: string;
  gstCertificate: string;
  // incorporationCertificate: string;
  // socialMedia: SocialMediaLink[];
  // owner: PersonModel[];
  // contactPerson: PersonModel[];
  // financialInfo: FinancialInfoModel[];
  // __v?: string;
};

export type FinancialInfoModel = {
  key: string;
  value: string;
};

export type PersonModel = {
  name: string;
  email: string;
  phoneNumber: string;
  designation: string;
};

export type SocialMediaLink = {
  socialMedia: "instagram" | "facebook" | "twitter" | "linkedin" | "website";
  url: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};

export type SignUpRequest = {
  companyName: string;
  email: string;
  phone: string;
};

export type LoginRequest = {
  credentials: string;
};

export type LoginOtpRequest = {
  credentials: string;
  otp: string;
};
