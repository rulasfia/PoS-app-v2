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
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy } from "react-table";
import type { GudangType } from "../pages/gudang";

interface Props {
  data: [];
  onDelete: (id: string) => void;
}

const GudangTable: React.FC<Props> = ({ data, onDelete }) => {
  const newData = data.map((item: GudangType, i: number) => {
    return {
      nama: item.name,
      harga: `Rp ${item.price}`,
      jumlah: item.quantity,
      tanggal: <Moment format="DD MMM YYYY">{item.createdAt}</Moment>,
      hapus: (
        <HStack>
          <Button
            colorScheme="red"
            variant="link"
            onClick={() => onDelete(item._id)}
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
      { Header: "Nama", accessor: "nama" },
      { Header: "Harga Satuan", accessor: "harga" },
      { Header: "Jumlah Barang", accessor: "jumlah", isNumeric: true },
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
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
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

export default GudangTable;
