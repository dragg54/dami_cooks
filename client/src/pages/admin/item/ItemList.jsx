/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react"
import CustomTable from "../../../components/table/Table"
import { FetchAllItems } from "./api/FetchAllItems"
import UpdateItemUI from "./UpdateItemUI"
import { format } from "date-fns"

const ItemList = () => {
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)
  const [fetchEnabled, setFetchEnabled] = useState(true)
  const [filterValues, setFilterValues] = useState({
    'ITEM NUMBER': {id: "itemCd", value: null},
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
    itemCd: filterValues["ITEM NUMBER"].value
  }), [size, page, debouncedQuery, fetchEnabled]);
  const {data:items, refetch, isLoading} = FetchAllItems({filters})

  // const processedData = items?.rows || [{}]


  let processedData = items?.rows?.map((dta)=>(
    {
      itemId: dta.id,
      "Item Number": dta.itemCd,
      name: dta.name,
      description: dta.description,
      itemType: dta.itemType,
      imageUrl: dta.imageUrl,
      uom:dta?.uom,
      status: dta.status,
      "Item Category": dta.itemCategory?.name,
      price: dta.price,
      "Created At": format(new Date(dta.createdAt), 'dd-MM-yyy HH:mm'),
      "Updated At": format(new Date(dta.updatedAt), 'dd-MM-yyy HH:mm')
    }
  ))
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
      // rawData: items?.rows,
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