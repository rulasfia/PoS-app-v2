// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import * as mongo from "mongodb";
import { connectToDatabase } from "../../../utils/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const params = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const { db } = await connectToDatabase();
    const newItem = await db.collection("storage").insertOne(params);

    res.status(200).json(newItem);
  } catch (error) {
    res.status(500).json({ msg: `Adding item failed. error : ${error}` });
  }
};
