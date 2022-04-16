import React, { useState } from "react";
import {
  Flex,
  Heading,
  Button,
  VStack,
  Table,
  TableCaption,
  Thead,
  Th,
  Tbody,
  Tr,
  Td,
  Text,
  Box,
} from "@chakra-ui/react";
import type { Keranjang, RiwayatBelanja } from "../pages/kasir";

interface Props {
  keranjang?: any;
  hapusItem: (date: Date) => void;
  hapusSemua: () => void;
}

const KeranjangList: React.FC<Props> = ({
  keranjang,
  hapusItem,
  hapusSemua,
}) => {
  return (
    <>
      <Box
        w="full"
        p="8"
        color="gray.800"
        rounded="md"
        border="1px"
        borderColor="gray.300"
        _hover={{ borderColor: "gray.400" }}
      >
        <Flex mb="4" justify="space-between" align="start">
          <Heading fontSize="2xl">Keranjang</Heading>
          <Button variant="link" colorScheme="red" onClick={hapusSemua}>
            Hapus Semua
          </Button>
        </Flex>
        <VStack spacing="2">
          <Table variant="simple">
            <TableCaption>Keranjang</TableCaption>
            <Thead>
              <Tr>
                <Th>Barang</Th>
                <Th>Harga Satuan</Th>
                <Th>Jumlah Harga</Th>
                <Th>Hapus</Th>
              </Tr>
            </Thead>
            <Tbody>
              {keranjang?.map((item, i) => {
                return (
                  <Tr key={i}>
                    <Td>
                      <VStack spacing="1" align="start">
                        <Text textTransform="capitalize" fontSize="lg">
                          {item.namaBarang}
                        </Text>
                        <Text fontSize="sm">(x {item.jumlahBarang})</Text>
                      </VStack>
                    </Td>
                    <Td>Rp {item.hargaSatuan}</Td>
                    <Td>Rp {item.jumlahHarga}</Td>
                    <Td>
                      <Button
                        variant="link"
                        colorScheme="red"
                        onClick={() => hapusItem(item.addedAt)}
                      >
                        Hapus
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </VStack>
      </Box>
    </>
  );
};

export default KeranjangList;
