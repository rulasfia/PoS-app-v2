// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const KEY = "aklsjdlakjllslks";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    const userJWT = jwt.sign({ username, password }, KEY);
    res.status(200).json({ token: userJWT });
  } else {
    res.status(401).json({ msg: "Username atau Password salah" });
  }
};
