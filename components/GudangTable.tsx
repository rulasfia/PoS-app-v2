import React, { useState, useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Heading,
  Flex,
  Spacer,
  InputGroup,
  InputLeftAddon,
  Input,
  Link,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon, SearchIcon } from "@chakra-ui/icons";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import type { dbItemType } from "../pages/gudang";

const GudangTable: React.FC<{ data: [] }> = ({ data }) => {
  const newData = data.map((item: dbItemType, i) => {
    return {
      nama: item.name,
      harga: item.price,
      jumlah: item.quantity,
      tanggal: item.createdAt,
    };
  });
  const rowsData = useMemo(() => newData, [data]);
  const columns = useMemo(
    () => [
      { Header: "Nama", accessor: "nama" },
      { Header: "Harga Satuan", accessor: "harga" },
      { Header: "Jumlah Barang", accessor: "jumlah", isNumeric: true },
      { Header: " Tanggal", accessor: "tanggal" },
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
