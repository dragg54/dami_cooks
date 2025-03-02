import CustomTable from '../../../components/table/Table'
import order from '../../../temps/order.json'

const OrderList = () => {
  return (
<div className="w-full">
     <CustomTable {...{caption: "Orders", tableData: order, placeholder: "Search orders"}}/>
    </div>  )
}

export default OrderList