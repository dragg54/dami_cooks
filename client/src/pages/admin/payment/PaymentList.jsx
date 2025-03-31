import CustomTable from '../../../components/table/Table'
import { format } from 'date-fns'
import { FetchPayments } from './api/FetchAllPayments'
import { useMemo, useState } from 'react'

const PaymentList = () => {
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(1)
    const [debouncedQuery, setDebouncedQuery] = useState("")
    const [fetchEnabled, setFetchEnabled] = useState(true)
    const [filterValues, setFilterValues] = useState({
        'PAYMENT GATEWAY': { id: "paymentGateway", value: null },
        'ORDER ID': { id: "orderId", value: null },
        'Gateway Payment Id': { id: "gatewayPaymentId", value: null },
        'Payment Type': { id: "paymentType", value: null },
        'Status': { id: "status", value: null },
        'Amount': { id: "amount", value: null },
        'FROM DATE': { id: "fromDate", value: null },
        'TO DATE': { id: "toDate", value: null }
    })
    const filters = useMemo(() => ({
        size,
        page,
        searchText: debouncedQuery,
        paymentGateway: filterValues["PAYMENT GATEWAY"]?.value,
        orderId: filterValues["Order ID"]?.value,
        paymentType: filterValues["Payment Type"]?.value,
        amount: filterValues["Amount"]?.value,
        status: filterValues["STATUS"]?.value,
        fromDate: filterValues["FROM DATE"]?.value,
        toDate: filterValues["TO DATE"]?.value,
    }), [size, page, debouncedQuery, fetchEnabled]);

    const { data: paymentData, refetch } = FetchPayments({ filters })
    let processedData = paymentData?.rows?.map((dta) => (
        {
            "id":dta.id,
            "Payment Id": dta.gatewayPaymentId,
            status: dta.status,
            "Order ID": dta.order?.id,
            "Payment Type": dta.paymentType,
            "Payment Gateway": dta.paymentGateway,
            "Created At": format(new Date(dta.createdAt), 'dd-MM-yyy HH:mm')
        }
    ))
    if (!processedData || processedData.length < 1) {
        processedData = [{}]
    }

    const handleEnterKey = (e) => {
        if (e.key == "Enter") {
            e.preventDefault()
            setFetchEnabled(true)
            refetch()
        }
    }
    return (
        <div className="w-full">
            <CustomTable
                {...{
                    caption: "Payments", tableData: processedData, setFetchEnabled,
                    placeholder: "Search payments", canEdit: false,
                    currentPage: page, debouncedQuery, setDebouncedQuery,
                    totalPages: paymentData?.totalPages, filterValues, handleEnterKey, fetchEnabled,
                    onPageChange: setPage, setFilterValues, setSize
                }} />
        </div>)
}

export default PaymentList