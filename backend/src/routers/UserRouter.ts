import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getOneUserById,
  getUserTokenByUsername,
} from "../controllers/UserController";
import { validatorArrays } from "../utils";

const UserRouter = Router();

UserRouter.post("/", validatorArrays.createUser, createUser);
UserRouter.get("/", getAllUsers);
UserRouter.get("/detail/:id", validatorArrays.getOneUserById, getOneUserById);
UserRouter.get(
  "/:username",
  validatorArrays.getUserTokenByUsername,
  getUserTokenByUsername
);

export default UserRouter;
