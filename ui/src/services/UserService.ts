import {
  IMAGE_SERVER_ORIGIN,
  USER_DIRECTORY_API_BASE_URL,
} from "../constants/Constants";
import { UploadApiResponse } from "../interfaces/UploadApiResponse";
import { User } from "../interfaces/User";
import { UserApiResponse } from "../interfaces/UserApiResponse";
import { UsersApiResponse } from "../interfaces/UsersApiResponse";

export const postUser = async (
  userBodyRequest: Partial<User>
): Promise<UserApiResponse> => {
  try {
    const pathSuffix = "/user";
    const result: Response = await fetch(
      `${USER_DIRECTORY_API_BASE_URL}${pathSuffix}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userBodyRequest),
      }
    );
    const jsonResponse: UserApiResponse = await result.json();
    return jsonResponse;
  } catch (error: any) {
    return {
      status: "error",
      errorCode: "FETCH_ERROR",
      statusCode: 500,
      message: error.message,
    };
  }
};

export const getAllUsers = async (): Promise<UsersApiResponse> => {
  try {
    const pathSuffix = "/user";
    const result: Response = await fetch(
      `${USER_DIRECTORY_API_BASE_URL}${pathSuffix}`
    );
    const jsonResponse: UsersApiResponse = await result.json();
    return jsonResponse;
  } catch (error: any) {
    return {
      status: "error",
      errorCode: "FETCH_ERROR",
      statusCode: 500,
      message: error.message,
    };
  }
};

export const getOneUser = async (id: string): Promise<UserApiResponse> => {
  try {
    const pathSuffix = `/user/detail/${id}`;
    const result: Response = await fetch(
      `${USER_DIRECTORY_API_BASE_URL}${pathSuffix}`
    );
    const jsonResponse: UserApiResponse = await result.json();
    return jsonResponse;
  } catch (error: any) {
    return {
      status: "error",
      errorCode: "FETCH_ERROR",
      statusCode: 500,
      message: error.message,
    };
  }
};

export const uploadFiles = async (
  formData: FormData
): Promise<UploadApiResponse> => {
  try {
    const pathSuffix = `/upload_files`;
    const result: Response = await fetch(
      `${IMAGE_SERVER_ORIGIN}${pathSuffix}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const jsonResponse: UploadApiResponse = await result.json();
    return jsonResponse;
  } catch (error: any) {
    return {
      status: "error",
      errorCode: "FETCH_ERROR",
      statusCode: 500,
      message: error.message,
    };
  }
};
