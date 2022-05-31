import { User } from "./User";

export interface UsersApiResponse {
  data?: User[];
  status?: string;
  errorCode?: string;
  statusCode?: number;
  message?: string;
}
