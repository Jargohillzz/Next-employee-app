import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/";

export type BodyProp = {
  name: string;
  avatar: string;
  email: string;
  salary: number;
  date: string;
  status: string;
};

export async function fetchUsers() {
  const data = await axios(BASE_URL + "users");
  return data.data;
}

export async function fetchUser(id: string) {
  const data = await axios(BASE_URL + "users" + id);
  return data.data;
}

export async function addUser(body: BodyProp) {
  const data = await axios.post(BASE_URL + "users", body);
  return data.data;
}

export async function updateUser(id: string, body: BodyProp) {
  const data = await axios.patch(BASE_URL + "users/" + id, body);
  return data.data;
}

export async function deleteUser(id: string) {
  const data = await axios.delete(BASE_URL + "users/" + id);
  console.log(data);
  return data.data;
}
