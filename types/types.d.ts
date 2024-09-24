export interface UserType {
  _id: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
  refreshToken?: string;
  resetToken?: string;
}
