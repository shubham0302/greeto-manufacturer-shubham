import { User } from "../../common";

export type ChangeProfileType = Omit<User, "_id" | "__v" | "isVerified">;
