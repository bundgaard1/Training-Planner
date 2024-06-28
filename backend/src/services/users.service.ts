
import { IUser } from "../interfaces/users.interface";
import UserModel from "../models/users.model";

export async function createTestUser() {

  const testUser = await UserModel.create({ username: "test", password: "test" });
  console.log("Test user created");


  return testUser as IUser;
}