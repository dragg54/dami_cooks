import React from 'react'
import { useFetchAllData } from '../../../../hooks/api/useFetchAllData'

const FetchAdmin = () => {
   const { data, isLoading } = useFetchAllData("/users/admin", {}, "admin")
   return { data, isLoading}
}

export default FetchAdmin