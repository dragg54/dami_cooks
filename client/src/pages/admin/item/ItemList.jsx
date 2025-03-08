import CustomTable from "../../../components/table/Table"
import item from '../../../temps/item.json'

const ItemList = () => {
  return (
    <div className="w-full">
     <CustomTable {...{caption: "Items", tableData: item, placeholder: "Search items", formRoute: "/additem"}}/>
    </div>
  )
}

export default ItemList