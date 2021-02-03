import React from "react";
import { GetServerSideProps } from "next";
import { route } from "../../utils/route";
import axios from "axios";
import { useQuery } from "react-query";
import { Heading, HStack, VStack } from "@chakra-ui/react";
import RiwayatTable from "../../components/RiwayatTable";
import type { RiwayatBelanja } from "./kasir";

const URL = process.env.URL || "http://localhost:3000";

export interface RiwayatType extends RiwayatBelanja {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

function Riwayat({ riwayatData }) {
  const { data } = useQuery("gudangData", getRiwayatData, {
    initialData: riwayatData,
  });
  console.log(data);

  return (
    <>
      <VStack align="start" mx="12" my="4" spacing="8">
        <Heading fontSize="2xl">Riwayat Transaksi</Heading>
        <RiwayatTable data={riwayatData} onDelete={undefined} />
      </VStack>
    </>
  );
}

export default Riwayat;

const getRiwayatData = async () => {
  try {
    const { data } = await axios.get(`${URL}/api/toko/riwayat`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = route(context);
  if (result !== "") {
    context.res.statusCode = 302;
    context.res.setHeader("Location", result);
    return {
      props: {},
    };
  }

  const riwayatData = await getRiwayatData();

  return {
    props: { riwayatData },
  };
};
