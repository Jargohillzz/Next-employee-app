import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/database/connect";
import { StatusCodes } from "http-status-codes";
import { getUser, patchUser, deleteUser } from "@/database/controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectDB().catch(() =>
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ error: "Error in the Connection" })
  );

  // type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getUser(req, res);
      break;
    case "PATCH":
      patchUser(req, res);
      break;
    case "DELETE":
      deleteUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .end(`Method ${method} Not Allowd`);
      break;
  }
}
