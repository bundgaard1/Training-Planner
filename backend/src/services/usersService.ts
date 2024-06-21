
import User  from "../models/User";

export async function createTestUser() {
  const testUser = await User.findOne({ where: { username: "test" } });

  if (!testUser) {
    await User.create({ username: "test", password: "test" });
    console.log("Test user created");
  }
}