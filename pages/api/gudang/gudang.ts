// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const items = await db.collection("storage").find().toArray();

    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ msg: `Adding item failed. error : ${error}` });
  }
};
