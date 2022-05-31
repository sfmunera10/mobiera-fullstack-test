export const USER_DIRECTORY_API_BASE_URL =
  process.env.USER_DIRECTORY_API_BASE_URL || "http://localhost:8080/api";

export const IMAGE_SERVER_ORIGIN =
  process.env.IMAGE_SERVER_ORIGIN || "http://localhost:3001";

export const IMG_NOT_AVAILABLE_SRC = "/ImgNotAvailable.jpg";

export const PATH = {
  MAIN_LAYOUT: "/",
  USERS: "/users",
  USER_DETAIL: "/user/:id",
  USER_DETAIL_NO_PARAM: "/user",
  NOT_FOUND: "*",
  NOT_FOUND_NO_PARAM: "/404",
};
