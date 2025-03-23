/* eslint-disable react/prop-types */

const OrderItemTable = ({ orderItems }) => {
    return (
        <div className='w-full mt-3 max-h-[170px] overflow-scroll text-sm bg-gray-50 overflow-x-hidden'>
            <div className='grid grid-cols-2 relative'>
                <div className='col-start-1 text-gray-900 z-10 sticky top-0 p-2 border bg-red-200 border-gray-500 col-end-2'>
                    Item Name
                </div>
                <div className='col-start-2 p-2 text-gray-900 z-10 sticky top-0 bg-red-200 border border-gray-500 col-end-3'>
                    Quantity
                </div>
                {
                    orderItems?.map(itm => (
                        <div className='grid grid-cols-2  col-span-3' key={itm.id}>
                            <div className='col-start-1 p-2  border  border-gray-500 col-end-2'>
                                {itm.item.name}
                            </div>
                            <div className='col-start-2 p-2   border border-gray-500 col-end-3'>
                                {itm.quantity} plates
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default OrderItemTable