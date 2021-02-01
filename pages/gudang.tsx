import React, { useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useMutation, useQuery } from "react-query";
import { route } from "../utils/route";
import { Button, Box, useDisclosure, Flex } from "@chakra-ui/react";
import AddItem from "../components/AddItem";
import GudangTable from "../components/GudangTable";

export interface itemType {
  name: string;
  price: number;
  quantity: number;
}

export interface dbItemType extends itemType {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

function Gudang() {
  const query = useQuery("snippets", getSnippets);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const addItemMutation = useMutation((itemInfo: itemType) =>
    axios.post("/api/addGudangItem", itemInfo)
  );

  const onSubmit = (formData: itemType) => {
    setIsLoading(true);
    addItemMutation.mutate(formData, {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data.data);
      },
    });

    setIsLoading(false);
    onClose();
  };

  return (
    <>
      <Box px="12">
        <Button onClick={onOpen}>Tambah Barang</Button>
        <AddItem isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} />
      </Box>
      <Flex>
        {query.isLoading && <h1>Loading</h1>}
        {query.isSuccess && <GudangTable data={query.data} />}
      </Flex>
    </>
  );
}

export default Gudang;

const getSnippets = async () => {
  try {
    const { data } = await axios.get("/api/gudang");
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
  return {
    props: { result },
  };
};
