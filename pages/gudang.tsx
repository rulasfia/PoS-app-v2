import React, { useState } from "react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { route } from "../utils/route";
import {
  Button,
  useDisclosure,
  Flex,
  Heading,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import AddItem from "../components/AddItem";
import GudangTable from "../components/GudangTable";

export interface ItemType {
  name: string;
  price: number;
  quantity: number;
}

export interface GudangType extends ItemType {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

function Gudang() {
  const queryClient = useQueryClient();
  const query = useQuery("gudang", getGudangData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);

  const addItemMutation = useMutation((itemInfo: ItemType) =>
    axios.post("/api/gudang/addItem", itemInfo)
  );

  const hapusItemMutation = useMutation((id: string) =>
    axios.delete(`/api/gudang/deleteItem/${id}`)
  );

  const onSubmit = (formData: ItemType) => {
    setIsLoading(true);
    addItemMutation.mutate(formData, {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries("gudang");
        setIsLoading(false);
      },
    });

    onClose();
  };

  const onDelete = (id: string) => {
    setIsLoading(true);
    hapusItemMutation.mutate(id, {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries("gudang");
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      <Flex align="center" my="4" mx="12">
        <Button onClick={onOpen} mr="4" colorScheme="twitter">
          Tambah Barang
        </Button>
        {isLoading ? <Spinner /> : <Spacer />}
        <Spacer />
      </Flex>

      <AddItem isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} />

      <Flex mx="12">
        {query.isLoading && (
          <Heading w="full" textAlign="center" mt="8" fontSize="2xl">
            Loading..
          </Heading>
        )}
        {query.isSuccess && (
          <GudangTable data={query.data} onDelete={onDelete} />
        )}
      </Flex>
    </>
  );
}

export default Gudang;

const getGudangData = async () => {
  try {
    const { data } = await axios.get("/api/gudang/gudang");
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
