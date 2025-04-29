import AdminLayout from "./components/layout/AdminLayout"
import Layout from "./components/layout/Layout"
import Dashboard from "./pages/admin/dashboard/Dashboard"
import AddItem from "./pages/admin/item/AddItem"
import ItemList from "./pages/admin/item/ItemList"
import OrderList from "./pages/admin/order/OrderList"
import Home from "./pages/customer/home/Home"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from "./pages/register/Register"
import AuthLayout from "./components/layout/AuthLayout"
import Login from "./pages/login/Login"
import ItemDetail from "./pages/customer/item/ItemDetail"
import ScrollToTop from "./components/ScrollToTop"
import Success from "./pages/customer/checkout/Success"
import Cancel from "./pages/customer/checkout/Cancel"
import Checkout from "./pages/customer/checkout/Checkout"
import PaymentList from "./pages/admin/payment/PaymentList"
import UpdateItemUI from "./pages/admin/item/UpdateItemUI"
import NotFoundPage from "./pages/NotFoundPage"
import ProtectedRoute from "./components/ProtectedRoute"
import AboutUs from "./pages/customer/about-us/AboutUs"
import ContactUs from "./pages/customer/contact-us/ContactUs"
import OrderView from "./pages/admin/order/OrderView"
import { socket } from "./utils/Socket"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { addNotification, fetchNotifications } from "./redux/NotificationSlice"
import { useQuery } from "react-query"
import { getUnreadNotifications } from "./services/notifications/notificationService"
import OrdersForMobile from "./components/order/OrdersForMobile"
import PaymentIntentFailed from "./pages/customer/checkout/PaymentIntentFailed"
import PaymentFailed from "./pages/customer/checkout/PaymentFailed"
import Settings from "./pages/admin/settings/Settings"
import UserManagement from "./pages/admin/settings/user-management/UserManagement"
import Reports from "./pages/admin/settings/reports/Reports"
import Notification from "./pages/admin/settings/notification/Notification"
import Availability from "./pages/admin/settings/availability/Availability"

function App() {
  const user = useSelector(state => state.user).user
  const message = useSelector(state => state.notification)
  if(user && user.isAdmin){
    socket.emit('register');
  }

  const {data: notifications} = useQuery('notifications', {
    queryFn: getUnreadNotifications
  })

  const dispatch = useDispatch()
  
  useEffect(() => {
    try { 
      // Listen for notifications sent to this user
      socket.on('receiveNotification', () => {
        console.log("sending notification...")
        dispatch(addNotification())
      });

    } catch (err) {
      console.log('Error:', err);
    }

    return () => {
      socket.off('receiveNotification');
    };
  }, [message]);

  useEffect(()=>{
    dispatch(fetchNotifications(notifications?.data))
  }, [notifications])

  return (
    <BrowserRouter>
          <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/itemdetails/:id" element={<ItemDetail />} />
          <Route path="/customer/orders" element={<OrdersForMobile />}/>
          <Route path="/success" element={<Success />} /> 
          <Route path="/cancel" element={<Cancel />} /> 
          <Route path="/about-us" element={<AboutUs />} /> 
          <Route path="/contact-us" element={<ContactUs />} /> 
          <Route path='/checkout' element={<Checkout/>} />
          <Route path="*" element={<NotFoundPage/>} />
          <Route  path="/" element={<Home />} />
          <Route path="/checkout/payment-intent-failed" element={<PaymentIntentFailed />} />
          <Route path="/checkout/payment-failed" element={<PaymentFailed />} />
        </Route>
        <Route  element={<AdminLayout />}>
        <Route element={<ProtectedRoute isAdminRoute={true}/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/itemlist" element={<ItemList />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/updateItem" element={<UpdateItemUI />} />
          <Route path="/orderlist" element={<OrderList />} />
          <Route path="/settings" element={<Settings />}>
          <Route index element={<Navigate to="user-management" replace />} />
            <Route path="/settings/user-management" element={<UserManagement />}/>
            <Route path="/settings/availability" element={<Availability />}/>
            <Route path="/settings/reports" element={<Reports />}/>
            <Route path="/settings/notifications" element={<Notification />}/>
            <Route path="/settings/analytics" />
          </Route>
          <Route path="/update-order-status" element={<OrderView />} />
          <Route path="/paymentlist" element={<PaymentList />} />
        </Route>
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/not-found" element={<NotFoundPage />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
