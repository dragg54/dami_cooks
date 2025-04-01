/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react"
import CustomTable from "../../../components/table/Table"
import { FetchAllItems } from "./api/FetchAllItems"
import UpdateItemUI from "./UpdateItemUI"

const ItemList = () => {
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [size, setSize] = useState(5)
  const [page, setPage] = useState(1)
  const [fetchEnabled, setFetchEnabled] = useState(true)
  const [filterValues, setFilterValues] = useState({
    'NAME': {id: "name", value: null},
    'ITEM TYPE':  {id:"itemType", value: null},
    'PRICE': {id: "price", value: null},
    'STATUS': {id: "status", value: null},
  })
  const filters = useMemo(() => ({
    size,
    page,
    searchText: debouncedQuery,
    name: filterValues["NAME"].value,
    itemType: filterValues["ITEM TYPE"].value,
    price: filterValues["PRICE"].value,
    status: filterValues["STATUS"].value,
  }), [size, page, debouncedQuery, fetchEnabled]);
  const {data:items, refetch, isLoading} = FetchAllItems({filters})

  const processedData = items?.rows || [{}]


    const handleEnterKey = (e) =>{
      if(e.key == "Enter"){
        e.preventDefault()
        setFetchEnabled(true)
       refetch()
     }
    }
  

  return (
    <div className="w-full">
     <CustomTable {...{caption: "Items", 
      tableData: processedData, 
      currentPage: page,
      setDebouncedQuery, canAdd: true,
      debouncedQuery, isLoading,
      updateLink: "/updateItem",setSize,
         totalPages: items?.totalPages,setFilterValues,setFetchEnabled,
         onPageChange:setPage,filterValues,handleEnterKey, fetchEnabled,
         canEdit: true, updateComponent: <UpdateItemUI />,
      placeholder: "Search items", formRoute: "/additem"}}/>
    </div>
  )
}

export default ItemList