import { UserType } from "@/types/types";
import jwt from "jsonwebtoken";

export const generateAccessToken = (user: UserType) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: "1m" }
  );
};

export const generateRefreshToken = (user: UserType) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d",
    }
  );
};

export const generateResetToken = (user: UserType) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.RESET_TOKEN_SECRET!,
    {
      expiresIn: "10m",
    }
  );
};
