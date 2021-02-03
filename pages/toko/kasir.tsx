import { GetServerSideProps } from "next";
import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import { useMutation, useQuery } from "react-query";
import { route } from "../../utils/route";
import {
  Box,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
  Heading,
  HStack,
  Text,
  VStack,
  Input,
  Spacer,
} from "@chakra-ui/react";
import type { GudangType } from "../gudang";
import KasirForm from "../../components/KasirForm";
import KeranjangList from "../../components/KeranjangList";
import KasirTransaksi from "../../components/KasirTransaksi";

const URL = process.env.URL || "http://localhost:3000";

export interface FormData {
  hargaSatuan: number;
  jumlahBarang: number;
  jumlahHarga: number;
}

export interface BarangReturn {
  id: string;
  label: string;
  value: string;
  price: number;
  qty: number;
}

export interface Keranjang {
  addedAt: Date;
  namaBarang: string;
  jumlahBarang: number;
  hargaSatuan: number;
  jumlahHarga: number;
}

export interface RiwayatBelanja {
  daftarBelanja: Array<Keranjang>;
  totalBelanja: number;
  nominalPembayaran: number;
  nominalKembalian: number;
}

const Kasir: React.FC<{ gudangData: BarangReturn }> = ({ gudangData }) => {
  const { data } = useQuery("gudangData", getGudangData, {
    initialData: gudangData,
  });

  const [keranjang, setKeranjang] = useState<Keranjang[]>([]);
  const [riwayat, setRiwayat] = useState<RiwayatBelanja>({
    daftarBelanja: [],
    totalBelanja: 0,
    nominalPembayaran: 0,
    nominalKembalian: 0,
  });
  const [sumPrice, setSumPrice] = useState(0);
  const [pembayaran, setPembayaran] = useState<number | string>(0);
  const [kembalian, setKembalian] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Riwayat Mutation
  const addRiwayatMutation = useMutation((riwayatInfo: RiwayatBelanja) =>
    axios.post(`${URL}/api/toko/addRiwayat`, riwayatInfo)
  );

  // Hapus semua
  const hapusSemua = () => {
    setKeranjang([]);
    setSumPrice(0);
  };

  // Hapus 1 item
  const hapusItem = (date: Date) => {
    setKeranjang(keranjang.filter((item) => item.addedAt !== date));
    const deletedItem: Keranjang[] = keranjang.filter(
      (item) => item.addedAt === date
    );
    setSumPrice(sumPrice - deletedItem[0].jumlahHarga);
  };

  // Konfirmasi daftar pembelian
  const handleConfirm = () => {
    setKembalian(Number(pembayaran) - sumPrice);
    setRiwayat({
      daftarBelanja: keranjang,
      totalBelanja: sumPrice,
      nominalPembayaran: Number(pembayaran),
      nominalKembalian: Number(pembayaran) - sumPrice,
    });
    setIsConfirmed(true);
  };

  // Handle Pembayaran
  const handleBayar = () => {
    setIsLoading(true);
    // Mutation here
    addRiwayatMutation.mutate(riwayat, {
      onError: (error) => {
        console.log(error);
        alert("Transaksi gagal");
        setIsLoading(false);
      },
      onSuccess: (data) => {
        console.log(data.data);
        setRiwayat({
          daftarBelanja: [],
          totalBelanja: 0,
          nominalPembayaran: 0,
          nominalKembalian: 0,
        });

        setKeranjang([]);
        setSumPrice(0);
        setPembayaran(0);
        setKembalian(0);
        setIsConfirmed(false);
        setIsLoading(false);
      },
    });
  };

  console.log(riwayat);
  return (
    <HStack align="start" mx="12" my="4" spacing="8">
      {/* Tambah Barang Form */}
      <KasirForm
        keranjang={keranjang}
        setRiwayat={setRiwayat}
        setKeranjang={setKeranjang}
        gudangData={gudangData}
        price={{ sumPrice, setSumPrice }}
      />

      <VStack w="full" mt="4" spacing="4">
        {/* Keranjang */}
        <KeranjangList
          keranjang={keranjang}
          hapusItem={hapusItem}
          hapusSemua={hapusSemua}
        />

        {/* Transaksi */}
        <KasirTransaksi
          sumPrice={sumPrice}
          bayar={{ pembayaran, setPembayaran }}
          kembalian={kembalian}
          handleConfirm={handleConfirm}
          handleBayar={handleBayar}
          isConfirmed={isConfirmed}
          isLoading={isLoading}
        />
      </VStack>
    </HStack>
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
