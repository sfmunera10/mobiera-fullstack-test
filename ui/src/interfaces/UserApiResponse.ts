import { User } from "./User";

export interface UserApiResponse {
  data?: User;
  status?: string;
  errorCode?: string;
  statusCode?: number;
  message?: string;
}
