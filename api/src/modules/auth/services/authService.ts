import jwt from "jsonwebtoken";

export async function generateAccessToken(userId: string) {
  const accessToken = await jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "10h",
  });
  return accessToken;
}
