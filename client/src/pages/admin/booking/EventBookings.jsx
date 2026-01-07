/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from "react"
import { FetchAllEventBookings } from "./api/FetchEventBookings"
import { format } from "date-fns"
import CustomTable from "@/components/table/Table"
import EventBookingSummary from "./EventBookingSummary"
import { useDispatch } from "react-redux"
import { openModal } from "@/redux/GlobalModalSlice"
import { readNotifications } from "@/redux/NotificationSlice"
import { UpdateNotificationStatus } from "./api/UpdateNotificationStatus"

const EventBookings = () => {
    const [debouncedQuery, setDebouncedQuery] = useState("")
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(1)
    const mutateNotificationStatus = UpdateNotificationStatus()
    const [fetchEnabled, setFetchEnabled] = useState(true)
    const dispatch = useDispatch()
    const [filterValues, setFilterValues] = useState({
        NAME: { id: "name", value: null },
        EMAIL: { id: "email", value: null },
        "EVENT TYPE": { id: "eventType", value: null },
        "CATERING TYPE": { id: "cateringType", value: null },
        "EVENT DATE": { id: "eventDate", value: null },
    })

    const filters = useMemo(
        () => ({
            size,
            page,
            searchText: debouncedQuery,
            name: filterValues["NAME"].value,
            email: filterValues["EMAIL"].value,
            eventType: filterValues["EVENT TYPE"].value,
            cateringType: filterValues["CATERING TYPE"].value,
            eventDate: filterValues["EVENT DATE"].value,
        }),
        [size, page, debouncedQuery, fetchEnabled]
    )
    const handleOpenModal = (data) => {
        dispatch(openModal({ component: <EventBookingSummary {...{ data }} /> }))
    }
    const { data: items, refetch, isLoading } = FetchAllEventBookings({ filters })

    useEffect(() => {
        mutateNotificationStatus.mutate()
        dispatch(readNotifications("order"))
    }, [])

    // ---- PROCESS TABLE DATA ----
    const processedData = items?.rows?.map((d) => ({
        id: d.id,
        ["Booking ID"]: d.bknId,
        name: d.name,
        email: d.email,
        whatsapp: d.whatsapp,
        ["Mobile Number"]: d.mobileNumber,
        ["Event Type"]: d.eventType,
        ["Catering Type"]: d.cateringType,
        ["Guest Count"]: d.guestCount,
        ["Event Date"]: format(new Date(d.eventDate), "dd-MM-yyyy"),
        ["Event Start Time"]: d.eventStartTime,
        ["Event End Time"]: d.eventEndTime,
        ["Event Location"]: d.eventLocation,
        ["Acknowlegement Url"]: d.eventBookingAcknowlegementUrl,
        ["Event Address"]: d.eventAddress,
        ["Booking Charge"]: d.bookingCharge,
        ["Dietary Requirements"]: d.dietaryRequirements,
        ["Food Package References"]: d.foodPackageReferences,
        "Created At": format(new Date(d.createdAt), "dd-MM-yyyy HH:mm"),
        "Updated At": format(new Date(d.updatedAt), "dd-MM-yyyy HH:mm"),
    }))

    // ---- SEARCH BY PRESSING ENTER ----
    const handleEnterKey = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            setFetchEnabled(true)
            refetch()
        }
    }

    return (
        <div className="w-full">
            <CustomTable
                caption="Event Bookings"
                tableData={processedData}
                currentPage={page}
                setDebouncedQuery={setDebouncedQuery}
                totalItems={items?.totalItems}
                debouncedQuery={debouncedQuery}
                isLoading={isLoading}
                setSize={setSize}
                showTotal={true}
                canEdit={true}
                updateLink={"/eventBooking"}
                totalPages={items?.totalPages}
                setFilterValues={setFilterValues}
                setFetchEnabled={setFetchEnabled}
                onPageChange={setPage}
                filterValues={filterValues}
                handleOpenModal={handleOpenModal}
                handleEnterKey={handleEnterKey}
                fetchEnabled={fetchEnabled}
                placeholder="Search event bookings"
            />
        </div>
    )
}

export default EventBookings
