import React, { useMemo } from "react";
import Moment from "react-moment";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  HStack,
  Button,
  VStack,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import type { RiwayatType } from "../pages/riwayat";

interface Props {
  data: [];
  onDelete: (id: string) => void;
}

const RiwayatTable: React.FC<Props> = ({ data, onDelete }) => {
  const newData = data.map((riwayat: RiwayatType, i: number) => {
    const barang = riwayat.daftarBelanja.map((item, i) => {
      return (
        <ListItem mb="2" key={i}>
          <Text textTransform="capitalize">
            {item.namaBarang} <strong>(Rp {item.jumlahHarga})</strong>
          </Text>
          <Text fontSize="sm">
            {item.jumlahBarang} x {item.hargaSatuan}
          </Text>
        </ListItem>
      );
    });

    return {
      nama: <UnorderedList>{barang}</UnorderedList>,
      totalBelanja: `Rp ${riwayat.totalBelanja}`,
      nominalPembayaran: `Rp ${riwayat.nominalPembayaran}`,
      nominalKembalian: `Rp ${riwayat.nominalKembalian}`,
      tanggal: <Moment format="DD MMM YYYY">{riwayat.createdAt}</Moment>,
      hapus: (
        <HStack>
          <Button
            colorScheme="red"
            variant="link"
            onClick={() => onDelete(riwayat._id)}
          >
            Hapus
          </Button>
        </HStack>
      ),
    };
  });
  const rowsData = useMemo(() => newData, [data]);
  const columns = useMemo(
    () => [
      { Header: "Barang", accessor: "nama" },
      { Header: "Total Belanja", accessor: "totalBelanja", isNumeric: true },
      { Header: "Pembayaran", accessor: "nominalPembayaran", isNumeric: true },
      { Header: "Kembalian", accessor: "nominalKembalian", isNumeric: true },
      { Header: "Tanggal", accessor: "tanggal" },
      { Header: "Hapus", accessor: "hapus" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: rowsData }, useSortBy);

  return (
    <Table {...getTableProps()} variant="simple">
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                fontSize="sm"
                // @ts-ignore
                {...column.getHeaderProps(column.getSortByToggleProps())}
                // @ts-expect-error
                isNumeric={column.isNumeric}
              >
                {column.render("Header")}
                <chakra.span pl="4">
                  {
                    // @ts-expect-error
                    column.isSorted ? (
                      // @ts-expect-error
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null
                  }
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                // @ts-expect-error
                <Td {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                  {cell.render("Cell")}
                </Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

export default RiwayatTable;
