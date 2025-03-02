import AdminLayout from "./components/layout/AdminLayout"
import Layout from "./components/layout/Layout"
import Dashboard from "./pages/admin/dashboard/Dashboard"
import AddItem from "./pages/admin/item/AddItem"
import ItemList from "./pages/admin/item/ItemList"
import OrderList from "./pages/admin/order/OrderList"
import Home from "./pages/customer/home/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route  path="/" element={<Home />} />
        </Route>
        <Route  element={<AdminLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/itemlist" element={<ItemList />} />
          <Route path="/additem" element={<AddItem />} />
          <Route path="/orderlist" element={<OrderList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
