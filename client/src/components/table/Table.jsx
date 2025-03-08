import { useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table.jsx";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import SearchInput from "../input/SearchInput.jsx";
import AddButton from "../button/AddButton.jsx";
import { capitalizeString } from "../../utils/capitalizeString.js";
import { removeSpecialChars } from "../../utils/removeSpecialCharacters.js";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line react/prop-types
const CustomTable = ({ tableData, placeholder, caption, formRoute }) => {

  const [sorting, setSorting] = useState([]);
  const columns = Object.keys(tableData[0]).filter(dt => dt != "id").map((dataKey) => ({
    accessorKey: dataKey, header: capitalizeString(removeSpecialChars(dataKey)), sortingKeyFn: 'auto'
  }))


  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  const navigate = useNavigate()

  return (
    <div className="w-full border  rounded-lg p-4 bg-white overflow-hidden  !overflow-x-hidden">
      <div className="flex justify-between  items-center sticky z-40 top-0">
        <p className="text-xl my-4 font-semibold">{caption}</p>
        <div className="flex gap-2 items-center">
          <div className="w-[190px] h-[40px] md:w-[240px] md:h-[40px]">
            <SearchInput placeholder={placeholder} />
          </div>
          <AddButton onClick={()=> navigate(formRoute)}/>
        </div>
      </div>
      <div className="max-h-[500px] overflow-y-scroll relative w-full overflow-x-scroll ">
      <Table>
        <TableHeader> {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
             <TableHead
                header={''}
                // onClick={header.column.getToggleSortingHandler()}
                // className="cursor-pointer select-none"
              >
                {/* {flexRender(header.column.columnDef.header, header.getContext())}
                {!header.column.getIsSorted() && <FaAngleUp className="inline-flex ml-1 items-center" />}
                {header.column.getIsSorted() && <FaAngleDown className="inline-flex ml-1 items-center" />} */}
              </TableHead>
            {headerGroup.headers.map((header) => (
              <TableHead
                key={header.id}
                header={header}
                onClick={header.column.getToggleSortingHandler()}
                className="cursor-pointer select-none"
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
                {!header.column.getIsSorted() && <FaAngleUp className="inline-flex ml-1 items-center" />}
                {header.column.getIsSorted() && <FaAngleDown className="inline-flex ml-1 items-center" />}
              </TableHead>
            ))}
          </TableRow>
        ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell >
                    <FaEdit className="text-2xl text-gray-500"/>
                  </TableCell>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No orders found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      </div>
    </div>
  );
};

export default CustomTable;
