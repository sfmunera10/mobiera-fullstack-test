import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorHandler } from "../utils";
import fetch from "node-fetch";

const prisma = new PrismaClient();

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req).array();
    if (errors.length) {
      console.log("THE FUCKING ERRORS");
      console.log(errors);
      next(
        new ErrorHandler(
          400,
          "BAD_REQUEST_ERROR",
          JSON.stringify(errors) || "Error"
        )
      );
      return;
    }
    const bodyRequest: Prisma.UserCreateInput = req.body;
    bodyRequest.expeditionDate = new Date();
    bodyRequest.createdDatetime = new Date();

    const dbCreateResult = await prisma.user.create({
      data: bodyRequest,
    });
    res.status(201).json({ data: dbCreateResult });
  } catch (error: any) {
    next(new ErrorHandler(500, "SERVER_ERROR", error.message || "Error"));
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req).array();
    if (errors.length) {
      next(
        new ErrorHandler(
          400,
          "BAD_REQUEST_ERROR",
          JSON.stringify(errors) || "Error"
        )
      );
      return;
    }
    const foundUsers = await prisma.user.findMany();
    if (!!foundUsers.length) {
      res.status(200).json({ data: foundUsers });
      return;
    }
    next(new ErrorHandler(404, "NOT_FOUND_ERROR", `No users found.`));
  } catch (error: any) {
    next(new ErrorHandler(500, "SERVER_ERROR", error.message || "Error"));
  }
};

export const getOneUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req).array();
    if (errors.length) {
      next(
        new ErrorHandler(
          400,
          "BAD_REQUEST_ERROR",
          JSON.stringify(errors) || "Error"
        )
      );
      return;
    }
    const paramUserId = req.params["id"];
    const foundUser = await prisma.user.findUnique({
      where: {
        id: +paramUserId,
      },
    });
    if (foundUser) {
      res.status(200).json({ data: foundUser });
      return;
    }
    next(new ErrorHandler(404, "NOT_FOUND_ERROR", "User not found."));
  } catch (error: any) {
    next(new ErrorHandler(500, "SERVER_ERROR", error.message || "Error"));
  }
};

export const getUserTokenByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req).array();
    if (errors.length) {
      next(
        new ErrorHandler(
          400,
          "BAD_REQUEST_ERROR",
          JSON.stringify(errors) || "Error"
        )
      );
      return;
    }
    const paramUsername = req.params["username"];
    const RequestURL =
      process.env.MOBIERA_API_URL ||
      "https://mobiera-authenticator-master.runsize.com";
    const pathSuffix = `/v1/token/username/${paramUsername}`;
    const result = await fetch(`${RequestURL}${pathSuffix}`, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });
    const jsonResponse = await result.json();
    res.status(200).json({ data: jsonResponse });
  } catch (error: any) {
    next(new ErrorHandler(500, "SERVER_ERROR", error.message || "Error"));
  }
};
