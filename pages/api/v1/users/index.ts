import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/database/connect";
import { StatusCodes } from "http-status-codes";
import { getUsers, postUser } from "@/database/controller";

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
      getUsers(req, res);
      break;
    case "POST":
      postUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res
        .status(StatusCodes.METHOD_NOT_ALLOWED)
        .end(`Method ${method} Not Allowd`);
      break;
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
