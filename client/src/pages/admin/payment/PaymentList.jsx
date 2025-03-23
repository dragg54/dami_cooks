import CustomTable from '../../../components/table/Table'
import { format } from 'date-fns'
import { FetchPayments } from './api/FetchAllPayments'

const PaymentList = () => {
    const paymentData = FetchPayments({})
    let processedData = paymentData?.rows?.map((dta) => (
        {
            "Payment Id": dta.gatewayPaymentId,
            status: dta.status,
            "Order ID": dta.order?.id,
            "Payment Type": dta.paymentType,
            "Payment Gateway": dta.paymentGateway,
            "Created At": format(new Date(dta.createdAt), 'dd-MM-yyy HH:mm')
        }
    ))
    if (!processedData) {
        processedData = [{}]
    }
    return (
        <div className="w-auto">
            <CustomTable
                {...{
                    caption: "Payments", tableData: processedData,
                    placeholder: "Search payments", canEdit: false
                }} />
        </div>)
}

export default PaymentList