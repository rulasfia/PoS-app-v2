// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import * as mongo from "mongodb";
import { connectToDatabase } from "../../../../utils/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { db } = await connectToDatabase();
    const params = { _id: new mongo.ObjectId(String(req.query.id)) };

    const result = await db.collection("histories").deleteOne(params);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: `Adding item failed. error : ${error}` });
  }
};
