/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table.jsx";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import SearchInput from "../input/SearchInput.jsx";
import AddButton from "../button/AddButton.jsx";
import { capitalizeString } from "../../utils/capitalizeString.js";
import { removeSpecialChars } from "../../utils/removeSpecialCharacters.js";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/GlobalModalSlice.js";
import Pagination from "../Pagination.jsx";
import { IoFilterSharp } from "react-icons/io5"
import { TfiExport } from "react-icons/tfi";
import Filter from "./Filter.jsx";
import MerchantEmptyState from "../MerchantEmptyState.jsx";
import Spinner from "../Spinner.jsx";


// eslint-disable-next-line react/prop-types
const CustomTable = ({
  tableData, placeholder, caption,
  currentPage,
  totalPages,
  onPageChange,
  fetchDisabled,
  isLoading,
  setFetchEnabled,
  handleEnterKey,
  updateLink,
  filterValues,
  setFilterValues,
  canAdd,
  debouncedQuery,
  setDebouncedQuery,
  formRoute, updateComponent, canEdit }) => {
  

  const [sorting, setSorting] = useState([]);
  const columns =tableData && tableData.length && Object.keys(tableData[0]).map((dataKey) => ({
    accessorKey: dataKey, header: capitalizeString(removeSpecialChars(dataKey)), sortingKeyFn: 'auto'
  }))
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  // Function to close the filter when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  const navigate = useNavigate()

  const toggleFilter = () => {
    if(!isFilterOpen){
      setFetchEnabled(false)
    }
    setIsFilterOpen((prev) => !prev);
  };



  return (
    <div className="w-auto border relative min-w-[80%]  rounded-lg p-4 bg-white overflow-hidden  !overflow-x-hidden">
      <p className="text-xl my-4 font-semibold w-full pb-3 border-b border-gray-300">{caption}</p>
      <div className="flex bg-white justify-between mt-6 items-center sticky z-40 ">
        <div className="flex gap-5 relative items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={toggleFilter}>
            <IoFilterSharp className="text-sm text-gray-600" />
            <span className="text-xs font-semibold">FILTERS</span>
            <Filter {...{ isFilterOpen, handleEnterKey, toggleFilter, filterRef, filterValues, setFilterValues }} />
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <TfiExport className="text-sm text-gray-600" />
            <span className="text-xs font-semibold">EXPORT</span>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[190px] h-[40px] md:w-[320px] md:h-[40px]">
            <SearchInput {...{setDebouncedQuery, debouncedQuery}} placeholder={placeholder} />
          </div>
          {canAdd && <AddButton className={'!px-4 py-2 !w-[100px]'} onClick={() => navigate(formRoute)} />}
        </div>
      </div>
      <div className="max-h-[500px] min-h-[300px] mt-4 overflow-y-scroll  w-full overflow-x-scroll ">
        {isLoading ? <Spinner style={'!h-12 !w-12 mx-auto mt-20'} isLoading={true}/> :!tableData || tableData.length < 1 ? <MerchantEmptyState /> :
        <Table>
        <TableHeader> {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {canEdit && <TableHead
              header={''}
            // onClick={header.column.getToggleSortingHandler()}
            // className="cursor-pointer select-none"
            >
              {/* {flexRender(header.column.columnDef.header, header.getContext())}
              {!header.column.getIsSorted() && <FaAngleUp className="inline-flex ml-1 items-center" />}
              {header.column.getIsSorted() && <FaAngleDown className="inline-flex ml-1 items-center" />} */}
            </TableHead>}
            {headerGroup.headers.map((header) => (
              header.id != "id" &&
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
                {canEdit && 
                <TableCell >
                  <FaEdit onClick={() => navigate(updateLink, {state: {row:row._valuesCache}})}
                    className=" text-gray-500 text-lg cursor-pointer" />
                </TableCell>
}
                {row.getVisibleCells().map((cell, index) => (
                  // cell.column.id == "id" ? '':
                    <TableCell hidden={cell.column.id == "id"} key={index}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}      
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
        }
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default CustomTable;
