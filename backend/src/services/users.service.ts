
import User  from "../models/users.model";

export async function createTestUser() {
  const testUser = await User.findOne({ where: { username: "test" } });

  if (!testUser) {
    await User.create({ username: "test", password: "test" });
    console.log("Test user created");
  }
}