import { Route, Routes } from "react-router-dom"
import NavBar from './components/NavBar';
import Home from './components/Home';
import Products from './components/Products';
import AddProduct from './components/Products/AddProduct';
import UpdateProduct from './components/Products/UpdateProduct';
import DetailsProduct from './components/Products/DetailsProduct';
import ShoppingCart from './components/Cart/ShoppingCart';
import CalculateTax from './components/Tax/CalculateTax';
import { OrderStatus } from './components/Orders/OrderStatus';
import OrderStatusDetails from './components/Orders/OrderStatusDetails';
import Reports from "./components/Reports";
import ReportStock from './components/Reports/ReportStock';
import ReportSales from './components/Reports/ReportSales';

function App() {
  return (
    <>

      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/products/update/:idProduct" element={<UpdateProduct />} />
        <Route path="/products/:idProduct" element={<DetailsProduct />} />
        
        <Route path="/shoppingcart" element={<ShoppingCart />} />

        <Route path="/calculatetax" element={<CalculateTax />} />

        <Route path="/orderstatus" element={<OrderStatus />} />
        <Route path="/orderstatus/:idbasket" element={<OrderStatusDetails />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/stock" element={<ReportStock />} />
        <Route path="/reports/sales" element={<ReportSales />} />
        
      </Routes>
    </>
  );
}

export default App;
