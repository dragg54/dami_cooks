import { useMemo, useState } from "react"
import CustomTable from "../../../components/table/Table"
import { FetchAllAllergens } from "./api/FetchAllAllergens"

const Allergens = () => {
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(1)
    const [fetchEnabled, setFetchEnabled] = useState(true)
    const [filterValues, setFilterValues] = useState({
        'NAME': { id: "name", value: null }
    })
    const filters = useMemo(() => ({
        size,
        page,
        name: filterValues["NAME"].value,
    }))
      const {data:allergens, refetch, isLoading} = FetchAllAllergens({filters})
    
    return (
        <div className="w-full">
            <CustomTable {...{
                caption: "Allergens",
                tableData: allergens,
                // rawData: allergens?.rows,
                currentPage: page,
                canAdd: true,
                totalItems: allergens?.totalItems ,
                isLoading,
                updateLink: "/updateAllergen", setSize, showTotal: true,
                totalPages: allergens?.totalPages, setFilterValues, setFetchEnabled,
                onPageChange: setPage, filterValues, fetchEnabled,
                canEdit: true,
                placeholder: "Search allergens", formRoute: "/allergen"
            }} />
        </div>)
}

export default Allergens