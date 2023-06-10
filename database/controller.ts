/** Controller */
import { NextApiRequest, NextApiResponse } from "next";
import Users from "@/model/user";

// get : http://localhost:3000/api/users
export async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await Users.find();

    if (!users) return res.status(404).json({ error: "Data not Found" });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ error: "Error While Fetching Data" });
  }
}

// get : http://localhost:3000/api/users/1
export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findById(userId);
      return res.status(200).json(user);
    }
    res.status(404).json({ error: "User not Selected...!" });
  } catch (error) {
    return res.status(404).json({ error: "Cannot get the User...!" });
  }
}

// post : http://localhost:3000/api/users
export async function postUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided...!" });
    const data = await Users.create(formData);
    return res.status(201).json(data);
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// put : http://localhost:3000/api/users/1
export async function patchUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;
    const formData = req.body;

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json(user);
    }
    return res.status(404).json({ error: "User Not Selected...!" });
  } catch (error) {
    return res.status(404).json({ error: "Error While Updating the Data...!" });
  }
}

// delete : http://localhost:3000/api/users/1
export async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      return res.status(200).json(user);
    }

    return res.status(404).json({ error: "User Not Selected...!" });
  } catch (error) {
    return res.status(404).json({ error: "Error While Deleting the User...!" });
  }
}
