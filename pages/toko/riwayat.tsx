import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { route } from "../../utils/route";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  Flex,
  Heading,
  HStack,
  Spacer,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import RiwayatTable from "../../components/RiwayatTable";
import type { RiwayatBelanja } from "./kasir";

const URL = process.env.URL;

export interface RiwayatType extends RiwayatBelanja {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

function Riwayat({ riwayatData }) {
  const queryClient = useQueryClient();
  const { data } = useQuery("riwayatData", getRiwayatData, {
    initialData: riwayatData,
  });
  const [isLoading, setIsLoading] = useState(false);

  console.log(data);

  const hapusRiwayatMutation = useMutation((id: string) =>
    axios.delete(`/api/toko/deleteRiwayat/${id}`)
  );

  const onDelete = (id: string) => {
    setIsLoading(true);
    hapusRiwayatMutation.mutate(id, {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries("riwayatData");
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      <VStack align="start" mx="12" my="4" spacing="8">
        <Flex>
          <Heading mr="4" fontSize="2xl">
            Riwayat Transaksi
          </Heading>
          {isLoading ? <Spinner /> : <Spacer />}
          <Spacer />
        </Flex>
        <RiwayatTable data={data} onDelete={onDelete} />
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
