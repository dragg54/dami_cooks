/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react"
import CustomTable from "../../../components/table/Table"
import { FetchAllCustomers } from "./api/FetchAllCustomers"
import { Euro } from "@/constants/Currency"

const CustomerList = () => {
    const [debouncedQuery, setDebouncedQuery] = useState("")
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(1)
    const [fetchEnabled, setFetchEnabled] = useState(true)
    const [filterValues, setFilterValues] = useState({
        'Name': { id: "name", value: null },
        'Email': { id: "email", value: null },
        'Phone': { id: "phone", value: null },
        'Address': {id: "address", value: null},
        'Total Orders': { id: "totalorders", value: null },
        'Total Payments': { id: "total payments", value: null },
    })
    const filters = useMemo(() => ({
        size,
        page,
        searchText: debouncedQuery,
        name: filterValues["Name"].value,
        email: filterValues["Email"].value,
        phone: filterValues["Phone"].value,
    }), [size, page, debouncedQuery, fetchEnabled]);
    const { data: Customers, refetch, isLoading } = FetchAllCustomers({ filters })

    // const processedData = Customers?.rows || [{}]


    let processedData = Customers?.rows?.map((dta) => (
        {
            id: dta.id,
            name: dta.user.firstName + " " + dta.user.lastName,
            email: dta.user.email,
            phone: dta.user.phone,
            address: dta.user.address,
            ["Total Orders"]: dta.totalOrders,
            [`Total Payments`]: dta?.totalPayment
        }
    ))
    const handleEnterKey = (e) => {
        if (e.key == "Enter") {
            e.preventDefault()
            setFetchEnabled(true)
            refetch()
        }
    }


    return (
        <div className="w-full">
            <CustomTable {...{
                caption: "Customers",
                tableData: processedData,
                // rawData: Customers?.rows,
                currentPage: page,
                setDebouncedQuery,
                canAdd: false,
                debouncedQuery,
                isLoading, setSize,
                showTotal: true,
                totalPages: Customers?.totalPages,
                setFilterValues, setFetchEnabled,
                onPageChange: setPage,
                filterValues,
                handleEnterKey,
                fetchEnabled,
                canEdit: false,
                placeholder: "Search Customers",
            }} />
        </div>
    )
}

export default CustomerList