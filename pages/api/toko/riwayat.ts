// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../utils/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const histories = await getServerRiwayatData();
    res.status(200).json(histories);
  } catch (error) {
    res.status(500).json({ msg: `Adding item failed. error : ${error}` });
  }
};

export const getServerRiwayatData = async () => {
  const { db } = await connectToDatabase();
  const histories = await db.collection("histories").find().toArray();

  return histories;
};
