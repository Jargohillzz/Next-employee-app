import { Schema, models, model } from "mongoose";

export type UserSchema = {
  name: string;
  avatar: string;
  email: string;
  salary: number;
  date: string;
  status: string;
  _id?: string;
  _v?: number;
};

const userSchema = new Schema<UserSchema>({
  name: String,
  avatar: String,
  email: String,
  salary: Number,
  date: String,
  status: String,
});

const Users = models.user || model("user", userSchema);

export default Users;
