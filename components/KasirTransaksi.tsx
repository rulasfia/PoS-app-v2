import React from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  Spacer,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";

interface Props {
  sumPrice: number;
  bayar: {
    pembayaran: number | string;
    setPembayaran;
  };
  kembalian: number | string;
  handleConfirm: () => void;
  handleBayar: () => void;
  isConfirmed: boolean;
  isLoading: boolean;
}

const KasirTransaksi: React.FC<Props> = ({
  sumPrice,
  bayar,
  kembalian,
  handleConfirm,
  handleBayar,
  isConfirmed,
  isLoading,
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
        <Table>
          <Tbody>
            <Tr>
              <Td>Total Belanja</Td>
              <Td>Rp {sumPrice}</Td>
              <Td isNumeric>
                <Spacer />
              </Td>
            </Tr>
            <Tr>
              <Td>Pembayaran</Td>
              <Td>
                <Input
                  variant="filled"
                  type="number"
                  name="jumlahBarang"
                  placeholder="0"
                  value={bayar.pembayaran}
                  onChange={(e) => bayar.setPembayaran(e.target?.value)}
                />
              </Td>
              <Td isNumeric>
                <Button
                  onClick={handleConfirm}
                  variant="outline"
                  colorScheme="twitter"
                >
                  Konfirmasi
                </Button>
              </Td>
            </Tr>

            <Tr>
              <Td>Kembalian</Td>
              <Td>Rp {kembalian}</Td>
              <Td isNumeric>
                <Button
                  isDisabled={!isConfirmed}
                  isLoading={isLoading}
                  colorScheme="twitter"
                  onClick={handleBayar}
                >
                  Bayar
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default KasirTransaksi;
