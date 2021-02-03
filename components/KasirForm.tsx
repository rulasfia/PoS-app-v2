import React, { useState } from "react";
import Select from "react-select";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import type {
  BarangReturn,
  Keranjang,
  RiwayatBelanja,
} from "../pages/toko/kasir";
import { useForm } from "react-hook-form";

const KasirForm = ({
  keranjang,
  setKeranjang,
  gudangData,
  setRiwayat,
  price,
}) => {
  const [barang, setBarang] = useState<BarangReturn>();
  const [jmlBarang, setJmlBarang] = useState<number | string>(1);

  const masukanKeranjang = async (e) => {
    e.preventDefault();
    const harga = barang.price * Number(jmlBarang);
    price.setSumPrice(price.sumPrice + harga);

    const item: Keranjang = {
      addedAt: new Date(),
      namaBarang: barang?.value,
      jumlahBarang: Number(jmlBarang),
      hargaSatuan: barang?.price || 0,
      jumlahHarga: Number(jmlBarang) * barang?.price || 0,
    };
    // riwayat belanja

    console.log(price.sumPrice);
    await setKeranjang([...keranjang, item]);
    // await setRiwayat(riwayatBel);
    setJmlBarang(1);
  };

  return (
    <>
      <form onSubmit={masukanKeranjang}>
        <Flex flexDirection="column" wrap="wrap" justify="space-between">
          {/* Nama Barang */}
          <FormControl mb="2" id="namaBarang" isRequired>
            <FormLabel>Nama Barang</FormLabel>
            <Select
              instanceId={1}
              name="namaBarang"
              defaultValue={barang}
              onChange={setBarang}
              options={gudangData}
              // onBlur={() => setHrgSatuan(barang?.price || 0)}
              isClearable
              isSearchable
            />
          </FormControl>

          {/* Jumlah Barang */}
          <FormControl mb="2" id="jumlahBarang" isRequired>
            <FormLabel>Jumlah Barang</FormLabel>
            <Input
              type="number"
              name="jumlahBarang"
              placeholder="0"
              value={jmlBarang}
              onChange={(e) => setJmlBarang(e.target?.value)}
            />
          </FormControl>

          {/* Harga Satuan */}
          <Text fontWeight="bold" my="2">
            Harga Satuan : {barang?.price || 0}
          </Text>

          {/* Jumlah Harga */}
          <Text fontWeight="bold" my="2">
            Jumlah Harga : {Number(jmlBarang) * barang?.price || 0}
          </Text>
        </Flex>
        <Button w="full" colorScheme="twitter" mt="4" type="submit">
          Tambah ke Keranjang
        </Button>
      </form>
    </>
  );
};

export default KasirForm;
