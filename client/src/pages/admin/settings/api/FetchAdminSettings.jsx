import { useFetchAllData } from "../../../../hooks/api/useFetchAllData"

const FetchAdminSettings = () => {
  return useFetchAllData("/adminSettings", {}, "adminSettings")
}

export default FetchAdminSettings