/* eslint-disable react-hooks/exhaustive-deps */
import CustomTable from '../../../components/table/Table'
import { FetchShippings } from './api/FetchShippings'
import { format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import MerchantEmptyState from '../../../components/MerchantEmptyState'

const ShippingList = () => {
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [fetchEnabled, setFetchEnabled] = useState(true)

  const [filterValues, setFilterValues] = useState({
    'ORDER NUMBER': { id: "orderCd", value: null },
    'STATUS': { id: "status", value: null },
    'CITY': { id: "city", value: null },
    'FROM DATE': { id: "fromDate", value: null },
    'TO DATE': { id: "toDate", value: null }
  })

  const filters = useMemo(() => ({
    size,
    page,
    searchText: debouncedQuery,
    orderCd: filterValues['ORDER NUMBER'].value,
    status: filterValues['STATUS'].value,
    city: filterValues['CITY'].value,
    fromDate: filterValues['FROM DATE'].value,
    toDate: filterValues['TO DATE'].value
  }), [size, page, debouncedQuery, fetchEnabled])

  const { data: shippingData, refetch, isLoading } = FetchShippings({ filters })

  const processedData = shippingData?.rows?.map((dta) => ({
    shippingId: dta.id,
    "Order Number": dta.order?.orderCd,
    "Delivery Job Id": dta.stuartJobId,
    "Customer Name": `${dta.order?.user?.firstName || ""} ${dta.Order?.user?.lastName || ""}`,
    status: dta.status || "NA",
    trackingUrl: dta.stuartTrackingUrl,
    city: dta.city,
    courier: dta.provider || "—",
    eta: dta.etaMinutes ? `${dta.etaMinutes} mins` : "—",
    cost: dta.cost,
    "Created At": format(new Date(dta.createdAt), 'dd-MM-yyyy HH:mm')
  }))

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      setDebouncedQuery("")
      setFetchEnabled(true)
      refetch()
    }
  }


  return (
    <div className="w-full">
      <CustomTable
        {...{
          caption: "Shippings",
          tableData: processedData,
          setFetchEnabled,
          openModal: true,
          totalItems: shippingData?.totalItems,
          canAdd: false,
          placeholder: "Search shippings",
          canEdit: false,
          isLoading,
          currentPage: page,
          debouncedQuery,
          setDebouncedQuery,
          totalPages: shippingData?.pagination?.totalPages,
          filterValues,
          handleEnterKey,
          fetchEnabled,
          onPageChange: setPage,
          setFilterValues,
          showTotal: true,
        }}
      />
    </div>
  )
}

export default ShippingList
