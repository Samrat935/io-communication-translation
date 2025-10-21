import User from "../models/user.js";
import redisClient from "../config/redis.js";

class UserRepository {
  constructor() {}

  async createUser(data) {
    //checking existing user
    const existingUser = await User.findOne({ where: { email: data.email } });
    if (existingUser) {
      return {
        message: "User with this email already exists",
        error: "DuplicateEmailError",
        code: "USER_EXISTS",
      };
    }
    const newUser = await User.create(data);
    redisClient.del("all_users"); // Invalidate cache
    return newUser;
  }

  async getAllUsers() {
    let cacheUsers = await redisClient.get("all_users");
    if (cacheUsers) {
      console.log("✅ Retrieved users from Redis cache");
      return JSON.parse(cacheUsers);
    }
    const users = await User.findAll();
    await redisClient.set("all_users", JSON.stringify(users));
    console.log("✅ Stored users in Redis cache");
    return users;
  }
}
export default new UserRepository();
