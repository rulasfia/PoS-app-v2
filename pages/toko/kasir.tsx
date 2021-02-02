import { GetServerSideProps } from "next";
import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { route } from "../../utils/route";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import type { GudangType } from "../gudang";

const URL = process.env.URL || "http://localhost:3000";

interface Props {
  gudangData: GudangType[];
}

interface FormData {
  hargaSatuan: number;
  jumlahBarang: number;
  jumlahHarga: number;
}

interface BarangReturn {
  id: string;
  label: string;
  value: string;
  price: number;
  qty: number;
}

const Kasir = ({ gudangData }) => {
  const { data } = useQuery("gudangData", getGudangData, {
    initialData: gudangData,
  });
  console.log(data);

  const { handleSubmit, errors, register, watch } = useForm();
  const [barang, setBarang] = useState<BarangReturn>();
  const [jmlHarga, setJmlHarga] = useState<number>(0);
  const watchJmlBarang = watch("jumlahBarang", 0);

  const onSubmit = (formData: FormData) => {
    const item = {
      namaBarang: barang?.value,
      jumlahBarang: Number(formData.jumlahBarang),
      hargaSatuan: Number(formData.hargaSatuan),
      jumlahHarga: Number(formData.jumlahHarga),
    };
    console.log(item);
  };

  return (
    <Box
      color="gray.800"
      w="50%"
      mx="auto"
      my="4"
      p="8"
      rounded="md"
      border="1px"
      borderColor="gray.300"
      _hover={{ borderColor: "gray.400" }}
    >
      <Heading fontSize="2xl" mb="4">
        Tambah Data Penjualan
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex wrap="wrap" justify="space-between">
          {/* Nama Barang */}
          <FormControl w="45%" mb="2" id="namaBarang" isRequired>
            <FormLabel>Nama Barang</FormLabel>
            <Select
              defaultValue={barang}
              onChange={setBarang}
              options={gudangData}
              isClearable
              isSearchable
              name="namaBarang"
            />
          </FormControl>

          {/* Jumlah Barang */}
          <FormControl w="45%" mb="2" id="jumlahBarang" isRequired>
            <FormLabel>Jumlah Barang</FormLabel>
            <Input
              type="number"
              name="jumlahBarang"
              placeholder="0"
              ref={register({ required: true })}
            />
          </FormControl>

          {/* Harga Satuan */}
          <FormControl w="45%" mb="2" id="hargaSatuan" isReadOnly>
            <FormLabel>Harga Satuan</FormLabel>
            <Input
              type="number"
              name="hargaSatuan"
              placeholder="0"
              defaultValue={barang?.price ? barang?.price : "0"}
              ref={register({ required: true })}
            />
          </FormControl>

          {/* Jumlah Harga */}
          <FormControl w="45%" mb="2" id="jumlahHarga" isReadOnly>
            <FormLabel>Jumlah Harga</FormLabel>
            <Input
              type="number"
              name="jumlahHarga"
              defaultValue={
                watch("jumlahBarang", 0) > 0
                  ? barang?.price * watch("jumlahBarang", 0)
                  : "0"
              }
              ref={register({ required: true })}
            />
          </FormControl>
        </Flex>
        <Button colorScheme="twitter" mt="4" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Kasir;

const getGudangData = async () => {
  try {
    const { data } = await axios.get(`${URL}/api/gudang/gudang`);
    const gudangData = data.map((item: GudangType) => {
      const label =
        item.name[0].toUpperCase() + item.name.substring(1).toLowerCase();

      return {
        id: item._id,
        label: `${label} (${item.quantity})`,
        value: item.name,
        price: item.price,
        qty: item.quantity,
      };
    });
    return gudangData;
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

  const APIdata = await getGudangData();

  return {
    props: { gudangData: APIdata },
  };
};
