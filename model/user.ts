import { Schema, models, model } from "mongoose";
import { type } from "os";

export type UserSchema = {
  name: string;
  avatar: string;
  email: string;
  salary: number;
  date: string;
  status?: string | null;
  _id?: string;
  _v?: number;
};

const userSchema = new Schema<UserSchema>({
  name: String,
  avatar: String,
  email: String,
  salary: Number,
  date: String,
  status: {
    type: String,
    default: "Active",
  },
});

const Users = models.user || model("user", userSchema);

export default Users;
