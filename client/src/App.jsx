import AdminLayout from "./components/layout/AdminLayout"
import Layout from "./components/layout/Layout"
import Dashboard from "./pages/admin/dashboard/Dashboard"
import AddItem from "./pages/admin/item/AddItem"
import ItemList from "./pages/admin/item/ItemList"
import OrderList from "./pages/admin/order/OrderList"
import Home from "./pages/customer/home/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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

function App() {
  return (
    <BrowserRouter>
          <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/itemdetails/:id" element={<ItemDetail />} />
          <Route path="/success" element={<Success />} /> 
          <Route path="/cancel" element={<Cancel />} /> 
          <Route path="/about-us" element={<AboutUs />} /> 
          <Route path="/contact-us" element={<ContactUs />} /> 
          <Route path='/checkout' element={<Checkout/>} />
          <Route path="*" element={<NotFoundPage/>} />
          <Route  path="/" element={<Home />} />
        </Route>
        <Route  element={<AdminLayout />}>
        <Route element={<ProtectedRoute isAdminRoute={true}/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/itemlist" element={<ItemList />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/updateItem" element={<UpdateItemUI />} />
          <Route path="/orderlist" element={<OrderList />} />
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
