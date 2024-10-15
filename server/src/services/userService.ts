import { Prisma } from "../lib/db";
import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";
export interface createUserPayload {
  firstName: string;
  lastName?: string;
  profileImageURL?: string;
  username: string;
  email: string;
  password: string;
}
export interface loginUserPayload {
  email: string;
  password: string;
}
const salt = "bdawbdwhavdwha";
const JWT_SECRET = "bdawbdwhadawdvdwha";

class UserService {
  private static generateHash(salt: string, password: string) {
    // const salt = randomBytes(32).toString("hex");
    const hashPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return hashPassword;
  }
  public static decodeJWTToken(token: string) {
    return JWT.verify(token, JWT_SECRET);
  }

  public static async createUser(payload: createUserPayload) {
    const { firstName, lastName, profileImageURL, username, email, password } =
      payload;
    const hashPassword = this.generateHash(salt, password);
    return await Prisma.user.create({
      data: {
        firstName,
        lastName,
        profileImageURL,
        username,
        email,
        password: hashPassword,
      },
    });
  }

  private static getUserByEmail(email: string) {
    return Prisma.user.findUnique({ where: { email } });
  }
  public static getUserById(id: string) {
    return Prisma.user.findUnique({ where: { id } });
  }

  public static async loginUser(payload: loginUserPayload) {
    const { email, password } = payload;

    const user = await UserService.getUserByEmail(email);
    console.log("user", user);

    if (!user) throw new Error("user not found");

    const userHashPassword = UserService.generateHash(salt, password);

    console.log("userHashPassword;", userHashPassword);

    if (userHashPassword !== user.password) {
      console.log("compare error");

      throw new Error("Incorrect credentaial");
    }

    //Gen token
    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
    console.log("token", token);

    return token;
  }
}

export default UserService;
