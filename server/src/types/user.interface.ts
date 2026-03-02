type userType = "premium" | "basic";
type role = "ADMIN" | "USER";

export interface IUser {
  username: String;
  email: String;
  password: String;
  phone_no: Number;
  is_verified: Boolean;
  userType: userType;
  role: role;
  likesCount: [Number];
  dislikesCount: [Number];
  createdAt: Date;
  updatedAt: Date;
}
